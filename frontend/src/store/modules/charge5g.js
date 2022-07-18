import axios from 'axios'
import moment from 'moment'
import {
  initUrl,
  initData,
  updateUrl,
  updateData,
  terminateUrl,
  terminateData
} from './utils/charging'

import { proxyUrl } from '@/store/common'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async chargeAccount (context, { volume, ratingGroupNumber, message }) {
      const verboseLoggingOn = context.rootState.verboseLogging
      const token = context.rootState.idToken
      const providerId = context.rootState.providerId
      const deviceId = context.rootState.demoAccountsAndDevices[0].id
      const unitTypeMapping = context.rootState.unitTypeMapping
      const unitType = unitTypeMapping[ratingGroupNumber]
      const urlForInit = await initUrl()
      const initRequestData = await initData(providerId, deviceId, volume, ratingGroupNumber, unitType)
      const initRequestBody = {
        url: urlForInit,
        requestData: initRequestData,
        token: token
      }
      const initResult = await axios.post(proxyUrl, initRequestBody)
      const logTimeRaw = moment.utc()
      const logTimeSummary = logTimeRaw.clone().subtract(1, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SS') + 'Z'
      const logTimeVerbose = logTimeRaw.format('YYYY-MM-DDTHH:mm:ss.SS') + 'Z'
      if (verboseLoggingOn) {
        context.commit('addLog', {
          id: logTimeSummary,
          text: JSON.stringify(initRequestData, null, 4),
          style: 'info'
        })
      }
      context.commit('addLog', {
        id: logTimeVerbose,
        text: message,
        style: 'info'
      })
      console.log('INIT RESULT:')
      console.log(initResult)
      const sessionId = initResult.data.headers.location
      const urlForUpdate = await updateUrl(sessionId)
      const updateRequestData = await updateData(providerId, deviceId, volume, ratingGroupNumber, unitType)
      const updateRequestBody = {
        url: urlForUpdate,
        requestData: updateRequestData,
        token: token
      }
      const updateResult = await axios.post(proxyUrl, updateRequestBody)
      console.log(updateResult)
      const urlForTerminate = await terminateUrl(sessionId)
      const terminateRequestData = await terminateData(providerId, deviceId, ratingGroupNumber, unitType)
      const terminateRequestBody = {
        url: urlForTerminate,
        requestData: terminateRequestData,
        token: token
      }
      const terminateResult = await axios.post(proxyUrl, terminateRequestBody)
      console.log(terminateResult)
    }
  }
}
