import io from 'socket.io-client'
import parser from './parser'

export default {
  install (Vue, options) {
    const socket = io(options.api)

    Vue.prototype.$store = new Vue({
      data: {
        user: null,
        users: [],
        messages: [],
        avatars: [],
        typing: []
      }
    })

    socket.on('getUsers', function (clients) {
      Vue.prototype.$store.users = clients
    })

    socket.on('new message', function (message) {
      message = parser.message(message)
      if (!Vue.prototype.$store.user || message.author.id !== Vue.prototype.$store.user.id) {
        Vue.prototype.$store.messages.push(message)
      }
    })

    socket.on('user connected', function (user) {
      window.gna = Vue.prototype.$store
      Vue.prototype.$store.user = user
    })

    socket.on('typing', function (user) {
      if (Vue.prototype.$store.typing.filter(function (u) { u.id === user.id }).length === 0 && user.id !== Vue.prototype.$store.user.id) {
        console.log('TYPING')
        Vue.prototype.$store.typing.push(user)
      }
    })

    socket.on('stop typing', function (user) {
      Vue.prototype.$store.typing = Vue.prototype.$store.typing.filter(function (u) { u.id !== user.id })
    })

    Vue.mixin({
      methods: {
        send: function (message) {
          this.$store.messages.push(message)
          socket.emit('new message', message.body)
        },

        connect: function (user) {
          socket.emit('user connected', user)
        },

        typing: function () {
          socket.emit('typing', this.$store.user)
        },

        stopTyping: function () {
          socket.emit('stop typing', this.$store.user)
        }
      }
    })
  }
}
