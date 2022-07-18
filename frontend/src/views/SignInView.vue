<template>
  <div>
    <MainNav />
    <SignIn />
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn.vue'
import MainNav from '../components/MainNav.vue'

export default {
  name: 'SignInView',
  components: {
    SignIn,
    MainNav
  }
}
</script>
