<template>
  <div class="navfield">
    <nav>
      <NuxtLink class="logo" to="/"></NuxtLink>
      <button v-if="!isAuthenticated" class="loginBtn" @click="OnLoginClick">登入</button>
      <button v-if="isAuthenticated" class="cartBtn" :class="{active:cartHasItems}" @click="OnCartClick">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-shopping-cart fa-w-18 fa-lg shopping-cart ml-6px transition duration-200 hover:text-yellow-3 text-white">
          <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" class="">
          </path>
        </svg>
      </button>
      <button v-if="isAuthenticated" class="userBtn" :style="userBtnStyle()" @click="OnUserClick"></button>
    </nav>
    <aside :class="asideClass()">
      <button class="closeBtn" @click="OnAsideCloseClick">
        <svg data-v-f2fdd046="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="absolute flex items-center justify-center text-gray-700 cursor-pointer top-30px right-30px w-13 h-13 svg-inline--fa fa-times fa-w-11 fa-lg"><path data-v-f2fdd046="" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>
      </button>
      <aside-member v-if="currentAside==='member'" :avatar="getUserImg" :userName="getUserName" @OnLogoutClick="OnLogoutClick"></aside-member>
      <aside-cart v-if="currentAside==='cart'"></aside-cart>
    </aside>
  </div>
</template>

<script>
import AsideMember from './AsideMember.vue'
import AsideCart from './AsideCart.vue'
export default {
  components:{
    AsideMember,
    AsideCart
  },
  data(){
    return {
      isAsideOpen:false,
      currentAside:''
    }
  },
  computed:{
    getUserImg(){
      return this.$store.getters.getUserData?.avatar
    },
    getUserName(){
      return this.$store.getters.getUserData?.username
    },
    isLoginOpen(){
      return this.$store.getters.getIsLoginOpen
    },
    isAuthenticated(){
      return this.$store.getters.getAuthenticated
    },
    cartHasItems(){
      return this.$store.getters.getCarts.length>0
    }
  },
  mounted(){
  },
  methods:{
    asideClass(){
      return [{active: this.isAsideOpen}]
    },
    userBtnStyle(){
      return {backgroundImage:'url('+this.getUserImg+')'}
    },
    OnLoginClick(){
      this.$store.dispatch('changeIsLoginOpen',true)
    },
    OnCartClick(){
      this.isAsideOpen = true
      this.currentAside = 'cart'
    },
    OnUserClick(){
      this.isAsideOpen = true
      this.currentAside = 'member'
    },
    OnAsideCloseClick(){
      this.isAsideOpen = false
    },
    OnLogoutClick(){
      this.OnAsideCloseClick()
      this.$store.dispatch('logout')
    }
  }
};
</script>

<style lang="scss" scoped>
.navfield{
  width: 100%;
  height: 50px;
  nav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    .logo {
      position: absolute;
      left: 60px;
      top:50%;
      transform: translateY(-50%);
      width: 100px;
      height: 50px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('~assets/img/logo-hiskio.svg');
    }
    .loginBtn{
      position: absolute;
      right: 50px;
      top:50%;
      transform: translateY(-50%);
      width: 64px;
      height: 32px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: rgba(48,142,172);
      border:1px solid rgba(48,142,172);
      border-radius: 3px;
    }
    .userBtn{
      position: absolute;
      right: 20px;
      top:50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .cartBtn{
      position: absolute;
      right: 80px;
      top:50%;
      transform: translateY(-50%);
      width: 22px;
      height: 22px;
      &.active{
        svg{
          fill: #308EAC;
        }
        &::after{
          content: '';
          width: 8px;
          height: 8px;
          position: absolute;
          right: -4px;
          top: -1px;
          background-color: #e34a4a;
          border-radius: 50%;
        }
      }
      svg{
        width: 100%;
        height: 100%;
        transition: fill 0.3s;
        fill: #D9D9D9;
      }
    }
  }
  aside{
    position: fixed;
    top: 0;
    right: -375px;
    width: 375px;
    height: 100vh;
    z-index: 999;
    background-color: white;
    transition: right 0.5s ease;
    padding-top:30px;
    &.active{
      right: 0;
    }
    .closeBtn{
      width: 20px;
      height: 20px;
      position: absolute;
      top: 20px;
      right: 20px;
      svg{
        width: 100%;
        height: 100%;
        fill: #595959;
      }
    }
  }
}
</style>
