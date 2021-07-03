<template>
  <div class="pageContainer">
    <Login></Login>
    <div class="courseField">
      <div class="courseBox" v-for="item in result" :key="item.id"> 
        <img :src="item.image" alt="stew" class="">
        <div class="m-4">
          <span class="">{{item.title}}</span>
          <span class="">{{item.title}}</span>
        </div>
        <div class="">
          <svg class="" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>${{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apiGetFundServer} from '../api/index'

export default {
  async asyncData({ssrContext}) {
    const cookie = ssrContext.req.headers.cookie
    let data =null
    if(cookie){
      const cookieparser = require('cookieparser');
      const tokenObj = JSON.parse(cookieparser.parse(cookie).accessToken);
      const token = tokenObj.token
      data = (await apiGetFundServer(token)).data
    }
    console.log(data)
    return {
      result:data
    }
  },
  data() {
    return {
    }
  },
  mounted(){
  },
  methods: {
   
  }
};
</script>

<style lang="scss" scoped>
  .pageContainer{
    width: 100%;
    .courseField{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .courseBox{
        width: 20%;
      }
    }
  }
</style>
