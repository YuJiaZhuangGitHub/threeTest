<template>
  <div class="star">
    <img src="../../components/star/star48_on@2x.png" alt="" v-for="item in mydata">
    <img src="../../components/star/star48_off@2x.png" alt="" v-for="item in dataS">
  </div>
</template>

<script>
    export default{
      props:{
        score:{
          type:Number,
          default:0
        },
        badScore:{
          type:Number,
          default:0
        }
      },
      data(){
        return{
          mydata:this.score ? new Array(this.score) : [],
          dataS:this.badScore ? new Array(this.badScore) : []
        }
      },
      watch:{
        score(nv){
          this.mydata=new Array(nv);
        },
        badScore(nm){
          this.dataS=new Array(nm)
        }
      }
    }
</script>

<style scoped>
  .star{
    font-size: 0;
  }
  .star img{
    width: 18px;
    height: 18px;
  }
</style>
