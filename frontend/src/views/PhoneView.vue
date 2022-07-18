<template>
  <div>
    <MainNav />
    <CModal
      backdrop="static"
      :visible="$store.state.accountDeviceError"
    >
      <CModalHeader>
        <CModalTitle>Plan Error</CModalTitle>
      </CModalHeader>
      <CModalBody>Your currently selected plan has unsupported features! Please publish a new plan and plan version and refresh the page to demo.</CModalBody>
    </CModal>
    <br />
    <h1>Device: {{ deviceId }} </h1>
    <ShowAccountBox />
    <CContainer fluid>
    <CRow>
      <CCol>
        <div class="iphone-x">
            <i>Speaker</i>
            <b>Camera</b>
            <br><br><br>
            <CRow>
              <CCol>
                <PhoneIcon :numberMinutes="minuteSelection" />
                <div id="smsVoiceDropDownSelect">
                  <CFormSelect
                    aria-label="Select number of minutes to charge"
                    @change="changeMinuteSelection($event.target.value)"
                  >
                    <option value="5">5 Minutes</option>
                    <option value="25">25 Minutes</option>
                    <option value="100">100 Minutes</option>
                    <option value="250">250 Minutes</option>
                  </CFormSelect>
                </div>
              </CCol>
              <CCol>
                <MessagesIcon :numberSms="smsSelection" />
                <div id="smsVoiceDropDownSelect">
                  <CFormSelect
                    aria-label="Select number of SMS to charge"
                    @change="changeSmsSelection($event.target.value)"
                  >
                    <option value="5">5 SMS</option>
                    <option value="25">25 SMS</option>
                    <option value="100">100 SMS</option>
                    <option value="250">250 SMS</option>
                  </CFormSelect>
                </div>
              </CCol>
            </CRow>
            <hr>
            <h3>Data Usage:</h3>
            <CRow>
              <CCol>
                <NetflixIcon />
                <h4>2hr episode</h4>
                <h4>(2GB)</h4>
              </CCol>
              <CCol>
                <PodcastIcon />
                <h4>1.5hr podcast</h4>
                <h4>(100MB)</h4>
              </CCol>
              <CCol>
                <InstagramIcon />
                <h4>30min social</h4>
                <h4>(50MB)</h4>
              </CCol>
            </CRow>
            <div
              v-if="$store.state.zeroRatedData"
            >
              <hr>
              <CRow>
                <h3>Zero-Rated Data Usage:</h3>
                <CCol>
                  <WhatsAppIcon />
                  <h4>WhatsApp (50MB)</h4>
                </CCol>
                <CCol>
                  <FacebookIcon />
                  <h4>Facebook (50MB)</h4>
                </CCol>
              </CRow>
            </div>
            <span>Left action button</span>
            <span>Right action button</span>
            <br>
        </div>
      </CCol>
      <LogBox :logLines="$store.state.logs" />
    </CRow>
    </CContainer>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue'
import NetflixIcon from '@/components/icons/NetflixIcon.vue'
import MessagesIcon from '@/components/icons/MessagesIcon.vue'
import PhoneIcon from '@/components/icons/PhoneIcon.vue'
import PodcastIcon from '@/components/icons/PodcastIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import LogBox from '@/components/LogBox.vue'
import ShowAccountBox from '@/components/ShowAccountBox.vue'

export default {
  components: {
    FacebookIcon,
    WhatsAppIcon,
    NetflixIcon,
    MessagesIcon,
    PhoneIcon,
    PodcastIcon,
    InstagramIcon,
    LogBox,
    MainNav,
    ShowAccountBox
  },
  name: 'PhoneView',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minuteSelection: 5,
      smsSelection: 5
    }
  },
  methods: {
    changeMinuteSelection (value) {
      this.minuteSelection = value
    },
    changeSmsSelection (value) {
      this.smsSelection = value
    }
  }
}
</script>

<style scoped>

#smsVoiceDropDownSelect {
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

h3 {
  color: #fff;
}
h4 {
  margin-top: 5px;
  color: #fff;
}
.row {
  --bs-gutter-x: 1 rem;
  --cui-gutter-x: 1 rem;
}
body {
  background: #f4f6fc;
}
body:after {
  content: 'Made with ❤️ by Adiel Hercules';
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  background-color: #3F436B;
  color: #fff;
  opacity: 0.6;
}
.iphone-x {
  position: relative;
  margin: 40px auto;
  width: 360px;
  height: 780px;
  background-color: #7371ee;
  background-image: linear-gradient(60deg, #7371ee 1%, #a1d9d6 100%);
  border-radius: 40px;
  box-shadow: 0px 0px 0px 11px #1f1f1f, 0px 0px 0px 13px #191919, 0px 0px 0px 20px #111;
}
.iphone-x:before, .iphone-x:after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.iphone-x:after {
  bottom: 7px;
  width: 140px;
  height: 4px;
  background-color: #f2f2f2;
  border-radius: 10px;
}
.iphone-x:before {
  top: 0px;
  width: 56%;
  height: 30px;
  background-color: #1f1f1f;
  border-radius: 0px 0px 40px 40px;
}
.iphone-x i, .iphone-x b, .iphone-x s, .iphone-x span {
  position: absolute;
  display: block;
  color: transparent;
}
.iphone-x i {
  top: 0px;
  left: 50%;
  transform: translate(-50%, 6px);
  height: 8px;
  width: 15%;
  background-color: #101010;
  border-radius: 8px;
  box-shadow: inset 0px -3px 3px 0px rgba(255, 255, 255, 0.2);
}
.iphone-x b {
  left: 10%;
  top: 0px;
  transform: translate(180px, 4px);
  width: 12px;
  height: 12px;
  background-color: #101010;
  border-radius: 12px;
  box-shadow: inset 0px -3px 2px 0px rgba(255, 255, 255, 0.2);
}
.iphone-x b:after {
  content: '';
  position: absolute;
  background-color: #2d4d76;
  width: 6px;
  height: 6px;
  top: 2px;
  left: 2px;
  top: 3px;
  left: 3px;
  display: block;
  border-radius: 4px;
  box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.5);
}
.iphone-x s {
  top: 50px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  width: 100%;
  font-size: 70px;
  font-weight: 100;
  padding-top: 60px;
}
.iphone-x span {
  bottom: 50px;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  left: 30px;
}
.iphone-x span + span {
  left: auto;
  right: 30px;
}
</style>
