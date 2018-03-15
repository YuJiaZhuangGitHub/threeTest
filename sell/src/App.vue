<template>
  <div id="app">
    <div class="header">
      <myheader :seller="seller"></myheader>
    </div>
    <div class="nav">
      <ul>
        <li>
          <router-link to="/goods">商品</router-link>
        </li>
        <li>
          <router-link to="/seller">商家</router-link>
        </li>
        <li>
          <router-link to="/rotings">评论</router-link>
        </li>
      </ul>
    </div>
    <keep-alive>
        <router-view  :seller="seller" />
    </keep-alive>
  </div>
</template>

<script>
  import myheader from './components/header/myheader.vue'
  export default {
    name: 'app',
    components:{
        myheader:myheader
    },
    data:function(){
        return{
            seller:{}
        }
    },
    created:function(){
      this.$router.push({path:'/goods'});
      this.$http.get('data.json').then(function(response){
        this.seller=response.data.seller;
      },function(error){
          console.log('报错')
      })
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .nav{
    height: 40px;
    font-size: 14px;
  }
  .nav ul{
    display: flex;
    flex-direction: row;
  }
  .nav ul li{
    flex: 1;
    list-style: none;
    line-height: 40px;
    text-align: center;
  }
  .nav ul li a{
    text-decoration: none;
    display: block;
    color: rgb(77,85,93);
  }
  .router-link-exact-active, .router-link-active{
    color: rgb(240,20,20)!important;
  }
</style>
