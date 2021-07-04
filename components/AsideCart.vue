<template>
  <div class="asideCart">
    <p class="headTitle">購物車</p>
    <div class="chartBox">
      <div class="chartItem" v-for="item in getCarts" :key="item.id">
        <div class="itemImg" :style="{backgroundImage:'url('+item.image+')'}"></div>
        <div class="textArea">
          <p class="itemName">{{item.name}}</p>
          <div class="priceBox">
            <p class="price">{{item.total}}</p>
            <p class="fixPrice">{{getFixedPrice(item.courses)}}</p>
          </div>
        </div>
        <button class="deleteBtn" @click="deleteChartItem(item.id)">
          <svg data-v-0d4e163b="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="text-gray-400 m-3px mt-5px svg-inline--fa fa-trash fa-w-14"><path data-v-0d4e163b="" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" class=""></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    computed:{
      getCarts(){
        console.log(this.$store.getters.getCarts)
        return this.$store.getters.getCarts
      }
    },
    mounted(){
      this.$store.dispatch('updateCarts')
    },
    methods:{
      getFixedPrice(course = null){
        if(course && course.length>0){
          return course[0].prices[course[0].prices.length-1].price
        }
      },
      deleteChartItem(id){
        this.$store.dispatch('deleteCarts',id)
      }
    }
};
</script>
<style lang="scss" scoped>
  .asideCart{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .headTitle{
      font-size: 20px;
      margin-bottom: 20px;
    }
    .chartBox{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .chartItem{
        width: 100%;
        height: 115px;
        border-bottom:1px solid #00000020;
        padding: 15px;
        display: flex;
        position: relative;
        .deleteBtn{
          position: absolute;
          right: 10px;
          top: 10px;
          width: 15px;
          height: 15px;
          fill: #d9d9d9;
        }
        .itemImg{
          width: 150px;
          min-width: 150px;
          margin-right: 10px;
          padding-bottom: 24%;
          background-size: 100%;
          background-repeat: no-repeat;
          border-radius: 5px;
          overflow: hidden;
        }
        .textArea{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .itemName{
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            color: #454545;
            font-size: 16px;
            padding-right: 20px;
          }
          .priceBox{
            display: flex;
            align-items: center;
            .price{
              margin-right: 10px;
              font-size: 18px;
              color: #e34a4a;
              font-weight: bold;
            }
            .fixPrice{
              font-size: 14px;
              color: #bfbfbf;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
</style>