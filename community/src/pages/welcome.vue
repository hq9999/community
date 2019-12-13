<template>
<div>
    <h1>欢迎{{name}}</h1>
</div>
</template>
<script>
import api from '../util/api'
import qs from 'qs'
export default {
    data(){
        return{
            name:"",
        }
    },
    mounted () {
    this.name=localStorage.getItem("username")
  }
};
</script>
<style scoped>
h1{
    text-align: center;
    margin: 200px auto;
}
</style>