<template>
  <div id="app" class="app">
    <div class="app__container">
      <router-view @login="login"></router-view>
    </div>
  </div>
</template>

<script>
import avatar from './dataManager/avatar.js'

export default {
  mounted: function () {
    avatar.load()
    this.direct()
  },

  computed: {
    loggedIn: function () {
      return !!this.$store.user
    }
  },

  methods: {
    direct: function () {
      if (this.$router.currentRoute.name === 'logout') this.logout()
      else if (!this.loggedIn && this.$router.currentRoute.name !== 'login') this.$router.push({ path: '/login' })
      else if (this.loggedIn && this.$router.currentRoute.name === 'login') this.$router.push({ path: '/' })
    },

    login: function (user) {
      this.$store.user = user
      this.connect(user)
      this.$router.push({ path: '/' })
    },

    logout: function () {
      this.$store.user = null
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="sass">
@import 'stylesheets/application'
</style>
