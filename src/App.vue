<template>
  <div id="app" class="app">
    <div class="app__container">
      <router-view @login="login"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.loadAvatars()
    this.direct()
    window.gna = this
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
    },

    loadAvatars () {
      var self = this

      this.$store.avatars = (new Array(12)).fill(null, 0, 12).map(function (a, n) {
        return self.base64FileUrl('/static/assets/fishes/fish-' + (n + 1) + '.svg', function (url) {
          self.$store.avatars[n] = url
        })
      })
    },

    base64FileUrl (url, callback) {
      var xhr = new window.XMLHttpRequest()
      xhr.onload = function () {
        var reader = new window.FileReader()
        reader.onloadend = function () {
          callback(reader.result)
        }
        reader.readAsDataURL(xhr.response)
      }

      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.send()

      return url
    }
  }
}
</script>

<style lang="sass">
@import 'stylesheets/application'
</style>
