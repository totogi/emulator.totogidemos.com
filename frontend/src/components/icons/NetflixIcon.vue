<template>
    <img @click="iconClicked()" src="@/assets/netflix.png" alt="Netflix icon" id="netflix">
</template>

<script>
import getStorageSizeInBytesByUnit from '@/utils/storageSizes'

export default {
  methods: {
    iconClicked () {
      const message = 'DATA ACTIVITY: Charging 2 GB'
      console.log(message)
      const volume = 2 * getStorageSizeInBytesByUnit('GB')
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
#netflix {
    max-width: 80px;
    border-radius: 10px;
}
</style>
