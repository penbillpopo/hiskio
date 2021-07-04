<template>
  <div class="pageContainer">
    <Login></Login>
    <div class="courseField">
      <div class="courseBox" v-for="item in fundData" :key="item.id"> 
        <div class="headImg" :style="{backgroundImage:'url('+item.image+')'}">
          <button class="addCartBtn">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-shopping-cart fa-w-18 fa-lg shopping-cart ml-6px transition duration-200 hover:text-yellow-3 text-white">
              <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" class="">
              </path>
            </svg>
          </button>
        </div>
        <div class="textFrame">
          <p class="title">{{item.title}}</p>
          <div class="posterBox">
            <img class="pic" :src="item.lecturers[0].avatar" alt="stew">
            <p class="name">{{item.lecturers[0].username}}</p>
          </div>
          <div class="progressBox">
            <p class="lastDays">剩{{getLastDays(item.prices,item.fixed_price)}}天</p>
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
  async asyncData(data) {
    let fundData =null
    let cookie = null
    let token = ''
    if(data.ssrContext){
      cookie = data.ssrContext?.req?.headers?.cookie
      if(cookie){
        const cookieparser = require('cookieparser');
        const tokenObj = JSON.parse(cookieparser.parse(cookie)?.accessToken);
        token = tokenObj.token
      }
    }else{
      cookie = data.app?.$cookies?.get('accessToken')
      if(cookie){
        token = cookie.token
      }
    }
    if(token){
      fundData = (await apiGetFund(token)).data
    }
    return {
      fundData:fundData
    }
  },
  data() {
    return {
      fundData:null,
    }
  },
  created(){
  },
  mounted(){
  },
  watch: {
    '$store.getters.getAuthenticated': async function(value) {
      this.$nuxt.refresh()
    }
  },
  methods: {
    getSponsorProgress(consumers,fundraisingTickets){
      let res = parseInt(consumers)/parseInt(fundraisingTickets)*100
      return parseInt(res)
    },
    getLastDays(prices,fixPrice){
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
        border-radius: 5px;
        overflow:hidden;
        .headImg{
          position: relative;
          width: 100%;
          padding-bottom: 55%;
          background-size: 100%;
          background-repeat: no-repeat;
          &:hover{
            &::after{
              background: linear-gradient(0deg, rgba(0, 0, 0, 0.3)0%, rgba(255, 255, 255, 0)50%);
              background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 0.3)0%, rgba(255, 255, 255, 0)50%);
              background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.3)0%, rgba(255, 255, 255, 0)50%);
              background: -o-linear-gradient(0deg, rgba(0, 0, 0, 0.3)0%, rgba(255, 255, 255, 0)50%);
            }
            .addCartBtn{
              display: block;
            }
          }
          &::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            transition: background 0.3s;
          }
          .addCartBtn{
            position: absolute;
            right: 5px;
            bottom: 5px;
            z-index: 2;
            width: 27px;
            height: 27px;
            display: none;
            svg{
              width: 100%;
              height: 100%;
              transition: fill 0.3s;
              fill: white;
              &:hover{
                fill: orange;
              }
            }
          }
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
            margin-bottom: 5px;
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
            margin-bottom: 5px;
          }
          .redBar{
            width: 100%;
            height: 10px;
            background-image: linear-gradient(90deg,#eb6767 -.01%,#e34a4a 99.7%);
            border-radius: 5px;
            margin-bottom: 5px;
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
