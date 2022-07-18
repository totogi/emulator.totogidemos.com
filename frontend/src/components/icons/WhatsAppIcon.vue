<template>
    <img @click="iconClicked()" src="@/assets/whatsapp.png" alt="WhatsApp icon" id="whatsapp">
</template>

<script>
import getStorageSizeInBytesByUnit from '@/utils/storageSizes'

export default {
  methods: {
    iconClicked () {
      const message = 'DATA ACTIVITY: Charging 100 MB'
      console.log(message)
      const volume = 100 * getStorageSizeInBytesByUnit('MB')
      const ratingGroupNumber = 320
      const payload = {
        volume: volume,
        ratingGroupNumber: ratingGroupNumber,
        message: message
      }
      this.$store.dispatch('chargeAccount', payload)
    }
  }
}
</script>

<style scoped>
#whatsapp {
    max-width: 80px;
    border-radius: 10px;
}
</style>
