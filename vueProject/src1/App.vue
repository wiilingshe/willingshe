<template>
  <div id="class">
    <img src="./assets/logo.png">
    <router-link to="/a">a</router-link>
    <router-link to="/b">b</router-link>
    <button v-on:click="onclick">点击我试试</button>
    <div>{{info}}</div>
    <willing></willing>
    <router-view></router-view>
  </div>
</template>

<script>
import willing from './components/willing.vue'
export default {
  components: {willing},
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
