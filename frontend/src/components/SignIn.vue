<template>
  <CContainer fluid>
    <CRow>
      <CCol>
      </CCol>
      <CCol>
        <img src="@/assets/totogi-logo-rgb.svg" alt="logo" style="max-width: 350px" />
        <CForm>
          <CFormInput
            v-model="email"
            type="email"
            id="email"
            label="Email address"
            placeholder="name@example.com"
          />
          <CFormLabel for="inputPassword">Password</CFormLabel>
          <CFormInput v-model="password" type="password" id="inputPassword"/>
          <br>
          <CButton color="primary" @click="signIn()">Sign in</CButton>
        </CForm>
      </CCol>
      <CCol>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      const data = {
        AuthParameters: {
          USERNAME: this.email,
          PASSWORD: this.password
        },
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: '3bsr3p2j5ffn1cf05knuqc03v2'
      }
      this.$store.dispatch('signIn', data)
    }
  }
}
</script>
