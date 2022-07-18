import axios from 'axios'
import * as jose from 'jose'
import router from '@/router'
import getProviderId from '@/utils/providerId'
import { cognitoIdpSignInUrl } from '../common'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async signIn (context, data) {
      try {
        console.log(data)
        const response = await axios.post(cognitoIdpSignInUrl, data, {
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
          }
        })
        const idToken = response.data.AuthenticationResult.IdToken
        const decodedToken = jose.decodeJwt(idToken)
        const providerId = getProviderId(decodedToken)
        context.commit('setIdToken', idToken, { root: true })
        context.commit('setProviderId', providerId, { root: true })
      } catch (error) {
        console.log(error)
      }
      router.push('/')
    }
  }
}
