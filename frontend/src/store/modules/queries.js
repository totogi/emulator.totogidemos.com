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

export function subscribeToPlanQuery (accountId, providerId, planVersionId) {
  return JSON.stringify({
    query: `mutation SubscribeToPlan {
      subscribeToPlan(
        input: {
          accountId: "${accountId}"
          providerId: "${providerId}"
          planVersionId: "${planVersionId}"
        }
      ) {
        ... on SubscribeToPlanVersionValidationFailed {
          errorMessage
          errorCode
        }
        ... on InvalidField {
          errorMessage
          fieldName
          errorCode
        }
        ... on AccountNotFound {
          errorMessage
          providerId
          errorCode
          accountId
        }
        ... on PlanVersionIsNotAssignable {
          errorMessage
          providerId
          planVersionId
          errorCode
        }
        ... on PlanVersionNotFound {
          errorMessage
          planVersionId
          providerId
          errorCode
        }
        ... on SubscribeToPlanVersionPayload {
          __typename
          subscribedPlanVersion {
            to
            from
            planVersion {
              version
              state
              id
            }
          }
          account {
            customData
            id
            activePlanVersions {
              from
              to
              planVersion {
                version
                state
                id
              }
            }
            archivedPlanVersions {
              to
              from
              planVersion {
                version
                state
                id
              }
            }
            balance {
              version
              value
              customData
            }
            inactivePlanVersions {
              to
              planVersion {
                state
                version
                id
              }
              from
            }
          }
        }
      }
    }
    `
  })
}

export function createAccountQuery (accountId, providerId) {
  return JSON.stringify({
    query: `mutation CreateAccount {
      createAccount(
        input: { accountId: "${accountId}", providerId: "${providerId}" }
      ) {
        ... on InvalidField {
          errorMessage
          fieldName
          errorCode
        }
        ... on AccountAlreadyExists {
          errorMessage
          errorCode
          accountId
        }
        ... on AccountNotFound {
          errorMessage
          accountId
          errorCode
          providerId
        }
        ... on CreateAccountPayload {
          __typename
          account {
            id
            providerId
          }
        }
      }
    }
    `
  })
}

export function deleteAccountQuery (accountId, providerId) {
  return JSON.stringify({
    query: `mutation DeleteAccount {
      deleteAccount(
        input: { accountId: "${accountId}", providerId: "${providerId}" }
      ) {
        ... on AccountHasReferences {
          errorMessage
          providerId
          errorCode
          accountId
        }
        ... on AccountNotFound {
          errorMessage
          providerId
          accountId
          errorCode
        }
        ... on DeleteAccountPayload {
          __typename
          deletedAccountId
          parentAccount {
            providerId
            id
            friendsAndFamily
            customData
          }
        }
      }
    }
    `
  })
}

export function createDeviceQuery (deviceId, accountId, providerId) {
  return JSON.stringify({
    query: `mutation CreateDevice {
      createDevice(
        input: {
          accountId: "${accountId}"
          providerId: "${providerId}"
          deviceId: "${deviceId}"
        }
      ) {
        ... on CreateDevicePayload {
          __typename
          device {
            providerId
            id
            customData
            account {
              id
              providerId
            }
          }
        }
        ... on DeviceAlreadyExists {
          errorMessage
          errorCode
          deviceId
        }
        ... on AccountNotFound {
          errorMessage
          providerId
          errorCode
          accountId
        }
        ... on InvalidField {
          errorMessage
          fieldName
          errorCode
        }
      }
    }
    `
  })
}

export function deleteDeviceQuery (deviceId, accountId, providerId) {
  return JSON.stringify({
    query: `mutation DeleteDevice {
      deleteDevice(
        input: {
          accountId: "${accountId}"
          providerId: "${providerId}"
          deviceId: "${deviceId}"
        }
      ) {
        ... on DeviceNotFound {
          errorMessage
          providerId
          errorCode
          deviceId
        }
        ... on DeleteDevicePayload {
          __typename
          deletedDeviceId
          account {
            providerId
            id
          }
        }
      }
    }
    `
  })
}

export function getPlansQuery (providerId) {
  return JSON.stringify({
    query: `query GetPlans {
      getPlans(first: 100, providerId: "${providerId}") {
        edges {
          node {
            id
            name
            versions(first: 100) {
              edges {
                node {
                  version
                  state
                  id
                  createdAt
                }
              }
            }
          }
        }
      }
    }`
  })
}

export function getAccountQuery (accountId, providerId) {
  return JSON.stringify({
    query: `
        query GetAccount {
            getAccount(accountId: "${accountId}", providerId: "${providerId}") {
            ... on AccountNotFound {
              errorMessage
              providerId
              errorCode
              accountId
            }
            ... on Account {
              id
              customData
              providerId
              balance {
                customData
                value
                version
              }
              activePlanVersions {
                from
                to
                overrides {
                  name
                  value
                }
                planVersion {
                  createdAt
                  createdBy
                  deployedAt
                  deployedBy
                  id
                  modifiedAt
                  modifiedBy
                  priority
                  refCount
                  state
                  version
                  planServices {
                    balanceName
                    id
                    name
                    ratingGroupId
                    ruleSets {
                      charging {
                        id
                        name
                        pluginId
                      }
                      crediting {
                        id
                        name
                        pluginId
                      }
                      recurring {
                        id
                        name
                        pluginId
                      }
                    }
                  }
                }
              }
              archivedPlanVersions {
                from
                to
                overrides {
                  name
                  value
                }
                planVersion {
                  createdAt
                  createdBy
                  deployedAt
                  deployedBy
                  id
                  modifiedAt
                  modifiedBy
                  priority
                  refCount
                  state
                  version
                  planServices {
                    balanceName
                    id
                    name
                    ratingGroupId
                    ruleSets {
                      charging {
                        id
                        name
                        pluginId
                      }
                      crediting {
                        id
                        name
                        pluginId
                      }
                      recurring {
                        id
                        name
                        pluginId
                      }
                    }
                  }
                }
              }
              inactivePlanVersions {
                from
                to
                planVersion {
                  createdAt
                  createdBy
                  deployedAt
                  deployedBy
                  id
                  modifiedAt
                  modifiedBy
                  priority
                  refCount
                  state
                  version
                  planServices {
                    balanceName
                    id
                    name
                    ratingGroupId
                    ruleSets {
                      charging {
                        id
                        name
                        pluginId
                      }
                      crediting {
                        id
                        name
                        pluginId
                      }
                      recurring {
                        id
                        name
                        pluginId
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

export function creditAccountMutation (accountId, providerId, amount) {
  return JSON.stringify({
    query: `mutation credit {
      creditAccount(
        input: { accountId: "${accountId}", providerId: "${providerId}", amount: ${amount} }
      ) {
        ... on InvalidField {
          errorMessage
          fieldName
          errorCode
        }
        ... on CreditAccountPayload {
          __typename
          account {
            id
            providerId
            balance {
              customData
            }
          }
        }
      }
    }
    `
  })
}

export function getEventDataRecordsByDeviceQuery (providerId, deviceId, timestampStart, timestampEnd, after) {
  let query
  query = `query getEventDataRecordsByDevice {
    getEventDataRecordsByDevice(
      providerId: "${providerId}",
      deviceId: "${deviceId}",`
  if (after !== undefined) {
    query += `after: "${after}",`
  }
  query += `first: 10,
      filterBy: {
        types: [BILLING],
        from: "${timestampStart}",
        to: "${timestampEnd}"
    })
    {
        ... on EventDataRecordDeviceConnection{
              edges{
                  node{
                      customData
                      id
                  }
                  cursor
              }
              pageInfo{
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
              }
          }
          ... on DeviceNotFound{
              providerId
              deviceId
              errorCode
              errorMessage
          }
      }
    }`
  return JSON.stringify({
    query: query
  })
}
