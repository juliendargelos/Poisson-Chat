<template>
  <div class="user">
    <span class="user__image" :style="'background-image: url(' + user.avatarUrl + ')'">
      <span v-if="status !== null" :class="'user__status user__status--'+status"></span>
    </span>
    <span class="user__name">{{ user.username }}</span>
  </div>
</template>

<script>
export default {
  props: ['user', 'collapse', 'dark', 'online'],

  data: function () {
    return {
      collapsed: null,
      darken: false,
      status: null
    }
  },

  created: function () {
    this.collapsed = this.collapse
    this.darken = this.dark
    this.status = this.online === null ? null : (this.online ? 'online' : 'offline')
  },

  watch: {
    collapsed: function (v) {
      var collapsed = this.$el.className.match(/\buser--collapsed--([^\s]+)\b/)
      collapsed = collapsed ? collapsed[1] : null

      if (v !== collapsed) {
        this.$el.className = this.$el.className.replace(/\buser--collapsed--[^\s]+\b/, '')
        if (v) this.$el.className += ' user--collapsed--' + v
      }
    },

    darken: function (v) {
      if (this.$el) {
        var darken = this.$el.className.match(/\buser--darken\b/) !== null

        if (v !== darken) {
          if (v) this.$el.className += ' user--darken'
          else this.$el.className = this.$el.className.replace(/\buser--darken\b/, '')
        }
      }
    }
  }
}
</script>

<style lang="sass">
@import '../stylesheets/application.sass'

.user
  position: relative
  display: flex
  align-items: center

  &[class*="user--collapsed--"]
    flex-wrap: wrap
    width: 40px

  &__image
    // background-color: $white
    background-repeat: no-repeat
    background-position: center center
    background-size: 80% auto
    margin-right: 10px
    border-radius: 40px
    width: 40px
    height: 40px
    position: relative
    flex-shrink: 0
    flex-grow: 0
    box-shadow: 0 10px 20px transparentize($black, .9)

  &__name
    white-space: keep-all
    cursor: default
    display: block

  &__status
    width: 8px
    height: 8px
    top: 50%
    left: 100%
    border: 2px solid lighten($brand, 10)
    border-radius: 8px
    position: relative
    display: block
    transform: translate(-50%, -50%)

    &--online
      background: $green

    &--offline
      background: $light-grey

  &--darken &__status
    border-color: $brand

  &[class*="user--collapsed--"] &__image
    margin-right: 0

  &[class*="user--collapsed--"] &__name
    background: $white
    top: 0
    margin-top: 10px
    padding: 5px 9px
    border-radius: 30px
    box-shadow: 0 10px 20px transparentize($black, .9)
    display: inline-block
    position: relative
    font-size: 11px
    opacity: 0
    transition: opacity .3s
    &::before
      content: ''
      width: 0
      height: 0
      top: 0
      border: 5px solid transparent
      border-bottom-color: $white
      display: block
      position: absolute
      transform: translateY(-100%)

  &--collapsed--left &__name
    left: 0
    &::before
      left: 15px

  &--collapsed--center &__name
    left: 50%
    transform: translateX(-50%)
    &::before
      left: 50%
      transform: translate(-50%, -100%)

  &--collapsed--right &__name
    left: 100%
    transform: translateX(-100%)
    &::before
      left: 100%
      margin-left: -25px
      transform: translate(-100%, -100%)

  &[class*="user--collapsed--"]:hover &__name
    opacity: 1
</style>
