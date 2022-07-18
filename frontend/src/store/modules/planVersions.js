import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { graphQLUrl } from '@/store/common'
import { getPlansQuery } from '@/store/modules/queries'

// var edges = [ { "node": { "id": "1cfcb63b-8bd0-4879-969a-f3e13c0ce7b4", "name": "Igotot Bronze", "versions": { "edges": [ { "node": { "version": "Version 1", "state": "AVAILABLE", "id": "92957a55-b564-444a-9b32-0109bb9a4548", "createdAt": "2022-05-02T22:16:41.817Z" } } ] } } }, { "node": { "id": "38b3ab77-28cc-456b-91f1-379d9e6c3427", "name": "Igotot Wood", "versions": { "edges": [ { "node": { "version": "Version 1", "state": "AVAILABLE", "id": "5897591b-c45e-4a1c-8d5a-c4ec7e4d29ce", "createdAt": "2022-05-02T22:29:16.109Z" } } ] } } }, { "node": { "id": "4e304b9a-0022-4c98-bbcf-4662d0c94e0f", "name": "Igotot Unlimited", "versions": { "edges": [ { "node": { "version": "Version 1", "state": "AVAILABLE", "id": "50611d74-a68a-4824-a21d-04105a1effdb", "createdAt": "2022-04-20T17:32:10.992Z" } } ] } } }, { "node": { "id": "65a35954-9595-4f29-80aa-1b500e6d4926", "name": "Igotot Legacy 3", "versions": { "edges": [ { "node": { "version": "Version 2", "state": "SUSPENDED", "id": "8321c2ac-e807-4495-b5a5-50900ce359e0", "createdAt": "2022-04-08T17:59:19.842Z" } }, { "node": { "version": "Version 1", "state": "SUSPENDED", "id": "d7b2bb48-3fbb-45ae-8ae4-8a54d20b1f4c", "createdAt": "2022-03-28T22:18:50.389Z" } } ] } } }, { "node": { "id": "65d7ab3b-52d9-461a-a0ea-4718749314ec", "name": "Monster Data", "versions": { "edges": [ { "node": { "version": "Version 1", "state": "AVAILABLE", "id": "0349e576-4118-46ab-8eca-dbabfbe7c88b", "createdAt": "2022-04-24T20:03:11.709Z" } } ] } } }, { "node": { "id": "84dbe7b8-6e4e-4440-bbaa-4e179429d1ab", "name": "Igotot Legacy", "versions": { "edges": [ { "node": { "version": "Version 1 (new)", "state": "ARCHIVED", "id": "0637e17b-ab0a-4df0-a097-f11bce19098d", "createdAt": "2022-04-11T16:25:51.642Z" } }, { "node": { "version": "Version 1", "state": "SUSPENDED", "id": "3248094d-d494-47a5-96ab-eaea04ad7e9f", "createdAt": "2022-04-11T15:43:41.205Z" } } ] } } }, { "node": { "id": "a9d88747-51bd-4564-a666-805e8d9cc529", "name": "Igotot Legacy 2", "versions": { "edges": [ { "node": { "version": "Version 1", "state": "ARCHIVED", "id": "bfd95070-e2ae-4bbe-8aa4-fdbbb3792684", "createdAt": "2022-04-11T16:18:58.329Z" } } ] } } }, { "node": { "id": "b242aeae-af3c-4eb5-b49e-5e4ba3cb4eb9", "name": "Igotot Basics", "versions": { "edges": [ { "node": { "version": "Version 1", "state": "SUSPENDED", "id": "8ab139f7-1cb3-4af0-a911-8ca4fa915e5b", "createdAt": "2022-04-20T16:38:11.368Z" } }, { "node": { "version": "Version 1 (new)", "state": "SUSPENDED", "id": "a95ce4a2-01c8-4ebe-a54d-5b844f2e6762", "createdAt": "2022-04-20T17:04:24.008Z" } }, { "node": { "version": "Version 3", "state": "AVAILABLE", "id": "e4d30227-5e6b-48b7-82a0-fca08f119cc1", "createdAt": "2022-04-26T15:33:59.141Z" } } ] } } }, { "node": { "id": "ea04e03f-c432-49a0-8921-34d6e8e63be0", "name": "Igotot LowBalanceNotification", "versions": { "edges": [ { "node": { "version": "Version 1", "state": "AVAILABLE", "id": "1f27e347-680f-4ad0-ad07-9b9b03bf0fc8", "createdAt": "2022-05-02T23:31:49.847Z" } } ] } } } ];
export function availablePlansAndVersions (rawData) {
  function removeUnavailableVersions (edge) {
    if (!['SUSPENDED', 'ARCHIVED'].includes(edge.node.state)) {
      return edge.node
    }
  }
  function removeCruft (edge) {
    return {
      planId: edge.node.id,
      planName: edge.node.name,
      planVersions: _.omitBy(
        _.map(
          edge.node.versions.edges,
          removeUnavailableVersions
        ),
        _.isNil
      )[_.keys(_.omitBy(_.map(edge.node.versions.edges, removeUnavailableVersions), _.isNil))]
    }
  }
  function removeUnavailablePlans (result) {
    return result.planVersions
  }
  let results
  results = _.map(rawData, removeCruft)
  results = _.remove(results, removeUnavailablePlans)
  results = _.map(results, function (result) {
    return {
      planId: result.planId,
      planName: result.planName,
      planVersionName: result.planVersions.version,
      planVersionId: result.planVersions.id,
      createdAt: result.planVersions.createdAt
    }
  })
  return results
}

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
  // Rename to getLatest later
    async getPlanInformation (context) {
      const idToken = context.rootState.idToken
      const providerId = context.rootState.providerId
      const response = await axios.post(graphQLUrl, getPlansQuery(providerId), {
        headers: {
          Authorization: `${idToken}`
        }
      })
      console.log(response)
      const plans = response.data.data.getPlans
      const edges = plans.edges
      const availablePlans = availablePlansAndVersions(edges)
      context.commit('setAllAvailablePlanInformation', availablePlans, { root: true })
      const latestPlan = _.sortBy(availablePlans, function (plan) {
        return moment(plan.createdAt)
      }).reverse()[0]
      context.commit('setCurrentPlanInformation', latestPlan, { root: true })
    }
  }
}
