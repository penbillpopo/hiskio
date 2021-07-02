<template>
  <div class="wrapper">
    <Login></Login>
    <div class="box">

      <div class="card" v-for="item in result" :key="item.id">
        <div class="title">
          {{item.title}}
        </div>
        <div>
          <span>
            ${{item.price}}
          </span>
          <small>
            ${{item.fixed_price}}
          </small>
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
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.wrapper {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
.btn {
  @apply flex-1 border-b-2 md:flex-none ml-2 font-bold py-4 px-6 rounded;
  .title {
    @apply text-6xl font-bold;
  }
}
.box{
  display: flex;
  justify-content: space-around;
  
  width: 100%;
  .card{
    width: 150px;
    height: 150px;
    border:2px solid #000;
    .title{
      overflow : hidden;
      text-overflow : ellipsis;
      white-space : nowrap;
    }
  }
}
</style>
