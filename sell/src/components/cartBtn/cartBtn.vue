<template>
  <div clas="cartBtn">
    <transition name="move">
      <div class="car-reduce " v-if="foods.count>0" @click.stop.prevent="reduce">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="car-count" v-if="foods.count>0">{{foods.count}}</div>
    <div class="car-add icon-add_circle" @click.stop.prevent="add"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default{
      props:["foods"],
      methods:{
        add:function(){
          if(!this.foods.count){
            Vue.set(this.foods,'count',1)
          }else{
              this.foods.count++
          }
        },
        reduce:function(){
          this.foods.count--;
        }
      },
      mounted(){

      }
  }
</script>

<style scoped>
  .car-reduce,.car-count,.car-add{
    display: inline-block;
  }
  .car-reduce,.car-add{
    font-size: 24px;
    line-height: 24px;
    color: rgb(0,160,220);
    transition: all 0.4s linear;
  }
  .move-enter-active,.move-leave-active{
    opacity: 1;
    transform: translate3D(0,0,0) rotate(0);
  }
  .move-enter,.move-leave-to{
    opacity: 0;
    transform: translate3D(24px,0,0) rotate(180deg);
  }
  .car-count{
    width: 24px;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    vertical-align: top;
    color: rgb(147,153,159);
  }
</style>
