<template>
    <div class="form-group">
        <label class="col-sm-2 control-label">用户名</label>
        <div class="col-sm-10">
            <input type="text" v-uname="username" v-model="username" v-on:change="userNameChange" class="form-control" :placeholder="username">
        </div>
    </div>
</template>

<script>
export default{
  props: ['placeholder'],
  data: function () {
    return {
      username: ''
    }
  },
  methods: {
    userNameChange () {
      this.$store.state.user_name = this.username
    }
  }
}
</script>
