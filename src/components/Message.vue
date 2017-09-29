<template>
  <div :class="'message' + (message.wizz ? ' message--wizz' : '')">
    <div class="message__author">
      <user :user="message.author" :collapse="aligned" :dark="true"></user>
    </div>

    <div class="message__container">
      <p class="message__content">{{ message.body }}</p>
      <span class="message__date">
        <date :date="message.createdAt"></date>
      </span>
    </div>
  </div>
</template>

<script>
import User from './User'
import Date from './Date'

export default {
  props: ['message', 'align', 'higlight'],

  data: function () {
    return {
      aligned: null,
      higlighted: false
    }
  },

  created: function () {
    this.aligned = this.align
    this.higlighted = this.higlight
  },

  watch: {
    aligned: function (v) {
      var aligned = this.$el.className.match(/\bmessage--aligned--([^\s]+)\b/)
      aligned = aligned ? aligned[1] : null

      if (v !== aligned) {
        this.$el.className = this.$el.className.replace(/\bmessage--aligned--[^\s]+\b/, '')
        if (v) this.$el.className += ' message--aligned--' + v
      }
    },

    higlighted: function (v) {
      v = !!v
      var higlighted = this.$el.className.match(/\bmessage--higlighted\b/) !== null

      if (v !== higlighted) {
        if (v) this.$el.className += ' message--higlighted'
        else this.$el.className = this.$el.className.replace(/\bmessage--higlighted\b/, '')
      }
    }
  },

  components: {
    User,
    Date
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/application'

.message
  display: flex
  flex-shrink: 0
  animation: message .5s 1

  &__container
    max-width: 60%
    flex-grow: 0
    flex-shrink: 1

  &__content
    background-color: transparentize($white, .98)
    padding: 20px 25px
    border-radius: 15px
    border: 1px solid transparentize($white, .93)
    color: $white
    line-height: 1.9em
    word-break: break-all

  &__author
    margin-right: 20px
    flex-grow: 0
    flex-shrink: 0

  &--aligned--right
    margin-left: auto
    flex-direction: row-reverse

  &--aligned--right &__author
    margin-right: 0
    margin-left: 20px

  &--higlighted &__content
    background-color: $white
    box-shadow: 0 15px 30px transparentize($black, .85)
    color: $brand

  &__date
    margin-top: 10px
    display: block
    font-size: 8px
    font-weight: bold
    color: transparentize($white, .5)
    text-transform: uppercase
    text-align: right
    letter-spacing: .1em

  &--aligned--right &__date
    text-align: left

  &--wizz &__content
    border-radius: 100px
    border: 3px solid rgb(102, 195, 250)

@keyframes message
  0%
    opacity: 0
    transform: translateY(20px)

  100%
    opacity: 1
    transform: translateY(0)
</style>
