<template>
  <form class="search-form" @submit.prevent>
    <input class="search-form__input" type="text" v-model="input" placeholder="Search">
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      input: ''
    }
  },
  watch: {
    input: function (value, old) {
      if (value !== old) {
        console.log('hey')
      } else {
        console.log('ho')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/application'

.search-form
  display: flex
  align-items: center

  &::before
    content: ''
    background: url('/static/assets/search.svg') no-repeat center center / contain
    width: 16px
    height: 16px
    margin-right: 10px
    display: block
    flex-grow: 0
    flex-shrink: 0

  &__input
    background: transparent
    margin: 0
    appearance: none
    flex-grow: 1
    flex-shrink: 1
    border: none
    outline: none
    font-family: $sans-serif
    font-size: 16px
    color: $brand
    &::placeholder
      color: $light-grey
      font-weight: bold
</style>
