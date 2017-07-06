<template>
  <div id="class">
    <router-link to="/a">a</router-link>
    <router-link to="/b">b</router-link>
    <button v-on:click="onclick">点击我试试</button>
    <username></username>
    <usersubmit></usersubmit>
    <div>{{info}}</div>
    <willing></willing>
    <router-view></router-view>
  </div>
</template>

<script>
import willing from './components/willing.vue'
import username from './components/user-name'
import usersubmit from './components/user-submit'
export default {
  components: {willing, username, usersubmit},
  name: 'app',
  data () {
    return {
      info: 'willing'
    }
  },
  methods: {
    onclick: function () {
      alert('success')
    }
  }
}
</script>

<style>
#class {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
