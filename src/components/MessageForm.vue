<template>
  <form class="message-form" @submit.prevent="submit">
    <transition name="fade-down">
      <p v-if="typingUsers !== null" class="message-form__typing">{{ typingUsers }}</p>
    </transition>
    <div class="message-form__field">
      <input class="message-form__input" type="text" v-model="input" placeholder="Your message..." @keydown="keydown">
      <input class="message-form__submit" type="submit">
      <span class="message-form__wizz" @click="wizz"></span>
    </div>
  </form>
</template>

<script>
export default {
  props: ['talkTo'],

  data: function () {
    return {
      input: '',
      isTyping: false,
      typingTimeout: null,
      typingInterval: 500
    }
  },

  computed: {
    typingUsers: function () {
      if (this.$store.typing.length === 0) return null
      if (this.$store.typing.length === 1) return this.$store.typing[0].username + ' is typing...'
      else return this.$store.typing.slice(0, this.$store.typing.length - 1).map(function (u) { return u.username }).join(', ') + ' and ' + this.$store.typing[this.$store.typing.length - 1].username + ' are typing...'
    }
  },

  watch: {
    talkTo: function (user) {
      if (typeof user === 'object' && user !== null) {
        this.input = '@' + user.username + ' ' + this.input
        this.$el.querySelector('.message-form__input').focus()
      }
    }
  },

  methods: {
    submit: function (e) {
      var input = this.input.trim()

      if (input !== '') {
        this.input = ''
        this.$emit('submit', {
          body: input,
          author: this.$store.user,
          createdAt: Date.now()
        })
      }
    },

    wizz: function () {
      this.$emit('submit', {
        alert: true,
        wizz: true,
        body: '💦',
        author: this.$store.user,
        createdAt: Date.now()
      })
    },

    keydown: function () {
      var self = this

      if (!this.isTyping) {
        this.isTyping = true
        this.typing()
      }

      clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(function () {
        self.isTyping = false
        self.stopTyping()
      }, this.typingInterval)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/application'

.message-form
  width: 100%
  top: 100%
  padding: 30px
  box-sizing: border-box
  position: absolute
  flex-grow: 0
  flex-shrink: 0
  transform: translateY(-100%)
  +max(small)
    padding: 0

  &__field
    display: flex

  &__typing
    padding-left: 25px
    margin-bottom: 10px
    font-size: 8px
    font-weight: bold
    color: transparentize($white, .5)
    text-transform: uppercase
    letter-spacing: .1em

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
    flex-shrink: 2
    font-family: $sans-serif
    font-size: 14px
    color: $brand
    &::placeholder
      font-weight: bold
      color: $light-grey
    +max(small)
      border-radius: 0

  &__submit, &__wizz
    background-color: lighten($brand, 10)
    background-repeat: no-repeat
    background-position: center center
    border-radius: 50px
    width: 56px
    height: 56px
    flex-grow: 0
    flex-shrink: 0
    cursor: pointer
    appearance: none
    border: none
    display: block
    font-size: 0
    color: transparent
    +max(small)
      margin: 0
      border-radius: 0

  &__submit
    background-image: url('/static/assets/send.svg')
    background-size: 30% auto
    margin-left: 20px

  &__wizz
    background-image: url('/static/assets/wizz.svg')
    background-size: 50% auto
    margin-left: 20px
  //   z-index: -1
  //   opacity: 0
  //   position: relative
  //   transition: .2s
  //   &::before
  //     content: ''
  //     background: red
  //     width: 56px
  //     height: 100px
  //     display: block

  // &__submit:hover + &__wizz, &__wizz:hover
  //   opacity: 1
  //   transform: translateY(calc(-100% - 20px))
</style>
