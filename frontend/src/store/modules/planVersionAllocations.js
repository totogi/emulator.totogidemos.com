import axios from 'axios'
import { graphQLUrl } from '@/store/common'
import getStorageSizeInBytesByUnit from '@/utils/storageSizes'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getPlanVersionInformation (context) {
      const idToken = await context.rootState.idToken
      const providerId = await context.rootState.providerId
      const planVersionInformationResponse = await axios.post(
        graphQLUrl,
        getPlanVersionInformationQuery(
          providerId,
          context.rootState.currentPlanVersionId
        ), {
          headers: {
            Authorization: `${idToken}`
          }
        }
      )
      console.log('Plan version information:')
      console.log(planVersionInformationResponse)
      const template = planVersionInformationResponse.data.data.getPlanVersion.template
      // Setting Voice Allocation
      try {
        const voiceAllocationSeconds = template.voice.periodAllowance
        if (voiceAllocationSeconds != null) {
          const voiceAllocationMinutes = Math.floor(voiceAllocationSeconds / 60)
          context.commit('setPlanVersionVoiceAllocationMinutes', voiceAllocationMinutes.toString(), { root: true })
        } else {
          throw new Error('Voice Allocation is null')
        }
      } catch (e) {
        try {
          const voiceIsUnlimited = template.voice.periodAllowance === null
          if (voiceIsUnlimited) {
            context.commit('setPlanVersionVoiceAllocationMinutes', 'Unlimited', { root: true })
          }
        } catch (e) {
          try {
            const voiceIsNotOnPlan = template.voice === null
            if (voiceIsNotOnPlan) {
              context.commit('setPlanVersionVoiceAllocationMinutes', 'No service', { root: true })
            }
          } catch (e) {
            console.log('Unsupported Voice Plan')
            context.commit('setAccountDeviceError', true)
          }
        }
      }
      // Setting SMS Allocation
      try {
        const smsAllocation = template.text.periodAllowance
        context.commit('setPlanVersionSmsAllocation', smsAllocation.toString(), { root: true })
      } catch (e) {
        try {
          const smsIsUnlimited = template.text.periodAllowance === null
          if (smsIsUnlimited) {
            context.commit('setPlanVersionSmsAllocation', 'Unlimited', { root: true })
          }
        } catch (e) {
          try {
            const smsIsNotOnPlan = template.text === null
            if (smsIsNotOnPlan) {
              context.commit('setPlanVersionSmsAllocation', 'No service', { root: true })
            }
          } catch (e) {
            console.log('Unsupported SMS Plan')
            context.commit('setAccountDeviceError', true)
          }
        }
      }
      // Setting Data Allocation
      try {
        const dataAllocationBytes = template.data.periodAllowance
        if (dataAllocationBytes !== null) {
          const dataAllocationMb = Math.floor(dataAllocationBytes / getStorageSizeInBytesByUnit('MB'))
          context.commit('setPlanVersionDataAllocationMb', dataAllocationMb.toString(), { root: true })
        } else {
          throw new Error('Data Allocation is null')
        }
      } catch (e) {
        try {
          const dataIsUnlimited = template.data.periodAllowance === null
          if (dataIsUnlimited) {
            context.commit('setPlanVersionDataAllocationMb', 'Unlimited', { root: true })
          }
        } catch (e) {
          try {
            const dataIsNotOnPlan = template.data === null
            if (dataIsNotOnPlan) {
              context.commit('setPlanVersionDataAllocationMb', 'No service', { root: true })
            }
          } catch (e) {
            console.log('Unsupported Data Plan')
            context.commit('setAccountDeviceError', true)
          }
        }
      }
    }
  }
}

export function getPlanVersionInformationQuery (providerId, planVersionId) {
  return JSON.stringify({
    query: `query GetPlanVersion {
    getPlanVersion(
        planVersionId: "${planVersionId}"
        providerId: "${providerId}"
    ) {
        ... on PlanVersionNotFound {
        errorMessage
        errorCode
        planVersionId
        providerId
        }
        ... on PlanVersion {
        providerId
        template {
            ... on InitialTemplateInstance {
            firstUsageFee
            purchaseFee
            period {
                periodType
                numberOfPeriods
                recurring
            }
            voice {
                balanceName
                rollover
                periodAllowance
                offPeak {
                rate
                }
                overage {
                rate
                }
                roaming {
                rate {
                    rate
                }
                }
                longDistance {
                rate {
                    rate
                }
                }
            }
            data {
                ratingGroupId
                balanceName
                rollover
                periodAllowance
                offPeak {
                rate
                }
                fairUsagePolicyCounter {
                states {
                    name
                    threshold
                }
                }
                overage {
                rate
                }
                roaming {
                rate {
                    rate
                }
                }
            }
            text {
                balanceName
                rollover
                periodAllowance
                offPeak {
                rate
                }
                overage {
                rate
                }
                roaming {
                rate {
                    rate
                }
                }
                longDistance {
                rate {
                    rate
                }
                }
            }
            }
        }
        }
    }
    }
    `
  })
}
