<template>
<div>
  <h1>Device Details</h1>
  <CTable>
    <CTableHead>
        <CTableRow>
            <CTableHeaderCell scope="col">Device ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Device Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Plan Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Demo Page</CTableHeaderCell>
        </CTableRow>
    </CTableHead>
    <CTableBody>
        <CTableRow
            v-for="device in $store.state.demoAccountsAndDevices"
            :key="device.id"
        >
            <CTableDataCell>{{device.id}}</CTableDataCell>
            <CTableDataCell>
              {{device.name}}
            </CTableDataCell>
            <CTableDataCell>
              {{$store.state.currentPlanInformation.planName}}
            </CTableDataCell>
            <CTableDataCell>
                <CLink @click="this.$router.push('/device/' + device.name)">
                    <CButton color="primary">
                        Demo Page
                    </CButton>
                </CLink>
            </CTableDataCell>
        </CTableRow>
    </CTableBody>
  </CTable>
  <CRow>
    <CCol></CCol>
    <CCol>
    <p>
        When you're ready to provision devices for a demo
        click the button below.
    </p>
    </CCol>
    <CCol></CCol>
  </CRow>
  <CSpinner
    color="info"
    v-if="loadingDemoDevices"
  />
  <CButton
    v-if="!loadingDemoDevices"
    color="info"
    @click="provisionDevices()"
  >
  Provision Demo Devices
  </CButton>
</div>
</template>

<script>
export default {
  name: 'DeviceDetails',
  data () {
    return {
      loadingDemoDevices: false
    }
  },
  methods: {
    async provisionDevices () {
      this.loadingDemoDevices = true
      const accountDeviceId = crypto.randomUUID()
      const accountDeviceName = 'demoDevice' + this.$store.state.demoAccountsAndDevices.length
      await this.$store.dispatch('account/create', { accountId: accountDeviceId })
      await this.$store.dispatch('device/create', { deviceId: accountDeviceId, accountId: accountDeviceId }, { root: true })
      await this.$store.dispatch('account/credit', { accountId: accountDeviceId, amount: 1000 })
      await this.$store.dispatch('account/subscribeToCurrentPlanVersion', { accountId: accountDeviceId })
      this.$store.commit('addDemoAccountsAndDevices', { id: accountDeviceId, name: accountDeviceName })
      this.loadingDemoDevices = false
    }
  }
}
</script>
