<template>
    <img @click="iconClicked()" src="@/assets/phone.png" alt="Phone icon" id="phone">
</template>

<script>
export default {
  props: ['numberMinutes'],
  methods: {
    iconClicked () {
      const message = `VOICE ACTIVITY: Charging ${this.numberMinutes} minutes`
      console.log(message)
      const volumeSeconds = this.numberMinutes * 60
      const ratingGroupNumber = 100
      const payload = {
        volume: volumeSeconds,
        ratingGroupNumber: ratingGroupNumber,
        message: message
      }
      this.$store.dispatch('chargeAccount', payload)
    }
  }
}
</script>

<style scoped>
#phone {
    max-width: 80px;
    border-radius: 10px;
}
</style>
