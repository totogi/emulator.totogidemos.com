<template>
  <div>
    <MainNav />
    <DeviceDetails />
    <ConfigureCustomDevice />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import DeviceDetails from '@/components/DeviceDetails.vue'
import ConfigureCustomDevice from '@/components/ConfigureCustomDevice.vue'

export default {
  name: 'DevicesView',
  components: {
    MainNav,
    DeviceDetails,
    ConfigureCustomDevice
  }
}
</script>
