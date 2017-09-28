<template>
  <form class="message-form" @submit.prevent="submit">
    <input class="message-form__input" type="text" v-model="input" placeholder="Your message...">
    <input class="message-form__submit" type="submit">
    <span class="message-form__wizz" @click="wizz"></span>
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      input: ''
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
        type: 'wizz',
        content: '💦',
        date: Date.now()
      })
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
  display: flex
  flex-grow: 0
  flex-shrink: 0
  transform: translateY(-100%)
  +max(small)
    padding: 0

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
    background-size: 30% auto
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
    margin-left: 30px

  &__wizz
    background-image: url('/static/assets/wizz.svg')
    margin-left: -56px
    z-index: -1
    opacity: 0
    position: relative
    transition: .2s
    &::before
      content: ''
      width: 56px
      height: 100px
      display: block

  &__submit:hover + &__wizz, &__wizz:hover
    opacity: 1
    transform: translateY(calc(-100% - 20px))
</style>
