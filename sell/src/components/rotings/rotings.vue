<template>
  <div class="rotings">
    <div class="seller_rotings">
      <div class="rotings_left">
        <p class="score">{{seller.score}}</p>
        <p class="rotings_text">综合评分</p>
        <p class="discrible">高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="rotings_right">
        <div class="right_box">
          <span class="service">服务态度</span>
          <span class="servicePic">
            <star :score="parseInt(seller.serviceScore)" :badScore="badScore"></star>
          </span>
          <span class="serviceScore">{{seller.serviceScore}}</span>
        </div>
        <div class="right_box">
          <span class="service">食物评价</span>
          <span class="servicePic">
            <star :score="parseInt(seller.foodScore)" :badScore="badFood"></star>
          </span>
          <span class="serviceScore">{{seller.foodScore}}</span>
        </div>
        <div class="right_box">
          <span class="service">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <div class="allRotings_title">
      <div class="title_box">
        <div class="allList listBox" @click="allList">全部<span class="small_text">{{seller.ratingCount}}</span></div>
        <div class="goodList listBox" @click="goodList">满意<span class="small_text">{{good}}</span></div>
        <div class="badList listBox" @click="badList">不满意<span class="small_text">{{bad}}</span></div>
      </div>
      <div class="look-have" @click="hasText">
        <i class="icon-check_circle" :class="{'blue':myBlue!=0}"></i><span>只看有内容的评价</span>
      </div>
    </div>
    <div class="rotingsList">
      <div class="rotings-box" v-for="item in showList">
        <div class="rotings-box-left">
          <div class="imgBox">
            <img :src="item.avatar" alt="">
          </div>
        </div>
        <div class="rotings-box-right">
          <p class="userName">{{item.username}}</p>
          <p class="deliveryTime">{{item.deliveryTime}}分钟送达</p>
          <p class="user_text">{{item.text}}</p>
          <div class="recommend">
            <i class="icon-thumb_down" v-if="have(item.rateType)"></i>
            <i class="icon-thumb_up" v-if="has(item.rateType)"></i>
            <div class="recommend_box" v-for="value in item.recommend">{{value}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../../components/star/star.vue'
  export default{
    props:['seller'],
    components:{
      star:star
    },
    data(){
        return{
          ratings:[],
          good:0,
          bad:0,
          type:0,
          myBlue:0,
          badScore:0,
          badFood:0
        }
    },
    computed:{
      showList(){
        if(this.type==0){
          return this.ratings
        }else if(this.type==1){
          var data=[];
          this.ratings.forEach((rating)=>{
              if(rating.rateType==0){
                  data.push(rating)
              }
          })
          return data
        }else if(this.type==2){
          var data=[];
          this.ratings.forEach((rating)=>{
            if(rating.rateType==1){
              data.push(rating)
            }
          })
          return data
        }else if(this.type==3){
          var data=[];
          this.ratings.forEach((rating)=>{
            if(rating.text!=""){
              data.push(rating)
            }
          })
          return data
        }
      }
    },
    methods:{
      have(index){
          if(index==1){
              return true
          }else{
              return false
          }
      },
      has(index){
        if(index==0){
          return true
        }else{
          return false
        }
      },
      allList(){
        this.type=0;
        this.myBlue=0;
      },
      goodList(){
        this.type=1;
        this.myBlue=0;
      },
      badList(){
        this.type=2;
        this.myBlue=0;
      },
      hasText(){
        this.type=3;
        this.myBlue=1;
      }
    },
    mounted(){
      this.badFood = 5-parseInt(this.seller.foodScore);
      this.badScore = 5-parseInt(this.seller.serviceScore);
      this.$http.get('data.json').then(function(response){
        this.ratings=response.data.ratings;
        var goodData=[];
        var badDate=[];
        response.data.ratings.forEach((roting)=>{
            if(roting.rateType==0){
              goodData.push(roting)
            }else if(roting.rateType==1){
              badDate.push(roting)
            }
        });
        this.good=goodData.length;
        this.bad=badDate.length;
      },function(error){
        console.log('报错')
      })
    }
  }
</script>

<style scoped>
  .rotings{
    background: rgb(243,245,247);
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.2);
  }
  .seller_rotings{
    padding: 18px 0;
    background: white;
    display: flex;
    border-bottom: 1px solid rgba(7,17,27,0.2);
  }
  .rotings_left{
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7,17,27,0.1);
    text-align: center;
  }
  .score{
    font-size: 24px;
    color: rgb(255,153,0);
    line-height: 28px;
  }
  .rotings_text{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 12px;
    margin: 6px 0 8px 0;
  }
  .discrible{
    font-size: 10px;
    line-height: 10px;
    color: rgba(7,17,27,0.4);
    margin-bottom: 6px;
  }
  .rotings_right{
    flex: 1;
    padding: 0 24px;
    box-sizing: border-box;
  }
  @media screen  and (min-width:320px) and (max-width:370px){
    .rotings_right{
      padding: 0 6px;
    }
    .servicePic[data-v-64778e98]{
      margin: 0;
    }
    .servicePic img{
      width: 12px;
      height: 12px;
    }
  }
  .right_box span{
    display: inline-block;
    vertical-align: top;
  }
  .service{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
  }
  .servicePic{
    margin: 0 10px;
    /*width: 80px;*/
    font-size: 0;
  }
  .servicePic img{
    width: 18px;
    height: 18px;
  }
  .serviceScore{
    font-size: 12px;
    line-height: 18px;
    color: rgb(255,153,0);
  }
  .time{
    margin-left: 12px;
    font-size: 12px;
    line-height: 18px;
    color: rgb(147,153,159);
  }
  .allRotings_title{
    padding: 18px;
    box-sizing: border-box;
    margin-top: 18px;
    background: white;
    border-top: 1px solid rgba(7,17,27,0.2);
    border-bottom: 1px solid rgba(7,17,27,0.2);
  }
  .title_box{
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7,17,27,0.2);
  }
  .listBox{
    display: inline-block;
    padding: 8px 12px;
    font-size: 1px;
    line-height: 16px;
    border-radius: 2px;
  }
  .allList{
    background: rgb(0,160,220);
    color: white;
  }
  .goodList{
    margin: 0 8px;
    background: rgba(0,160,220,0.2);
    color: rgb(77,85,93);
  }
  .badList{
    color: rgb(77,85,93);
    background: rgba(77,85,93,0.2);
  }
  .look-have{
    color: rgb(147,153,159);
    line-height: 24px;
    padding-top: 18px;
    box-sizing: border-box;
    font-size: 12px;
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
  .rotingsList{
    background: white;
  }
  .rotings-box{
    padding: 18px;
    border-top: 1px solid rgba(7,17,27,0.1);
    display: flex;
  }
  .rotings-box-left{
    flex: 0 0 40px;
    width: 40px;
  }
  .rotings-box-right{
    flex: 1;
  }
  .imgBox{
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
  }
  .imgBox img{
    width: 28px;
    height: 28px;
  }
  .userName{
    font-size: 10px;
    color: rgb(7,17,27);
    line-height: 12px;
  }
  .deliveryTime{
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
    margin:4px 0 6px 0 ;
    color: rgb(147,153,159);
  }
  .user_text{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin-bottom: 8px;
  }
  .icon-thumb_up,.icon-thumb_down{
    font-size: 12px;
    line-height: 16px;
  }
  .icon-thumb_up{
    color: rgb(0,160,220);
  }
  .icon-thumb_down{
    color: rgb(183,187,191);
  }
  .recommend_box{
    padding: 0 6px;
    margin-left: 8px;
    display: inline-block;
    border: 1px solid rgba(7,17,27,0.1);
    border-radius: 2px;
    background: white;
    font-size: 9px;
    line-height: 16px;
    color: rgb(147,153,159);
  }
  .blue{
    color: rgb(0,160,220);
  }
</style>
