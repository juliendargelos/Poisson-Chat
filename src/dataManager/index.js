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

    var parseMessages = function (message) {
      if (Array.isArray(message)) return parseMessages(message[0])
      else {
        var m = {
          content: '',
          author: 'Anonymous',
          date: new Date()
        }

        if (typeof message === 'string') m.content = message
        else if (typeof message === 'object' && message !== null) {
          if (typeof message.body === 'string') m.content = message.body
          if (typeof message.content === 'string') m.content = message.content

          if (message.createdAt instanceof Date) m.date = message.createdAt
          if (message.date instanceof Date) m.date = message.date

          if (typeof message.author === 'object' && message.author !== null) m.author = message.author
        }

        return [m]
      }
    }

    socket.on('new message', function (message) {
      Vue.prototype.$store.messages.push(message)
      console.log(Vue.prototype.$store.messages)
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
