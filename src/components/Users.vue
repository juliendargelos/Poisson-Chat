<template>
  <div class="users">
    <div class="users__user" v-for="user in users">
      <user :user="user" :online="Math.random() >= 0.5"></user>
    </div>
  </div>
</template>

<script>
import User from './User'

export default {
  props: ['users'],
  components: {
    User
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/application.sass'

.users
  &__user
    padding: 20px
    margin-bottom: -10px
    cursor: pointer
    overflow: hidden
    transition: background-color .3s
    &:active, &--selected
      background-color: transparentize($white, .95)
      transition: background-color .05s
</style>
