<template>
  <div class="messages">
    <div class="messages__wizz">
      <template v-for="bubble in bubbles">
        <div v-if="bubble" :class="'messages__bubble messages__bubble--type--' + bubble.type" :style="'left:' + bubble.left + 'px;animation-delay:' + bubble.delay + 's'"></div>
      </template>
    </div>
    <div class="messages__content">
      <div class="messages__message" v-for="message in messages">
        <message :message="message" :align="message.author == owner ? 'right' : 'left'" :higlight="message.author == owner" @talkTo="$emit('talkTo', $event)"></message>
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
      length: 0,
      bubbles: []
    }
  },

  created: function () {
    this.scrollDown()
  },

  computed: {
    wizzing: function () {
      return this.bubbles.length !== 0
    }
  },

  watch: {
    messages: function () {
      var delta = this.messages.length > this.length
      if (delta > 0) {
        this.scrollDown()
        this.sound()

        for (var i = this.length; i < this.messages.length; i++) {
          if (this.messages[i].wizz) {
            this.wizz()
            break
          }
        }
      }

      this.length = this.messages.length
    }
  },

  methods: {
    scrollDown: function () {
      var self = this

      setTimeout(function () {
        // self.$el.scroll({top: self.$el.scrollHeight, left: 0, behavior: 'smooth'})
        self.$el.scrollTop = self.$el.scrollHeight
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

      if (!this.wizzing) {
        this.bubbles = (new Array(50)).fill(null, 0, 50).map(function (b, i) {
          return {
            type: (Math.floor(Math.random() * 10) + 1),
            left: Math.floor(Math.random() * window.innerWidth),
            delay: Math.random() * 2
          }
        })

        setTimeout(function () {
          self.bubbles = []
        }, 5000)
      }
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
  // transform: translateZ(0)

  &__content
    width: 100%
    padding: 30px 30px 130px 30px
    box-sizing: border-box
    display: flex
    flex-direction: column
    margin-top: auto
    flex-grow: 1

  &__message:not(:last-of-type)
    margin-bottom: 30px

  &__wizz
    width: 100%
    height: 100%
    top: 0
    left: 0
    z-index: -1
    position: absolute
    transform: translateZ(0)

  &__bubble
    background-repeat: no-repeat
    background-position: center center
    background-size: contain
    top: 100%
    left: 0
    -webkit-will-change: top
    will-change: top

    @for $i from 1 to 10
      &--type--#{$i}
        $size: random(100) + 20px
        background-image: url('/static/assets/bubble-#{$i%2 + 1}.svg')
        width: $size
        height: $size
        position: absolute
        animation: messages__bubble--type--#{$i} random(4) + 1s 1

      @keyframes messages__bubble--type--#{$i}
        0%
          top: 100%
          transform: translate(0, 0)

        @for $j from 2 to 4
          #{$j * 20}%
            transform: translate(random(30) - 15px, 0)

        100%
          top: -50%
          transform: translate(0, 0)
</style>
