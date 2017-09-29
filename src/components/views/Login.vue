<template>
  <main class="login">
    <h1 class="login__logo"></h1>
    <form class="login__form" @submit.prevent='submit'>
      <div class="login__field">
        <input class="login__input" id="username" placeholder="Username" v-model="username" type='text'>
        <input class="login__submit" id="submit" type='submit' value="Login">
      </div>

      <p class="login__error" v-if="error">{{ error }}</p>
    </form>
  </main>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      error: false
    }
  },

  watch: {
    filled: function () {
      var filled = this.$el.className.match(/\blogin--filled\b/)
      filled = filled ? filled[1] : null

      if (this.filled !== filled) {
        if (this.filled) this.$el.className += ' login--filled'
        else this.$el.className = this.$el.className.replace(/\blogin--filled\b/, '')
      }
    },

    username: function () {
      this.error = false
    }
  },

  computed: {
    filled: function () {
      return this.username.trim() !== ''
    },

    valid: function () {
      return this.username.match(/^\w{1,15}$/) !== null
    },

    fingerprint: function () {
      var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

      return this.username.toLowerCase().split('').reduce(function (sum, char) {
        return sum + chars.indexOf(char)
      }, 0)
    },

    avatar: function () {
      return this.$store.avatars[this.fingerprint % this.$store.avatars.length]
    }
  },

  methods: {
    submit: function (e) {
      if (this.filled) {
        if (this.valid) {
          this.$emit('login', {
            username: this.username,
            id: this.fingerprint,
            avatarUrl: this.avatar
          })
        } else {
          this.error = 'Invalid name'
          this.wizz()
        }
      } else {
        this.error = 'Please fill your username'
      }
    },

    wizz: function () {
      this.$el.className = this.$el.className.replace(/\blogin--error(?:--none)?\b/, '') + ' login--error'
      var self = this

      setTimeout(function () {
        self.$el.className = self.$el.className.replace(/\blogin--error\b/, ' login--error-none')
      }, 400)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../stylesheets/application'

.login
  background: $brand
  min-height: 100vh
  box-sizing: border-box
  padding: 0 30px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

  &__form
    width: 100%
    max-width: 350px
    position: relative
    flex-grow: 0
    flex-shrink: 0

  &__field
    display: flex

  &__logo
    background: url('/static/assets/logo.svg') no-repeat center center / contain
    width: 150px
    height: 150px
    margin-top: -180px
    margin-bottom: 0
    transform: translateX(-8%)
    animation: login__logo .8s 1

  &__input
    background: $white
    border: none
    margin: 0
    padding: 20px 24px
    outline: none
    border-radius: 40px
    box-shadow: 0 15px 30px transparentize($black, .85)
    appearance: none
    flex-grow: 1
    flex-shrink: 1
    font-family: $sans-serif
    font-size: 14px
    color: $brand
    text-align: center
    transition: .3s
    animation: login__input .8s 1
    +max(small)
      padding: 15px 19px
    &::placeholder
      font-weight: bold
      color: $light-grey

  &__submit
    background: lighten($brand, 10) url('/static/assets/validate.svg') no-repeat center center / 30% auto
    border-radius: 50px
    width: 56px
    height: 56px
    opacity: 0
    margin-right: -86px
    cursor: pointer
    margin-left: 30px
    appearance: none
    border: none
    flex-grow: 0
    flex-shrink: 0
    display: block
    font-size: 0
    color: transparent
    transition: .3s
    +max(small)
      margin-left: 10px
      margin-right: -66px

  &__error
    width: 100%
    margin: 10px 0 -18px 25px
    color: $white
    font-weight: bold
    font-size: 8px
    text-transform: uppercase
    letter-spacing: .5em
    animation: login__error .2s 1

  &--filled &__submit
    opacity: 1
    margin-right: 0

  &--error &__input
    animation: wizz .3s 1

  &--error-none &__input
    animation: none

@keyframes login__logo
  0%
    transform: translate(-8%, 56px)

  50%
    transform: translate(-8%, 56px)

  100%
    transform: translate(-8%, 0)

@keyframes login__input
  0%
    opacity: 0
    transform: translateY(20px)

  60%
    opacity: 0
    transform: translateY(20px)

  100%
    opacity: 1
    transform: translateY(0)

@keyframes login__error
  0%
    opacity: 0
    transform: translateY(-10px)

  100%
    opacity: 1
    transform: translateY(0)
</style>
