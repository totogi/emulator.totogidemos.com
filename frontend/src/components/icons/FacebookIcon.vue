<template>
    <img @click="iconClicked()" src="@/assets/facebook.png" alt="Facebook icon" id="facebook">
</template>

<script>
import getStorageSizeInBytesByUnit from '@/utils/storageSizes'

export default {
  methods: {
    iconClicked () {
      const message = 'DATA ACTIVITY: Charging 100 MB'
      console.log(message)
      const volume = 100 * getStorageSizeInBytesByUnit('MB')
      const ratingGroupNumber = 310
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
#facebook {
    max-width: 80px;
    border-radius: 10px;
}
</style>
