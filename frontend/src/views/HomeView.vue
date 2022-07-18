<template>
  <div>
    <MainNav />
    <br />
    <PlanDetails />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import PlanDetails from '@/components/PlanDetails.vue'

export default {
  name: 'HomeView',
  components: {
    MainNav,
    PlanDetails
  }
}
</script>
