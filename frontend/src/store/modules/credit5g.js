import axios from 'axios'
import {
  topUpUrl,
  topUpData
} from './utils/charging'

import { proxyUrl } from '@/store/common'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async topUp (providerId, deviceId, volume, token) {
      const url = await topUpUrl()
      const requestData = await topUpData(providerId, deviceId, volume)
      const requestBody = {
        url: url,
        requestData: requestData,
        token: token
      }
      const result = await axios.post(proxyUrl, requestBody)
      return result
    }
  }
}
