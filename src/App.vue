<template>
<div id="app">
  <img src="https://escaperoomblackbook.com/wp-content/uploads/2016/06/quest-n-quest-escape-room-in-tlv-logo-transparent.png">
  <h1>{{ msg }}</h1>
  <input type="text" name="palindrom" value="palindrom" v-model="palindrom">
  <button type="button" name="check" v-on:click="checkPalindrome()">Check</button>
  <notification v-bind:notifications="notifications"></notification>
</div>
</template>

<script>
import Notification from './assets/js/components/notifications.vue';
export default {
  name: 'app',
  data() {
    return {
      palindrom:'',
      notifications:[],
      msg: 'Palindrome or not'
    }
  },
  methods: {
    checkPalindrome: function() {
      var textop = this.palindrom;

      this.$http.get('http://localhost:3000/api/palindromeornot?text=' + textop).then((response) => {
        this.notifications.push({
          type: 'success',
          message: 'The text is a palindrome!'
        });
      }, (response) => {
        this.notifications.push({
          type: 'error',
          message: 'Oh no! The text is not a palindrome...'
        });
      });
    }
  },
  components: {
    'notification': Notification
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  height: 200px;
}

h1,
h2 {
  font-weight: normal;
}
</style>
