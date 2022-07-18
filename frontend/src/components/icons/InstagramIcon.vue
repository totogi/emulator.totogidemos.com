<template>
    <img @click="iconClicked()" src="@/assets/instagram.png" alt="Instagram icon" id="instagram">
</template>

<script>
import getStorageSizeInBytesByUnit from '@/utils/storageSizes'

export default {
  methods: {
    iconClicked () {
      const message = 'DATA ACTIVITY: Charging 50 MB'
      console.log(message)
      const volume = 50 * getStorageSizeInBytesByUnit('MB')
      const ratingGroupNumber = 300
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
#instagram {
    max-width: 80px;
    border-radius: 10px;
}
</style>
