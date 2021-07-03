<template>
  <div class="navfield">
    <nav>
      <NuxtLink class="logo" to="/"></NuxtLink>
      <button v-if="!isAuthenticated" class="loginBtn" @click="OnLoginClick">登入</button>
      <button v-else class="userBtn" :style="userBtnStyle()" @click="OnUserClick"></button>
    </nav>
    <aside :class="asideClass()">
      <button class="closeBtn" @click="OnAsideCloseClick">X</button>
      <aside-member :avatar="getUserImg" @OnLogoutClick="OnLogoutClick"></aside-member>
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
    background-color: white;
    transition: right 1s ease;
    &.active{
      right: 0;
    }
  }
}
</style>
