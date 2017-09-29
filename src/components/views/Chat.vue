<template>
  <main class="chat">
    <sidebar>
      <user :user="$store.user" slot="heading"></user>

      <users :users="$store.users"></users>
    </sidebar>

    <div class="chat__content">
      <messages :messages="$store.messages" :owner="$store.user"></messages>
      <message-form @submit="send"></message-form>
    </div>
  </main>
</template>

<script>
import Sidebar from '../Sidebar'
import SearchForm from '../SearchForm'
import MessageForm from '../MessageForm'
import Messages from '../Messages'
import Users from '../Users'
import User from '../User'

export default {
  components: {
    Sidebar,
    SearchForm,
    MessageForm,
    Messages,
    Users,
    User
  }
}
</script>

<style lang="sass" scoped>
@import '../../stylesheets/application'

.chat
  background: $brand
  height: 100vh
  display: flex
  position: relative
  overflow: hidden
  transform: translateZ(0)
  &::before
    content: ''
    // background: url('/static/assets/wave.svg') repeat-x 0 bottom / 50% auto
    width: 200%
    height: 100%
    top: 0
    left: 0
    z-index: -1
    position: absolute
    display: block

  &__content
    flex-grow: 1
    flex-shrink: 1
    position: relative
    display: flex
    flex-direction: column

  &__logout
    font-size: 9px
    font-weight: bold
    color: $brand
    text-transform: uppercase
    letter-spacing: .8em
    display: flex
    align-items: center
    &::before
      content: ''
      background: url('/static/assets/logout.svg') no-repeat center center / contain
      width: 16px
      height: 16px
      top: -2px
      flex-grow: 0
      flex-shrink: 0
      margin-right: 10px
      position: relative
      display: block
</style>
