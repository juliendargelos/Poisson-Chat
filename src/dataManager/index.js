import io from 'socket.io-client'

export default {
  install (Vue, options) {
    const socket = io(options.api)

    Vue.prototype.$store = new Vue({
      data: {
        user: null,
        users: ['yo', 'yoyo', 'yoyoyo'],
        messages: []
      }
    })

    var parseMessage = function (message) {
      var m = {
        body: '',
        author: {
          username: 'Anonymous',
          avatarUrl: ''
        },
        createdAt: Date.now()
      }

      if (typeof message === 'string') m.body = message
      else if (typeof message === 'object' && message !== null) {
        if (typeof message.body === 'string') m.body = message.body
        if (typeof message.content === 'string') m.body = message.content

        if (message.createdAt instanceof Date) m.createdAt = message.createdAt.getTime()
        if (message.date instanceof Date) m.createdAt = message.date.getTime()
        if (typeof message.createdAt === 'number') m.createdAt = message.createdAt
        if (typeof message.date === 'number') m.createdAt = message.date

        if (typeof message.author === 'object' && message.author !== null) m.author = message.author
        else if (typeof message.author === 'string') m.author = {username: message.author, avatarUrl: ''}
      }

      return m
    }

    socket.on('new message', function (message) {
      console.log(message)
      message = parseMessage(message)
      Vue.prototype.$store.messages.push(message)
      console.log(message)
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
