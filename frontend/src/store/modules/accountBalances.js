import axios from 'axios'
import getStorageSizeInBytesByUnit from '@/utils/storageSizes'
import { graphQLUrl } from '@/store/common'
import { getAccountQuery } from './queries'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getAccount (context) {
      const accountId = context.rootState.demoAccountsAndDevices[0].id
      const idToken = context.rootState.idToken
      const providerId = context.rootState.providerId
      const response = await axios.post(
        graphQLUrl,
        getAccountQuery(accountId, providerId),
        {
          headers: {
            Authorization: `${idToken}`
          }
        }
      )
      console.log(response)
      const balanceData = JSON.parse(response.data.data.getAccount.balance.customData)
      // Setting voice account balance
      try {
        // Try as if limited balance
        const currentVoiceBalanceSeconds = balanceData.balance.Voice.total
        const currentVoiceBalanceMinutes = Math.floor(currentVoiceBalanceSeconds / 60)
        context.commit('setCurrentVoiceBalanceMinutes', currentVoiceBalanceMinutes.toString())
      } catch (e) {
      // Try as if unlimited balance
      // TODO: Figure out if this differs at all from the limited balance
        try {
          const currentVoiceBalanceSeconds = balanceData.balance.voice.total
          const currentVoiceBalanceMinutes = Math.floor(currentVoiceBalanceSeconds / 60)
          context.commit('setCurrentVoiceBalanceMinutes', currentVoiceBalanceMinutes.toString())
        } catch (e) {
        // Try as if the service isn't on the plan
          try {
            const voiceAllocationNotFoundOnAccount = balanceData.balance.voice === undefined
            if (voiceAllocationNotFoundOnAccount && context.rootState.currentVoiceBalanceMinutes === 'No service') {
              context.commit('setCurrentVoiceBalanceMinutes', '0')
            }
          } catch (e) {
            console.log('Real Error setting Voice balance')
            console.log(e)
            context.commit('setAccountDeviceError', true)
          }
        }
      }
      // Setting SMS account balance
      try {
        // Try as if limited balance
        const currentSmsBalance = balanceData.balance.Text.total
        context.commit('setCurrentSmsBalance', currentSmsBalance.toString())
      } catch (e) {
        // Try as if unlimited balance
        // TODO: Figure out if this differs at all from the limited balance
        try {
          const currentSmsBalance = balanceData.balance.sms.total
          context.commit('setCurrentSmsBalance', currentSmsBalance.toString())
        } catch (e) {
        // Try as if the service isn't on the plan
          try {
            const smsAllocationNotFoundOnAccount = balanceData.balance.sms === undefined
            if (smsAllocationNotFoundOnAccount && context.rootState.currentSmsBalance === 'No service') {
              context.commit('setCurrentSmsBalance', '0')
            }
          } catch (e) {
            console.log('Real Error setting SMS balance')
            console.log(e)
            context.commit('setAccountDeviceError', true)
          }
        }
      }
      // Setting Data account balance
      try {
        // Try as if limited balance
        const currentDataBalanceBytes = balanceData.balance.Data.total
        const currentDataBalanceMb = Math.floor(currentDataBalanceBytes / getStorageSizeInBytesByUnit('MB'))
        context.commit('setCurrentDataBalanceMb', currentDataBalanceMb.toString())
      } catch (e) {
        // Try as if unlimited balance
        // TODO: Figure out if this differs at all from the limited balance
        try {
          const currentDataBalanceBytes = balanceData.balance.data.total
          const currentDataBalanceMb = Math.floor(currentDataBalanceBytes / getStorageSizeInBytesByUnit('MB'))
          context.commit('setCurrentDataBalanceMb', currentDataBalanceMb.toString())
        } catch (e) {
          // Try as if the service isn't on the plan
          try {
            const dataAllocationNotFoundOnAccount = balanceData.balance.data === undefined
            if (dataAllocationNotFoundOnAccount && context.rootState.currentDataBalanceMb === 'No service') {
              context.commit('setCurrentDataBalanceMb', '0')
            }
          } catch (e) {
            console.log('Real Error setting Data balance')
            console.log(e)
            context.commit('setAccountDeviceError', true)
          }
        }
      }
      // Setting Monetary account balance
      try {
        const currentMonetaryBalance = balanceData.balance.Monetary.total
        context.commit('setCurrentMonetaryBalance', currentMonetaryBalance.toString())
      } catch (e) {
        console.log('Real Error setting Data balance')
        console.log(e)
        context.commit('setAccountDeviceError', true)
      }
    }
  }
}
