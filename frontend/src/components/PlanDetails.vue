<template>
<div>
  <h1>Plan Details</h1>
  <CTable>
    <CTableHead>
        <CTableRow>
            <CTableHeaderCell scope="col">Plan Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Plan Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Plan Version Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Plan Version Id</CTableHeaderCell>
        </CTableRow>
    </CTableHead>
    <CTableBody>
        <CTableRow>
            <CTableDataCell>{{$store.state.currentPlanInformation.planName}}</CTableDataCell>
            <CTableDataCell>{{$store.state.currentPlanInformation.planId}}</CTableDataCell>
            <CTableDataCell>{{$store.state.currentPlanInformation.planVersionName}}</CTableDataCell>
            <CTableDataCell>{{$store.state.currentPlanInformation.planVersionId}}</CTableDataCell>
        </CTableRow>
    </CTableBody>
  </CTable>
  <CRow>
    <CCol></CCol>
    <CCol>
    <p>If the above plan is incorrect, please publish a new plan version for the plan
       you would like to demo with. This tool assumes you want to demo the latest
       plan version of all your plans and versions.
    </p>
    </CCol>
    <CCol></CCol>
  </CRow>
  <CSpinner
    color="info"
    v-if="loadingPlanData"
  />
  <CButton
    v-if="!loadingPlanData"
    color="info"
    @click="loadBasicPlanData()"
  >
  Refresh Plan Details
  </CButton>
</div>
</template>

<script>

export default {
  name: 'PlanDetails',
  data () {
    return {
      loadingPlanData: false
    }
  },
  methods: {
    async loadBasicPlanData () {
      this.loadingPlanData = true
      await this.$store.dispatch('planVersions/getPlanInformation')
      this.loadingPlanData = false
      await this.$nextTick()
      await this.$store.dispatch('planVersionAllocations/getPlanVersionInformation')
    }
  },
  async mounted () {
    await this.$store.dispatch('planVersions/getPlanInformation')
    await this.$nextTick()
    await this.$store.dispatch('planVersionAllocations/getPlanVersionInformation')
  }
}
</script>
