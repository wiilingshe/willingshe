<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <willing></willing>
    <ul>
      <li v-for="article in articles">
        {{article.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import willing from './willing.vue'
export default {
  name: 'hello',
  components: {willing},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      articles: ''
    }
  },
  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {headers: {}, emulateJSON: true}).then(function (response) {
      this.articles = response.data.subjects
      console.log(response.data)
    }, function (response) {
      console.log(response)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
