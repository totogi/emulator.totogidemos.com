<template>
<div>
  <CContainer fluid>
    <CRow>
      <CCol :xs="1"></CCol>
      <!-- VOICE -->
      <CCol :xs="2">
        <!-- If we have an Unlimited Voice allocation -->
        <CCard
          v-if="$store.state.planVersionVoiceAllocationMinutes == 'Unlimited'"
        >
          <br />
          <CIcon :icon="cilPhone" height="36"/>
          <CCardBody>
            Unlimited plan.<br/>
            <CBadge color="info">Used Min: {{ $store.state.edrs.voiceEdrSummary }}</CBadge>
          </CCardBody>
        </CCard>
        <!-- If a service is not present within the plan -->
        <CCard
          v-else-if="$store.state.planVersionVoiceAllocationMinutes == 'No service'"
        >
          <br />
          <CIcon :icon="cilPhone" height="36"/>
          <CCardBody>
            No voice service is present on this plan.
          </CCardBody>
        </CCard>
        <!-- If we have a limited voice allocation -->
        <DoughnutChart
          v-else
          charge-type=Minutes
          :key="$store.state.currentVoiceBalanceMinutes"
          :volume-used="$store.state.planVersionVoiceAllocationMinutes - $store.state.currentVoiceBalanceMinutes"
          :volume-remaining="Number($store.state.currentVoiceBalanceMinutes)"
        ></DoughnutChart>
      </CCol>
      <!-- SMS -->
      <CCol :xs="2">
        <!-- If we have an Unlimited SMS allocation -->
        <CCard
          v-if="$store.state.planVersionSmsAllocation == 'Unlimited'"
        >
          <br />
          <CIcon :icon="cilCommentBubble" height="36"/>
          <CCardBody>
            Unlimited plan.
            <CBadge color="info">Used SMS: {{ $store.state.edrs.smsEdrSummary }}</CBadge>
          </CCardBody>
        </CCard>
        <!-- If a service is not present within the plan -->
        <CCard
          v-else-if="$store.state.planVersionSmsAllocation == 'No service'"
        >
          <br />
          <CIcon :icon="cilCommentBubble" height="36"/>
          <CCardBody>
            No SMS service is present on this plan.
          </CCardBody>
        </CCard>
        <!-- If we have a limited SMS allocation -->
        <DoughnutChart
          v-else
          charge-type=SMS
          :key="$store.state.currentSmsBalance"
          :volume-used="$store.state.planVersionSmsAllocation - $store.state.currentSmsBalance"
          :volume-remaining="Number($store.state.currentSmsBalance)"
        ></DoughnutChart>
      </CCol>
      <!-- DATA -->
      <CCol :xs="2">
        <!-- If we have an Unlimited Data allocation -->
        <CCard
          v-if="$store.state.planVersionDataAllocationMb == 'Unlimited'"
        >
          <br />
          <CIcon :icon="cilArrowCircleBottom" height="36"/>
          <CCardBody>
            Unlimited plan.
            <CBadge color="info">Used MB: {{ $store.state.edrs.dataEdrSummary }}</CBadge>
          </CCardBody>
        </CCard>
        <!-- If a service is not present within the plan -->
        <CCard
          v-else-if="$store.state.planVersionDataAllocationMb == 'No service'"
        >
          <br />
          <CIcon :icon="cilArrowCircleBottom" height="36"/>
          <CCardBody>
            No data service is present on this plan.
          </CCardBody>
        </CCard>
        <!-- If we have a limited Data allocation -->
        <DoughnutChart
          v-else
          charge-type="Data (MB)"
          :key="$store.state.currentDataBalanceMb"
          :volume-used="$store.state.planVersionDataAllocationMb - $store.state.currentDataBalanceMb"
          :volume-remaining="Number($store.state.currentDataBalanceMb)"
        ><CIcon :icon="cilArrowCircleBottom" height="36"/>
        </DoughnutChart>
      </CCol>
      <!-- DATA: ZERO RATED -->
      <CCol :xs="2">
        <!-- If we have zero rated data on the plan -->
        <CCard v-if="$store.state.zeroRatedData">
          <div class='title'>Zero-rated Data (MB)</div>
          <CIcon :icon="cilArrowCircleBottom" height="36"/>
          <CCardBody>
            <CRow>
              <CCol :xs="2">
                <img src="@/assets/facebook.png" alt="Facebook icon" class="ratingIcons">
              </CCol>
              <CCol :xs="10">
                Facebook: <CBadge color="info">100MB</CBadge>
              </CCol>
            </CRow>
            <CRow>
              <CCol :xs="2">
                <img src="@/assets/whatsapp.png" alt="WhatsApp icon" class="ratingIcons">
              </CCol>
              <CCol :xs="10">
                WhatsApp: <CBadge color="info">100MB</CBadge>
              </CCol>
            </CRow>
          </CCardBody>
        <!-- If we have no zero-rated data on the plan -->
        </CCard>
        <CCard v-if="!$store.state.zeroRatedData">
          <br />
          <CIcon :icon="cilArrowCircleBottom" height="36"/>
          <CCardBody>
            <CRow>
              <CCol :xs="12">
                No zero-rated data configured.
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <!-- MONETARY BALANCE -->
      <CCol :xs="2">
        <CCard>
          <div class='title'>Balance:</div>
          <CIcon :icon="cilMoney" height="36"/>
          <CCol :xs="12">
            $ {{ parseFloat($store.state.currentMonetaryBalance).toFixed(2) }}
          </CCol>
          <br />
        </CCard>
      </CCol>
      <CCol :xs="1"></CCol>
    </CRow>
  </CContainer>
  <br />
</div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'
import { cilPeople, cilPhone, cilCommentBubble, cilArrowCircleBottom, cilMoney } from '@coreui/icons'
import DoughnutChart from '@/components/DoughnutChart.vue'

export default {
  name: 'ShowAccountBox',
  components: {
    CIcon,
    DoughnutChart
  },
  setup () {
    return {
      cilPeople,
      cilPhone,
      cilCommentBubble,
      cilArrowCircleBottom,
      cilMoney
    }
  },
  mounted: function () {
    console.log('Ready')
    this.loadData()
    setInterval(function () {
      console.log('interval')
      this.loadData()
    }.bind(this), 6000)
  },
  methods: {
    loadData: function () {
      console.log('Getting account for ' + this.$store.state.demoAccountsAndDevices[0].name)
      this.$store.dispatch('getAccount')
      this.$store.dispatch('notifications/update')
      this.$store.dispatch('getAndSummarizeEdrs')
    }
  }
}
</script>

<style scoped>
.ratingIcons {
    max-width: 30px;
    border-radius: 5px;
    margin-bottom: 6px;
}
.title {
    font-size: 24px;
    font-weight: 900;
    color: #666666;
    margin-top: 20px;
    font-family: Arial;
}
</style>
