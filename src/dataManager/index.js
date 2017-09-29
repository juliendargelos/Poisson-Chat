import io from 'socket.io-client'
import parser from './parser'

export default {
  install (Vue, options) {
    const socket = io(options.api)

    const store = new Vue({
      data: {
        user: null,
        users: [],
        messages: [],
        avatars: [],
        typing: []
      }
    })

    Vue.prototype.$store = store

    socket.on('getUsers', function (clients) {
      store.users = clients
    })

    socket.on('user joined', function (users) {
      store.users = users.clients

      store.messages.push({
        alert: true,
        body: users.new.username + ' joined Poisson Chat',
        author: users.new,
        createdAt: Date.now()
      })
    })

    socket.on('user disconnected', function (user) {
      store.users = store.users.filter(function (u) { return u.id !== user.id })

      store.messages.push({
        alert: true,
        danger: true,
        body: user.username + ' left Poisson Chat',
        author: user,
        createdAt: Date.now()
      })
    })

    socket.on('new message', function (message) {
      message = parser.message(message)
      if (!store.user || message.author.id !== store.user.id) {
        store.messages.push(message)
      }
    })

    socket.on('wizz', function (user) {
      store.messages.push({
        alert: true,
        wizz: true,
        body: '💦',
        author: user,
        createdAt: Date.now()
      })
    })

    socket.on('user connected', function (user) {
      window.gna = store
      store.user = user
    })

    socket.on('typing', function (user) {
      if (store.typing.filter(function (u) { return u.id === user.id }).length === 0 && (!store.user || user.id !== store.user.id)) {
        store.typing.push(user)
      }
    })

    socket.on('stop typing', function (user) {
      store.typing = store.typing.filter(function (u) { return u.id !== user.id })
    })

    window.addEventListener('beforeunload', function () {
      socket.emit('user disconnected', store.user)
    })

    Vue.mixin({
      methods: {
        send: function (message) {
          this.$store.messages.push(message)
          if (message.wizz) socket.emit('wizz')
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
