<template>
  <transition name="move">
    <div class="myseller">
      <div class="seller-name">
        <div class="name-content">
          <div class="name-left">
            <span class="name-title">{{seller.name}}</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="name-right">
            <span class="icon" @click="getI" :class="{'red':flag!=0}"><i class="icon-favorite"></i></span>
            <span class="favorite">{{text}}</span>
          </div>
        </div>
        <div class="seller-price">
        <span class="seller-box">
          <span class="minPrice-title">起送价</span>
          <span class="minPrice">{{seller.minPrice}}<span>元</span></span>
        </span>
          <span class="seller-box">
          <span class="minPrice-title">商家配送</span>
          <span class="minPrice">{{seller.deliveryPrice}}<span>元</span></span>
        </span>
          <span class="seller-box">
          <span class="minPrice-title">平均配送时间</span>
          <span class="minPrice">{{seller.deliveryTime}}<span>分钟</span></span>
        </span>
        </div>
      </div>
      <div class="seller-ask">
        <p class="ask-title">公告与活动</p>
        <p class="ask-descible">{{seller.bulletin}}</p>
        <div class="activity" v-for="item in seller.supports">
          {{item.description}}
        </div>
      </div>
      <div class="seller-location">
        <p class="ask-title">商家实景</p>
        <div class="seller-picture">
          <img :src="value" alt="" v-for="value in seller.pics">
        </div>
      </div>
      <div class="seller-information">
        <p class="ask-title" style="margin-bottom: 12px">商家信息</p>
        <div class="information-list" v-for="list in seller.infos">
          {{list}}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default{
    props:["seller"],
    data(){
      return{
        flag:false
      }
    },
    computed:{
      text(){
          if(this.flag!=0){
              return '已收藏'
          }else{
              return '收藏'
          }
      }
    },
    methods:{
      getI(){
          this.flag=!this.flag
        console.log(this.flag)
      }
    }
  }
</script>

<style scoped>

  .myseller{
    background: rgb(243,245,247);
    width: 100%;
    transition: all 0.5s linear;
  }
  .move-enter-active,.move-leave-active{
    transform: translate3D(0,0,0);
  }
  .move-enter,.move-leave-to{
    transform: translate3D(100%,0,0);
  }
  .seller-name{
    padding: 18px;
    box-sizing: border-box;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 0;
    background: white;
  }
  .name-content{
    padding-bottom: 18px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .name-left{
    display: inline-block;
  }
  .name-title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    display: block;
    margin-bottom: 8px;
  }
  .sell-count{
    font-size: 10px;
    color: rgb(77,85,93);
    line-height: 18px;
  }
  .name-right{
    float: right;
  }
  .icon{
    display: block;
    font-size: 24px;
    color:rgba(7,17,27,0.5);
    line-height: 24px;
    text-align: center;
    margin-bottom: 4px;
  }
  .red{
    color:rgb(240,20,20)
  }
  .favorite{
    font-size: 10px;
    color: rgb(77,85,93);
    line-height: 10px;
  }
  .seller-price{
    padding: 18px 18px 0 18px;
    box-sizing: border-box;
    display: flex;
  }
  .seller-box{
    flex: 1;
    display: inline-block;
    text-align: center;
  }
  .seller-box:nth-child(2){
    border-left: 1px solid rgba(7,17,27,0.1);
    border-right: 1px solid rgba(7,17,27,0.1);
  }
  .minPrice-title{
    display: block;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 4px;
  }
  .minPrice{
    font-size: 24px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(7,17,27);
  }
  .minPrice span{
    font-size: 10px;
  }
  .seller-ask{
    padding: 18px;
    box-sizing: border-box;
    margin: 16px 0;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background: white;
  }
  .ask-title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .ask-descible{
    padding: 0 12px;
    font-size:12px ;
    color: rgb(240,20,20);
    font-weight: 200;
    line-height: 24px;
  }
  .activity{
    padding: 16px 12px;
    box-sizing: border-box;
    border-top: 1px solid rgba(7,17,27,0.1);
    font-size: 12px;
    line-height: 16px;
    font-weight: 200;
    color: rgb(7,17,27);
  }
  .seller-location{
    padding: 18px;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background: white;
    margin-bottom: 16px;
  }
  .seller-picture{
    margin-top: 4px;
  }
  .seller-picture img{
    width: 160px;
    height: 120px;
  }
  @media screen and (min-width:320px) and (max-width:375px){
    .seller-picture img{
      width: 140px;
    }
  }
  .seller-picture img:nth-child(odd){

  }
  .seller-picture img:nth-child(even){
    float: right;
  }
  .seller-information{
    padding: 18px;
    box-sizing: border-box;
    border-top: 1px solid rgba(7,17,27,0.1);
    background: white;
  }
  .information-list{
    padding: 16px 12px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 16px;
    border-top: 1px solid rgba(7,17,27,0.1);
  }
</style>
