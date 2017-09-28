<template>
  <div class="sidebar">
    <div class="sidebar__heading">
      <div class="sidebar__heading-content">
        <slot name="heading"></slot>
      </div>
      <span class="sidebar__toggler" @click="toggle"></span>
    </div>

    <div class="sidebar__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['collapse'],

  data: function () {
    return {
      resized: false,
      collapsed: false
    }
  },

  created: function () {
    var self = this
    this.collapsed = this.collapse

    window.addEventListener('resize', function () {
      self.resize()
    })

    self.resize()
  },

  watch: {
    collapsed: function (v) {
      v = !!v
      var collapsed = this.$el.className.match(/\bsidebar--collapsed\b/) !== null

      if (v !== collapsed) {
        if (v) this.$el.className += ' sidebar--collapsed'
        else this.$el.className = this.$el.className.replace(/\bsidebar--collapsed\b/, '')
      }
    }
  },

  methods: {
    toggle: function () {
      this.collapsed = !this.collapsed
    },

    resize: function () {
      if (window.innerWidth <= 700) {
        if (!this.resized) {
          this.resized = true
          this.collapsed = true
        }
      } else if (this.resized) {
        this.resized = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/application.sass'

.sidebar
  background-color: lighten($brand, 10)
  width: 300px
  box-shadow: 0 0 30px transparentize($black, .85)
  box-sizing: border-box
  overflow: hidden
  color: $white
  flex-grow: 0
  flex-shrink: 0
  display: flex
  flex-direction: column
  transition: margin-left .4s cubic-bezier(.5, 0, 0, 1)
  +max(medium)
    width: 100vw

  &--collapsed
    margin-left: -220px
    +max(medium)
      margin-left: calc(-100vw + 80px)
    +max(small)
      margin-left: calc(-100vw + 60px)

  &__heading
    background-color: $white
    box-shadow: 0 0 30px transparentize($black, .85)
    z-index: 2
    position: relative
    display: flex
    flex-grow: 0
    flex-shrink: 0
    align-items: center
    color: $brand

  &__heading-content
    width: 0
    padding: 20px
    flex-grow 1
    flex-shrink: 1

  &__toggler
    background-color: transparentize($brand, 1)
    width: 80px
    height: 70px
    cursor: pointer
    display: flex
    align-items: center
    justify-content: center
    flex-grow: 0
    flex-shrink: 0
    margin-left: auto
    transition: background-color .3s
    &:active
      background-color: transparentize($brand, .85)
      transition: background-color .1s
    &::before
      content: ''
      background: url('/static/assets/toggler.svg') no-repeat center center / contain
      width: 20px
      height: 20px
      display: block
      transition: transform .3s
    +max(small)
      width: 60px

  &--collapsed &__toggler
    &::before
      transform: rotate(180deg)

  &__content
    flex-grow: 1
    overflow: scroll
    transition: color .4s cubic-bezier(.5, 0, 0, 1), padding-left .4s cubic-bezier(.5, 0, 0, 1), padding-right .4s cubic-bezier(.5, 0, 0, 1)

  &--collapsed &__content
    padding-left: 220px
    padding-right: 0
    color: transparentize($white, 1)
    +max(medium)
      padding-left: calc(100vw - 80px)
    +max(small)
      padding-left: calc(100vw - 70px)
</style>
