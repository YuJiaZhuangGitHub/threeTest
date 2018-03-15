<template>
  <div>
    <div class="shopCar">
      <div class="shopCar-left">
        <div class="car">
          <div class="car-main" :class="{'blue':totleCount>0}" @click="listShow">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="food-count" v-if="totleCount>0">{{totleCount}}</div>
        </div>
        <div class="car-price" :class="{'white':totlePrice>0}">
          ￥{{totlePrice}}
        </div>
        <div class="car-discrible">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="shopCar-right" :class="{'pay':totlePrice>=minPrice}">
        {{ask}}
      </div>
      <transition name="fold">
        <div class="shopCar-list" v-if="showList" >
          <div class="list-header">
            <span class="name">购物车</span>
            <span class="delete" @click="deleteAll">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li v-for="flod in selectFood">
                <span class="flod-name">{{flod.name}}</span>
                <div class="flod-describle">
                  <span class="money" v-if="flod.count">￥{{flod.price*flod.count}}</span>
                  <div class="flod-btn">
                    <cartBtn :foods="flod"></cartBtn>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fode">
      <div class="full" v-if="showList"></div>
    </transition>
  </div>
</template>

<script>
  import cartBtn from '../../components/cartBtn/cartBtn.vue'
  export default{
    props:["deliveryPrice","minPrice","selectFood"],
    components:{
      cartBtn:cartBtn
    },
    data(){
        return{
          flod:true
        }
    },
    created(){
//        console.log(this.selectFood)
    },
    computed:{
      totleCount:function(){
        let count=0
        this.selectFood.forEach(function(food){
          count+=food.count
        })
        return count
      },
      totlePrice:function(){
//        console.log(this.selectFood)
        let price =0
        this.selectFood.forEach(function(food){
          price+=food.price*food.count
        })
        return price
      },
      ask:function(){
        if(this.totlePrice==0){
          return '￥'+this.minPrice+'元起送'
        }else if(this.totlePrice<this.minPrice){
          let cum=parseInt(this.minPrice)-parseInt(this.totlePrice)
          return '还差￥'+cum+'元起送'
        }else{
          return '去结算'
        }
      },
      showList:function(){
        if(!this.totleCount){
            this.flod=true;
            return false
        }
        let show = !this.flod;
        return show
      }
    },
    methods:{
      listShow:function(){
          if(!this.totleCount){
              return
          }
          this.flod=!this.flod
      },
      deleteAll:function(){
        this.selectFood.forEach(function(food){
          food.count=0
        })
      }
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
  .shopCar{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 48px;
    color: rgba(255,255,255,0.4);
    width: 100%;
    display: flex;
    font-size: 0;
    z-index: 20;
  }
  .shopCar-left{
    flex: 1;
    background: #141d27;
  }
  .car{
    position: relative;
    display: inline-block;
    width: 56px;
    height: 56px;
    padding: 6px;
    box-sizing: border-box;
    top: -10px;
    left: 12px;
    border-radius: 50%;
    background: #141d27;
    margin-right: 12px;
  }
  .car-main{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgb(43,52,60);
    font-size: 24px;
    text-align: center;
    line-height: 48px;
  }
  .blue{
    background: rgb(0,160,220);
    color: white;
  }
  .food-count{
    position: absolute;
    width: 24px;
    height: 18px;
    border-radius: 6px;
    background: red;
    color: white;
    font-weight: 700;
    font-size: 9px;
    line-height: 18px;
    top: 0;
    right: 0;
    text-align: center;
  }
  .car-price{
    display: inline-block;
    height: 24px;
    vertical-align: top;
    padding: 0 12px;
    box-sizing: border-box;
    margin-top: 12px;
    font-size: 12px;
    line-height:24px ;
    color: rgba(255,255,255,0.4);
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .white{
    color: white;
  }
  .car-discrible{
    display: inline-block;
    font-size: 12px;
    padding-left: 12px;
    vertical-align: top;
    color: rgba(255,255,255,0.4);
    line-height: 48px;
  }
  .shopCar-right{
    flex: 0 0 105px;
    width: 105px;
    text-align: center;
    line-height: 48px;
    font-size: 12px;
    background: rgb(43,51,59);
  }
  .pay{
    background: rgb(0,125,47);
    color: white;
  }
  /*购物车详情*/
  .shopCar-list{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    max-height: 305px;
    overflow: hidden;
    transition: all 0.5s linear;
    transform: translate3D(0,-100%,0);
  }
  /*.fold-enter-active,.fold-leave-active{*/
    /*transform: translate3D(0,-100%,0);*/
  /*}*/
  .fold-enter,.fold-leave-to{
    transform: translate3D(0,0,0);
  }
  .list-header{
    height: 40px;
    background: #f3f5f7;
    padding: 0 18px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .name{
    float: left;
    font-size: 14px;
    color: rgb(7,17,27);
    font-weight: 200;
  }
  .delete{
    float: right;
    font-size: 12px;
    color: rgb(0,160,220);
  }
  .list-content{
    max-height: 264px;
    overflow-y: scroll;
  }
  .list-content li{
    height: 48px;
    background: white;
    padding: 12px 18px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .flod-name{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .flod-describle{
    float: right;
  }
  .money{
    font-size: 14px;
    color: rgb(240,20,20);
    font-weight: 700;
    line-height: 24px;
  }
  .flod-btn{
    float: right;
    line-height: 24px;
    margin-left: 12px;
  }
  .full{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(7,17,27,0.6);
    filter: blur(10px);
    transition: all 0.5s linear;
  }
  .fode-enter-active,.fode-leave-active{
    background: rgba(7,17,27,0.6);
  }
  .fode-enter,.fode-leave-to{
    background: rgba(7,17,27,0.3);
  }
</style>
