<template>
  <div>
    <div class="goods">
      <div class="goods-slide">
        <ul>
          <li v-for="(item,index) in goods" class="menuList" :class="{'active': id==index}" @click="getIndex(index)">
            <span class="text">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="goods-wapper">
        <span class="title">{{goods[id].name}}</span>
        <div class="goods-main" v-for="value in goods[id].foods" @click="getFood(value)">
        <span class="imgbox">
          <img :src="value.image" alt="">
        </span>
          <span class="food-discrible">
          <p class="food-title">{{value.name}}</p>
          <p class="food-name">{{value.description}}</p>
          <p class="food-count">月售{{value.sellCount}}份 好评率{{value.rating}}%</p>
          <p class="food-price">￥{{value.price}}</p>
        </span>
          <div class="btn-wapper">
            <cartBtn :foods="value"></cartBtn>
          </div>
        </div>
      </div>
      <shopcar :selectFood="selectFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
    </div>
    <!--<keep-alive>-->
    <goodsDescrible :myFoods="myFoods" v-if="flag" @close="myclose"></goodsDescrible>
    <!--</keep-alive>-->
  </div>
</template>

<script>
  import shopcar from '../../components/shopcar/shopcar.vue'
  import cartBtn from '../../components/cartBtn/cartBtn.vue'
  import goodsDescrible from '../../components/goodsDescrible/goodsDescrible.vue'
  export default{
    components:{
      shopcar:shopcar,
      cartBtn:cartBtn,
      goodsDescrible:goodsDescrible
    },
    props:["seller"],
    data(){
      return{
        goods:[{
            name:"",
          foods:[{

          }]
        }],
        id:0,
        count:0,
        num:0,
        isActive:false,
        myFoods:[],
        flag:false
      }
    },
    mounted:function(){
      this.$http.get('data.json').then(function(response){
        this.goods=response.body.goods
      },function(error){
        console.log('报错')
      })
    },
    methods:{
      getIndex:function(index){
        this.id=index;
      },
      getFood:function(food){
          this.myFoods=food;
          this.flag=true
      },
      myclose(data){
          this.flag=data
      }
    },
    computed:{
      selectFood(){
          let foods=[];
          this.goods.forEach((good)=>{
              good.foods.forEach((food)=>{
                if(food.count){
                  foods.push(food)
                }
              })
          })
          return foods
      }
    },
    created(){

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
  .goods{
    position: absolute;
    top: 174px;
    width: 100%;
    bottom:46px;
    overflow: hidden;
    display: flex;
    border-top:2px solid rgba(7,17,27,0.1);
  }
  .goods-slide{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    overflow-y: scroll;
  }
  .goods-wapper{
    flex: 1;
    overflow-y: scroll;
  }
  .menuList{
    font-size: 12px;
    list-style: none;
    color: rgb(105,108,112);
    font-weight: 200;
    display: table;
    height: 54px;
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;
    line-height: 14px;
  }
  .active{
    background: white;
    color: black;
    font-weight: 400;
  }
  .text{
    display: table-cell;
    vertical-align: middle;
    width: 56px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .title{
    display: block;
    height: 28px;
    background: #f3f5f7;
    font-size: 12px;
    line-height: 28px;
    color: #888b8e;
    border-left: 4px solid rgba(7,17,27,0.1);
    text-indent: 1em;
  }
  .goods-main{
    padding: 18px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.2);
    position: relative;
  }
  .imgbox{
    display: inline-block;
    width: 56px;
    height: 56px;
  }
  .imgbox img{
    width: 56px;
    height: 56px;
  }
  .food-discrible{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    width: 60%;
  }
  .btn-wapper{
    position: absolute;
    bottom: 12px;
    right: 12px;
  }
  .food-title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin: 2px 0 8px 0;
  }
  .food-name{
    font-size: 12px;
    color: grey;
    margin-bottom: 8px;
  }
  .food-count{
    font-size: 12px;
    color: grey;
    margin-bottom: 8px;
  }
  .food-price{
    font-size: 14px;
    color: red;
  }
</style>
