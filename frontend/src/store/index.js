import { createStore } from 'vuex'

import account from './modules/account.js'
import accountBalances from './modules/accountBalances.js'
import charge5g from './modules/charge5g.js'
import device from './modules/device.js'
import edrs from './modules/edrs.js'
import notifications from './modules/notifications.js'
import planVersionAllocations from './modules/planVersionAllocations.js'
import planVersions from './modules/planVersions.js'
import signIn from './modules/signIn.js'
import unitMapping from './modules/unitMapping.js'
import credit5g from './modules/credit5g.js'
import logging from './modules/logging.js'

export default createStore({
  state () {
    return {
      verboseLogging: false,
      idToken: '',
      providerId: '',
      unitTypeMapping: {
        100: 'time',
        200: 'serviceSpecificUnits',
        300: 'totalVolume',
        400: 'serviceSpecificUnits'
      },
      logs: [],
      zeroRatedData: false,
      accountDeviceError: false,
      currentSmsBalance: 'loading...',
      currentVoiceBalanceMinutes: 'loading...',
      currentDataBalanceMb: 'loading...',
      currentMonetaryBalance: 'loading...',
      planVersionSmsAllocation: null,
      planVersionVoiceAllocationMinutes: null,
      planVersionDataAllocationMb: null,
      allAvailablePlanInformation: {},
      currentPlanInformation: {},
      demoAccountsAndDevices: []
    }
  },
  getters: {
  },
  mutations: {
    toggleVerboseLogging (state) {
      state.verboseLogging = !state.verboseLogging
    },
    setProviderId (state, providerId) {
      state.providerId = providerId
    },
    setIdToken (state, idToken) {
      state.idToken = idToken
    },
    updateUnitTypeMapping (state, newMapping) {
      state.unitTypeMapping = newMapping
    },
    addDemoAccountsAndDevices (state, accountDevice) {
      state.demoAccountsAndDevices.push(accountDevice)
    },
    addLog (state, log) {
      let logLengthLimit
      if (state.verboseLogging) {
        state.logs.push(log)
        logLengthLimit = 4
      } else {
        state.logs.push(log)
        logLengthLimit = 15
      }
      const ids = state.logs.map(o => o.id)
      const filtered = state.logs.filter(({ id }, index) => !ids.includes(id, index + 1))
      state.logs = filtered
      state.logs.sort((a, b) => {
        if (a.id < b.id) {
          return -1
        }
        if (a.id > b.id) {
          return 1
        }
        return 0
      })
      if (state.logs.length > logLengthLimit) {
        state.logs.shift()
      }
    },
    setAccountDeviceError (state, errorState) {
      state.accountDeviceError = errorState
    },
    setPlanVersionSmsAllocation (state, planVersionSmsAllocation) {
      state.planVersionSmsAllocation = planVersionSmsAllocation
    },
    setPlanVersionVoiceAllocationMinutes (state, planVersionVoiceAllocationMinutes) {
      state.planVersionVoiceAllocationMinutes = planVersionVoiceAllocationMinutes
    },
    setPlanVersionDataAllocationMb (state, planVersionDataAllocationMb) {
      state.planVersionDataAllocationMb = planVersionDataAllocationMb
    },
    setCurrentSmsBalance (state, currentSmsBalance) {
      state.currentSmsBalance = currentSmsBalance
    },
    setCurrentVoiceBalanceMinutes (state, currentVoiceBalanceMinutes) {
      state.currentVoiceBalanceMinutes = currentVoiceBalanceMinutes
    },
    setCurrentDataBalanceMb (state, currentDataBalanceMb) {
      state.currentDataBalanceMb = currentDataBalanceMb
    },
    setCurrentMonetaryBalance (state, currentMonetaryBalance) {
      state.currentMonetaryBalance = currentMonetaryBalance
    },
    setCurrentPlanInformation (state, currentPlanInformation) {
      state.currentPlanInformation = currentPlanInformation
      state.currentPlanVersionId = currentPlanInformation.planVersionId
    },
    setAllAvailablePlanInformation (state, allAvailablePlanInformation) {
      state.allAvailablePlanInformation = allAvailablePlanInformation
    }
  },
  actions: {},
  modules: {
    account: account,
    accountBalances: accountBalances,
    charge5g: charge5g,
    credit5g: credit5g,
    device: device,
    edrs: edrs,
    logging: logging,
    notifications: notifications,
    planVersionAllocations: planVersionAllocations,
    planVersions: planVersions,
    signIn: signIn,
    unitMapping: unitMapping
  }
})
