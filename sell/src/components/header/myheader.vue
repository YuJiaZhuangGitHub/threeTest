<template>
  <div class="header">
    <div class="wapper">
      <span class="wapper-img">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </span>
      <span class="wapper-text">
        <span class="wapper-title">{{seller.name}}</span>
        <span class="wapper-description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        <span class="wapper-supports" v-if="seller.supports">{{seller.supports[0].description}}</span>
      </span>
      <span class="blur">
        <img :src="seller.avatar" alt="">
      </span>
      <span class="alertBtn" @click="alertShow">5个 <span class="letgo">></span></span>
      <span class="notice" @click="alertShow">{{seller.bulletin}}</span>
    </div>
    <transition name="scale">
      <div class="alertBox" v-if="status">
        <div class="alertBox-wapper clearfix">
          <div class="alertBox-main">
            <p class="alertBox-title">{{seller.name}}</p>
            <div class="star">
              <star  :score="parseInt(seller.score)" :badScore="badScore"></star>
            </div>
            <div class="information">
              <span class="line"></span>
              <span class="information-text">优惠信息</span>
              <span class="line"></span>
            </div>
            <div class="aritical">
              <span class="aritical-text" v-for="item in seller.supports">{{item.description}}</span>
            </div>
            <div class="information">
              <span class="line"></span>
              <span class="information-text">商家公告</span>
              <span class="line"></span>
            </div>
            <div class="discrible">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="alertBox-close" @click="alertHidden">×</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from '../../components/star/star.vue'
  export default{
    props:["seller"],
    components:{
      star:star
    },
    data(){
        return{
          status:false,
          badScore:0
        }
    },
    created(){

    },
    methods:{
      alertShow(){
          this.status=true
      },
      alertHidden(){
        this.status=false
      }
    },
    mounted(){
      this.badScore=5-parseInt(this.seller.score)
    }
  }
</script>

<style scoped>
  .wapper{
    background: rgba(7,17,27,0.5);
    color: white;
    font-size: 0;
    padding: 24px 0 0 0;
    position: relative;
    overflow: hidden;
  }
  .blur{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .blur img{
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }
  .wapper-img{
    width: 64px;
    height: 64px;
    display: inline-block;
    border-radius: 2px;
    overflow: hidden;
    margin:0 16px 0 24px;
    /*margin: 24px 16px 18px 24px;*/
  }
  .wapper-text{
    vertical-align: top;
    display: inline-block;
    height: 64px;
  }
  .wapper-title,.wapper-description,.wapper-supports{
    display: block;
  }
  .wapper-title{
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    margin: 2px 0 8px 0;
  }
  .wapper-description{
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    margin-bottom: 10px;
  }
  .wapper-supports{
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
    margin-bottom: 2px;
  }
  .alertBtn{
    display: block;
    padding: 7px 8px;
    font-size: 10px;
    line-height: 12px;
    font-weight: 200;
    position: absolute;
    background: rgba(0,0,0,0.2);
    right: 12px;
    bottom: 36px;
    color: white;
    border-radius: 10px;
  }
  .letgo{
    margin-left: 2px;

  }
  .notice{
    display: block;
    height: 28px;
    margin-top: 18px;
    background: rgba(7,17,27,0.2);
    font-size: 10px;
    padding: 0 12px;
    line-height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .alertBox{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(7,17,27,0.8);
    overflow: auto;
    color: white;
    transition: all 0.3s linear;
  }
  .scale-enter-active,.scale-leave-active{
    transform: scaleX(1) scaleY(1);
  }
  .scale-enter,.scale-leave-to{
    transform: scaleX(0) scaleY(0);
  }
  .clearfix{
    display: inline-block;
  }
  .clearfix:after{
    display: block;
    clear: both;
    content:".";
    height: 0;
    line-height: 0;
    visibility: hidden;
  }
  .alertBox-wapper{
    min-height: 100%;
    width: 100%;
  }
  .alertBox-main{
    margin-top:64px ;
    padding:0 36px 64px 36px;
  }
  .alertBox-close{
    position: relative;
    margin: -64px auto 0 auto;
    font-size: 32px;
    text-align: center;
    line-height: 30px;
    clear: both;
    width: 30px;
    height: 30px;
    color: rgba(255,255,255,0.5);
  }
  .alertBox-title{
    font-size: 16px;
    text-align: center;
    margin-bottom: 16px;
  }
  .star{
    height: 24px;
    margin-bottom: 28px;
    text-align: center;
  }

  .information{
    margin-bottom: 24px;
    display: flex;
  }
  .information span{
    display: inline-block;
    font-size: 12px;
    vertical-align: top;
  }
  .information .line{
    /*width: 112px;*/
    height: 2px;
    flex: 2;
    margin-top: 5px;
    background: rgba(255,255,255,0.2);
    vertical-align: middle;
  }
  .information-text{
    margin: 0 10px;
    text-align: center;
    flex: 1;
  }
  .aritical{
    font-size: 12px;
    padding: 0 12px;
  }
  .aritical-text{
    display: block;
    line-height: 12px;
    margin-bottom: 6px;
    font-weight: 200;
  }
  .aritical-text:nth-child(5){
    margin-bottom: 22px;
  }
  .discrible{
    padding: 0 12px;
    font-size: 12px;
    line-height: 24px;
    font-weight: 200;
  }
</style>
