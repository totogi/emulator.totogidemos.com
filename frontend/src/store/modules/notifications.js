import axios from 'axios'

import { notificationsUrl } from '@/store/common'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async update (context) {
      const providerId = context.rootState.providerId
      const deviceAccountId = context.rootState.demoAccountsAndDevices[0].id
      const url = `${notificationsUrl}notifications?providerId=${providerId}&deviceId=${deviceAccountId}`
      const result = await axios.get(url)
      const notifications = result.data.items
      for (let i = 0; i < notifications.length; i++) {
        context.commit('addLog', {
          id: notifications[i].timestamp,
          text: notifications[i].message,
          style: 'notification'
        }, { root: true })
      }
    }
  }
}
