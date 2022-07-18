import axios from 'axios'
import moment from 'moment'
import { getEventDataRecordsByDeviceQuery } from './queries'
import getStorageSizeInBytesByUnit from '@/utils/storageSizes'
import { graphQLUrl } from '@/store/common'

const MINUTE = 60

export default {
  state: {
    edrEdges: [],
    voiceEdrSummary: 0,
    smsEdrSummary: 0,
    dataEdrSummary: 0
  },
  getters: {},
  mutations: {
    addEdrEdges (state, edrEdges) {
      state.edrEdges.push(...edrEdges)
    },
    clearEdrEdges (state) {
      state.edrEdges = []
    },
    updateVoiceEdrSummary (state, voiceEdrSummary) {
      state.voiceEdrSummary = voiceEdrSummary
    },
    updateSmsEdrSummary (state, smsEdrSummary) {
      state.smsEdrSummary = smsEdrSummary
    },
    updateDataEdrSummary (state, dataEdrSummary) {
      state.dataEdrSummary = dataEdrSummary
    }
  },
  actions: {
    async getAndSummarizeEdrs (context) {
      this.dispatch('getAllEdrs', { after: undefined })
      const edrEdges = JSON.parse(JSON.stringify(context.state.edrEdges))
      let voiceBucket = 0
      let smsBucket = 0
      let dataBucket = 0
      for (let i = 0; i < edrEdges.length; i++) {
        console.log('in for loop')
        console.log(edrEdges[i])
        const edge = edrEdges[i]
        const customData = JSON.parse(edge.node.customData)
        // Naive implementation that assumes only one Rating Group
        const ratingGroup = customData.charginginformation.multipleunitinformation[0].ratinggroup
        const usedUnits = customData.charginginformation.multipleunitinformation[0].grantedunit[context.rootState.unitTypeMapping[ratingGroup].toLowerCase()]
        console.log('In edrs')
        console.log(ratingGroup)
        console.log(usedUnits)
        if (ratingGroup === 100) {
          voiceBucket += usedUnits / MINUTE
        }
        if (ratingGroup === 200) {
          smsBucket += usedUnits
        }
        if (ratingGroup === 300) {
          dataBucket += usedUnits / getStorageSizeInBytesByUnit('MB')
        }
        context.commit('clearEdrEdges')
        context.commit('updateVoiceEdrSummary', voiceBucket)
        context.commit('updateSmsEdrSummary', smsBucket)
        context.commit('updateDataEdrSummary', dataBucket)
      }
    },
    async getAllEdrs (context, { after }) {
      const idToken = context.rootState.idToken
      const providerId = context.rootState.providerId
      const now = moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
      const yesterday = moment.utc().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
      const eventDataRecordsResponse = await axios.post(
        graphQLUrl,
        getEventDataRecordsByDeviceQuery(
          providerId,
          context.rootState.demoAccountsAndDevices[0].id,
          yesterday,
          now,
          after
        ), {
          headers: {
            Authorization: `${idToken}`
          }
        }
      )
      const edges = eventDataRecordsResponse.data.data.getEventDataRecordsByDevice.edges
      context.commit('addEdrEdges', edges)
      const pageInfo = eventDataRecordsResponse.data.data.getEventDataRecordsByDevice.pageInfo
      if (pageInfo.hasNextPage !== false) {
        this.dispatch('getAllEdrs', { after: pageInfo.endCursor })
      }
    }
  }
}
