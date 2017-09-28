<template>
  <div class="messages">
    <div class="messages__content">
      <div class="messages__message" v-for="message in messages">
        <message :message="message" :align="message.author == owner ? 'right' : 'left'" :higlight="message.author == owner"></message>
      </div>
    </div>

    <audio class="messages__sound">
      <source src="/static/assets/sounds/message.m4a">
    </audio>

    <audio class="messages__sound-wizz">
      <source src="/static/assets/sounds/wizz.m4a">
    </audio>
  </div>
</template>

<script>
import Message from './Message'

export default {
  props: ['messages', 'owner'],

  data: function () {
    return {
      length: 0
    }
  },

  created: function () {
    this.scrollDown()
  },

  watch: {
    messages: function () {
      if (this.messages.length > this.length) {
        this.scrollDown()
        this.sound()
      }

      this.length = this.messages.length
    }
  },

  methods: {
    scrollDown: function () {
      var self = this

      setTimeout(function () {
        self.$el.scroll({top: self.$el.scrollHeight, left: 0, behavior: 'smooth'})
      }, 1)
    },

    sound: function () {
      var sound = this.$el.querySelector('.messages__sound')

      sound.pause()
      sound.currentTime = 0
      sound.play()
    },

    wizz: function () {
      var self = this
      var wizz = this.$el.querySelector('.messages__sound-wizz')

      wizz.pause()
      wizz.currentTime = 0
      wizz.play()

      setTimeout(function () {
        self.$el.className = self.$el.className.replace(/\bmessages--wizz\b/, '') + ' messages--wizz'
      }, 500)

      setTimeout(function () {
        self.$el.className = self.$el.className.replace(/\bmessages--wizz\b/, '')
      }, 1500)
    }
  },

  components: {
    Message
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/application'

.messages
  flex-grow: 1
  flex-shrink: 1
  overflow: scroll

  &__content
    width: 100%
    padding: 30px 30px 116px 30px
    box-sizing: border-box
    display: flex
    flex-direction: column
    margin-top: auto
    flex-grow: 1

  &__message:not(:last-of-type)
    margin-bottom: 30px

  &--wizz
    overflow: hidden
    animation: wizz .3s 1
</style>
