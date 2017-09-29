import io from 'socket.io-client'
// import parser from './parser'

export default {
  install (Vue, options) {
    const socket = io(options.api)

    Vue.prototype.$store = new Vue({
      data: {
        user: null,
        users: [],
        messages: [],
        avatars: []
      }
    })

    socket.on('getUser', function (clients) {
      console.log(clients)
    })

    socket.on('new message', function (message) {
      // TODO: rework
      // if (message.author.id !== Vue.prototype.$store.user.id) {
      //   Vue.prototype.$store.messages.push(message)
      // }

      // TODO: remove
      if (message.body.author.id !== Vue.prototype.$store.user.id) {
        Vue.prototype.$store.messages.push(message.body)
      }
    })

    socket.on('user connected', function (user) {
      window.gna = Vue.prototype.$store
      Vue.prototype.$store.user = user
    })

    Vue.mixin({
      methods: {
        send: function (message) {
          this.$store.messages.push(message)
          socket.emit('new message', message)
        },

        connect: function (user, avatar) {
          socket.emit('user connected', {
            username: user,
            avatarUrl: avatar
          })
        }
      }
    })
  }
}
