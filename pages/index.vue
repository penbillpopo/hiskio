<template>
  <div class="pageContainer">
    <Login></Login>
    <div class="courseField">
      <div class="courseBox" v-for="item in result" :key="item.id"> 
        <div class="headImg" :style="{backgroundImage:'url('+item.image+')'}"></div>
        <div class="textFrame">
          <p class="title">{{item.title}}</p>
          <div class="posterBox">
            <img class="pic" :src="item.lecturers[0].avatar" alt="stew">
            <p class="name">{{item.lecturers[0].username}}</p>
          </div>
          <div class="progressBox">
            <p class="lastDays">剩{{getLastDays(item.prices,item.price,item.fixed_price)}}天</p>
            <p class="sponsor">已募資{{getSponsorProgress(item.consumers,item.fundraising_tickets)}}%</p>
          </div>
          <div class="redBar"></div>
          <div class="priceBox">
            <p class="price">${{item.price}}</p>
            <p class="fixPrice">${{item.fixed_price}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apiGetFund} from '../api/index'

export default {
  data() {
    return {
      result:null
    }
  },
  async created(){
    const {token} = this.$cookies.get("accessToken")
    if(token){
        const res = await apiGetFund(token)
        this.result = res.data
    }
    
  },
  mounted(){
  },
  methods: {
    getSponsorProgress(consumers,fundraisingTickets){
      let res = parseInt(consumers)/parseInt(fundraisingTickets)*100
      return parseInt(res)
    },
    getLastDays(prices,price,fixPrice){
      let toDate = prices.find(item=>item.price===fixPrice
        &&new Date(item.schedule_at) > new Date)
      let during =  new Date(toDate.schedule_at) - new Date()
      let lastDate = during/(1000 * 3600 * 24)
      return Math.ceil(lastDate);
    }
  }
};
</script>

<style lang="scss" scoped>
  .pageContainer{
    width: 100%;
    .courseField{
      width: 90%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 auto;
      margin-top: 60px;
      .courseBox{
        width: 24%;
        background-color: #fff;
        .headImg{
          width: 100%;
          padding-bottom: 55%;
          background-size: 100%;
          background-repeat: no-repeat;
        }
        .textFrame{
          padding: 10px;
          .title{
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            color: #454545;
            font-size: 20px;
          }
          .posterBox{
            display: flex;
            align-items: center;
            .pic{
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 10px;
            }
            .name{
              font-size: 16px;
              color: #8c8c8c;
              overflow:hidden;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-line-clamp:1;
              -webkit-box-orient:vertical;
            }
          }
          .progressBox{
            display: flex;
            justify-content: space-between;
            color: #505959;
            font-size: 14px;
          }
          .redBar{
            width: 100%;
            height: 10px;
            background-image: linear-gradient(90deg,#eb6767 -.01%,#e34a4a 99.7%);
            border-radius: 5px;
          }
          .priceBox{
            display: flex;
            align-items: center;
            .price{
              font-size: 22px;
              margin-right: 5px;
            }
            .fixPrice{
              font-size: 14px;
              color: #bfbfbf;
            }
          }
        }
      }
    }
  }
</style>
