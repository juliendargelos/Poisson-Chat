export default {
  message (message) {
    if (typeof message !== 'object' || message === null) message = {}

    return Object.assign({
      body: '',
      author: this.user(),
      createdAt: Date.now()
    }, Object.assign(message, {author: this.user(message.author)}))
  },

  user (user) {
    if (typeof user !== 'object' || user === null) user = {}

    return Object.assign({
      id: null,
      username: 'Anonymous',
      avatarUrl: ''
    }, user)
  }
}
