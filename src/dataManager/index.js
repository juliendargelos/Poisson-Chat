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

    socket.on('user join', function (user) {
      if (Vue.prototype.$store.users.filter(function (u) { u.id === user.id }).length === 0 && (!Vue.prototype.$store.user || user.id !== Vue.prototype.$store.user.id)) {
        Vue.prototype.$store.users.push(user)
      }
    })

    socket.on('user disconnected', function (user) {
      Vue.prototype.$store.users = Vue.prototype.$store.users.filter(function (u) { u.id !== user.id })
    })

    socket.on('new message', function (message) {
      message = parser.message(message)
      if (!Vue.prototype.$store.user || message.author.id !== Vue.prototype.$store.user.id) {
        Vue.prototype.$store.messages.push(message)
      }
    })

    socket.on('wizz', function (user) {
      Vue.prototype.$store.messages.push({
        wizz: true,
        body: '💦',
        author: user,
        createdAt: Date.now()
      })
    })

    socket.on('user connected', function (user) {
      window.gna = Vue.prototype.$store
      Vue.prototype.$store.user = user
    })

    socket.on('typing', function (user) {
      if (Vue.prototype.$store.typing.filter(function (u) { return u.id === user.id }).length === 0 && (!Vue.prototype.$store.user || user.id !== Vue.prototype.$store.user.id)) {
        Vue.prototype.$store.typing.push(user)
      }
    })

    socket.on('stop typing', function (user) {
      Vue.prototype.$store.typing = Vue.prototype.$store.typing.filter(function (u) { return u.id !== user.id })
    })

    Vue.mixin({
      methods: {
        send: function (message) {
          this.$store.messages.push(message)
          if (message.wizz) socket.emit('wizz', message.user)
          else socket.emit('new message', message.body)
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
