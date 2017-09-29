<template>
  <span class="date">{{ pretty }}</span>
</template>

<script>
export default {
  props: ['date'],

  computed: {
    object: function () {
      return new Date(this.date)
    },

    pretty: function () {
      if (typeof this.date === 'number') {
        var date = ''

        if (this.today) date = 'Today '
        else if (this.yesterday) date = 'Yesterday '
        else {
          date = this.day + ' ' + this.monthName + ' '
          if (!this.thisYear) date += this.year + ' '
        }

        return date + this.time
      } else {
        return ''
      }
    },

    now: function () {
      return new Date()
    },

    day: function () {
      return this.object.getDate()
    },

    month: function () {
      return this.object.getMonth()
    },

    year: function () {
      return this.object.getFullYear()
    },

    monthName: function () {
      return ([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ])[this.month]
    },

    time: function () {
      var minutes = this.object.getMinutes()
      return this.object.getHours() + ':' + (minutes < 10 ? '0' : '') + minutes
    },

    today: function () {
      return this.equalDay(this.now)
    },

    yesterday: function () {
      return this.equalDay(this.now, {day: -1})
    }
  },

  methods: {
    equalDay: function (date, offset) {
      offset = Object.assign({
        day: 0,
        month: 0,
        year: 0
      }, typeof offset !== 'object' || offset === null ? {} : offset)

      return date.getDate() + offset.day === this.day && date.getMonth() + offset.month === this.month && date.getFullYear() + offset.year === this.year
    }
  }
}
</script>
