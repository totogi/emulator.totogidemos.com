import axios from 'axios'
import {
  createDeviceQuery,
  deleteDeviceQuery
} from '../modules/queries'
import { graphQLUrl } from '@/store/common'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async delete (context, { deviceId, accountId }) {
      await axios.post(
        graphQLUrl,
        deleteDeviceQuery(
          deviceId,
          accountId,
          context.rootState.providerId
        ), {
          headers: {
            Authorization: `${context.rootState.idToken}`
          }
        }
      )
    },
    async create (context, { deviceId, accountId }) {
      await axios.post(
        graphQLUrl,
        createDeviceQuery(
          deviceId,
          accountId,
          context.rootState.providerId
        ),
        {
          headers: {
            Authorization: `${context.rootState.idToken}`
          }
        }
      )
    }
  }
}
