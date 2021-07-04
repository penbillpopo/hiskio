<template>
  <div class="navfield">
    <nav>
      <NuxtLink class="logo" to="/"></NuxtLink>
      <button v-if="!isAuthenticated" class="loginBtn" @click="OnLoginClick">登入</button>
      <button v-else class="userBtn" :style="userBtnStyle()" @click="OnUserClick"></button>
    </nav>
    <aside :class="asideClass()">
      <button class="closeBtn" @click="OnAsideCloseClick">
        <svg data-v-f2fdd046="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="absolute flex items-center justify-center text-gray-700 cursor-pointer top-30px right-30px w-13 h-13 svg-inline--fa fa-times fa-w-11 fa-lg"><path data-v-f2fdd046="" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>
      </button>
      <aside-member :avatar="getUserImg" :userName="getUserName" @OnLogoutClick="OnLogoutClick"></aside-member>
    </aside>
  </div>
</template>

<script>
import AsideMember from './AsideMember.vue'
export default {
  components:{
    AsideMember,
  },
  data(){
    return {
      isAsideOpen:false
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
    OnUserClick(){
      this.isAsideOpen = true
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
  }
  aside{
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
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
