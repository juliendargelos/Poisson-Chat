export default {
  all: [],
  chars: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

  fingerprint (user) {
    var self = this

    return user.username.toLowerCase().split('').reduce(function (sum, char) {
      return sum + self.chars.indexOf(char)
    }, 0)
  },

  for (user) {
    return this.all[this.fingerprint(user) % this.all.length]
  },

  load () {
    var self = this

    this.all = (new Array(12)).fill(null, 0, 12).map(function (a, n) {
      return self.base64(n, function (url) {
        self.all[n] = url
      })
    })
  },

  url (n) {
    return '/static/assets/fishes/fish-' + (n + 1) + '.svg'
  },

  base64 (n, callback) {
    var url = this.url(n)
    var xhr = new window.XMLHttpRequest()

    xhr.onload = function () {
      var reader = new window.FileReader()
      reader.onloadend = function () {
        callback(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }

    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()

    return url
  }
}
