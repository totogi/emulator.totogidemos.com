<template>
<div>
  <hr>
  <h1>Configure a Custom Device</h1>
  <CRow>
    <CCol></CCol>
    <CCol>
        <CForm>
            <CFormInput
            v-model="deviceId"
            type="deviceId"
            id="deviceId"
            label="Device ID"
            placeholder="abc-12345"
            />
            <br>
            <CButton color="primary" @click="createCustomDevice()">Create</CButton>
            <CSpinner
            color="info"
            v-if="loadingCustomDevices"
            />
        </CForm>
    </CCol>
    <CCol></CCol>
  </CRow>
</div>
</template>

<script>
export default {
  name: 'DeviceDetails',
  data () {
    return {
      loadingCustomDevices: false,
      deviceId: ''
    }
  },
  methods: {
    async createCustomDevice () {
      this.loadingCustomDevices = true
      this.$store.commit('addDemoAccountsAndDevices', { id: this.deviceId, name: 'customDevice0' })
      this.loadingCustomDevices = false
    }
  }
}
</script>
