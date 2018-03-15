<template>
  <transition name="move">
    <div class="goodsDscrible">
      <div class="close" @click="myclose"><i class="icon-close"></i></div>
      <img :src="myFoods.image" alt="" class="banner">
      <div class="content-price">
        <p class="title">{{myFoods.name}}</p>
        <p class="sell"><span>月售{{myFoods.sellCount}}</span><span class="myrating">好评率{{myFoods.rating}}%</span></p>
        <div class="pay">
          <span class="pay-price">
            <span class="pay-red"><span>￥</span>{{myFoods.price}}</span>
          </span>
          <span class="pay-btn" @click="add" v-if="btnShow">加入购物车</span>
          <div class="car_btn" v-if="car">
            <cartBtn :foods="myFoods"></cartBtn>
          </div>
        </div>
      </div>
      <div class="content-text" v-if="myFoods.info">
        <p class="text-title">商品介绍</p>
        <p class="mytext">{{myFoods.info}}</p>
      </div>
      <div class="content-rating">
        <p class="text-title">商品评价</p>
        <div class="rating-count">
          <div class="wapper-blue wapper-box" @click="allList">全部 <span>{{myFoods.ratings.length}}</span></div>
          <div class="wapper-grey wapper-box" @click="goodList">推荐 <span>{{good}}</span></div>
          <div class="wapper-red wapper-box" @click="badList">吐槽 <span>{{bad}}</span></div>
        </div>
        <div class="look-have" @click="haveText">
          <i class="icon-check_circle" :class="{'blue':myBlue!=0}"></i><span>只看有内容的评价</span>
        </div>
      </div>
      <div class="ratings-list" v-for="item in ratingsList">
        <div class="ratings-left">
          <p class="ratings-time">{{item.rateTime}}</p>
          <p class="ratings-speak" v-if="item.text">{{item.text}}</p>
        </div>
        <div class="ratings-right">
          <p class="user">{{item.username}} <img :src='item.avatar' alt=""></p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import cartBtn from '../../components/cartBtn/cartBtn.vue'
  export default{
      props:["myFoods"],
      components:{
        cartBtn:cartBtn
      },
      data(){
          return{
            flag:false,
            num:0,
            myBlue:0,
            btnShow:true,
            car:false
          }
      },
      computed:{
        good(){
            let great = 0
            this.myFoods.ratings.forEach((good)=>{
                if(good.rateType==0){
                  great+=1
                }
            })
          return great
        },
        bad(){
          let shit = 0
          this.myFoods.ratings.forEach((good)=>{
            if(good.rateType==1){
              shit+=1
            }
          })
          return shit
        },
        ratingsList(){
            if(this.num==0){
                return this.myFoods.ratings
            }else if(this.num==1){
              var data=[];
              this.myFoods.ratings.forEach((good)=>{
                if(good.rateType==0){
                  data.push(good)
                }
              })
              return data
            }else if(this.num==2){
              var data=[];
              this.myFoods.ratings.forEach((good)=>{
                if(good.rateType==1){
                  data.push(good)
                }
              })
              return data
            }else if(this.num=3){
              var data=[];
              this.myFoods.ratings.forEach((good)=>{
                if(good.text!=""){
                  data.push(good)
                }
              })
              return data
            }
        }
      },
      methods:{
        add(){
          if(!this.myFoods.count){
            Vue.set(this.myFoods,'count',1)
          }else{
            this.myFoods.count++
          }
          this.btnShow=false;
          this.car=true;
        },
        myclose(){
            this.$emit('close',false)
        },
        allList(){
          this.num=0;
          this.myBlue=0;
        },
        goodList(){
          this.num=1;
          this.myBlue=0;
        },
        badList(){
          this.num=2;
          this.myBlue=0;
        },
        haveText(){
            this.num=3;
            this.myBlue=1;
        }
      },
      mounted(){
          console.log(this.myFoods)
      }
  }
</script>

<style scoped>
  ::-webkit-scrollbar
  {
    width: 1px;
    height: 1px;
    background-color: #F5F5F5;
  }
  .goodsDscrible{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 48px;
    left: 0;
    z-index: 5;
    background: #f3f5f7;
    font-size: 0;
    overflow-y: scroll;
    transition: all 0.5s linear;
  }
  .move-enter-active,.move-leave-active{
  transform: translate3D(0,0,0);
  }
  .move-enter,.move-leave-to{
    transform: translate3D(100%,0,0);
  }
  .close{
    position: absolute;
    top: 12px;
    left: 12px;
    width: 24px;
    height: 24px;
    font-size: 24px;
    border-radius: 50%;
    background: rgba(0,0,0,0.7);
    text-align: center;
    line-height: 24px;
    color: white;
  }
  .banner{
    width: 100%;
  }
  .content-price{
    background: white;
    overflow: hidden;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .title{
    font-size: 14px;
    padding-left: 18px;
    margin-top: 18px;
    font-weight: 700;
    line-height: 14px;
    color: rgb(7,17,27);
  }
  .sell{
    margin-top: 8px;
    font-size: 10px;
    color: rgb(147,153,159);
    padding-left: 18px;
  }
  .myrating{
    margin-left: 12px;
  }
  .pay{
    margin: 18px 0;
    padding: 0 18px;
    height: 24px;
  }
  .pay-price{
    float: left;
  }
  .pay-red{
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20);
    line-height: 24px;
  }
  .pay-red span{
    font-size: 10px;
    font-weight: 200;
  }
  .pay-btn{
    float: right;
    display: inline-block;
    width: 74px;
    height: 24px;
    background: rgb(0,160,220);
    border-radius: 12px;
    padding: 6px 0 ;
    box-sizing: border-box;
    text-align: center;
    line-height: 12px;
    font-size: 10px;
    color: white;
  }
  .car_btn{
    float: right;
    display: inline-block;
  }
  .content-text{
    margin-top: 16px;
    padding: 18px;
    box-sizing: border-box;
    background: white;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .text-title{
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: rgb(7,17,27);
    margin-bottom: 6px;
  }
  .mytext{
    padding-left: 8px;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(77,85,93);
  }
  .content-rating{
    margin-top: 16px;
    padding: 18px 18px 0 18px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    border-top: 1px solid rgba(7,17,27,0.1);
    background: white;
  }
  .rating-count{
    padding:12px 0 18px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .wapper-box{
    display: inline-block;
    padding: 8px 12px;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: 12px;
    line-height: 16px;
  }
  .wapper-box span{
    font-size: 8px;
  }
  .wapper-blue{
    background: rgb(0,160,220);
    color: white;
  }
  .wapper-grey{
    background: rgba(0,160,220,0.2);
    color: rgb(77,85,93);
    margin: 0 8px;
  }
  .wapper-red{
    background: rgba(77,85,93,0.2);
    color: rgb(77,85,93);
  }
  .look-have{
    padding: 12px 0;
    box-sizing: border-box;
    color: rgb(147,153,159);
    line-height: 24px;
  }

  .icon-check_circle{
    font-size: 24px;
  }
  .look-have span{
    margin-left: 4px;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
  }
  .ratings-list{
    padding: 16px 18px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background: white;
  }
  .ratings-left{
    display: inline-block;
  }
  .ratings-time{
    font-size: 10px;
    line-height: 12px;
    color: rgb(147,153,159);
  }
  .ratings-speak{
    font-size: 12px;
    line-height: 16px;
    color: rgb(7,17,27);
    margin-top: 6px;
  }
  .ratings-right{
    display: inline-block;
    float: right;
  }
  .user{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 12px;
  }
  .user img{
    width: 12px;
    height: 12px;
    margin-left: 6px;
  }
  .blue{
    color: rgb(0,160,220);
  }
</style>
