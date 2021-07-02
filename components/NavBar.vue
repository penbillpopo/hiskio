<template>
  <div>
    <nav>
      <div>
        <NuxtLink class="logo" to="/"></NuxtLink>
      </div>
      <div class="flex">
        <button v-if="!isAuthenticated" class="btn" @click="OnLoginClick">Login</button>
        <button v-else class="userBtn" :style="userBtnStyle()" @click="OnUserClick"></button>
        <!-- <button v-else class="btn" @click="OnLogoutClick">Logout</button> -->
      </div>
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
      this.$store.dispatch('changeIsLoginOpen',!this.isLoginOpen)
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
nav {
  @apply flex justify-between items-center py-2 px-10 fixed w-full bg-white shadow-lg;
  //  mr-12px sn-500:h-10px sn-500:w-66px sn-500:mr-6px
  .logo {
    @apply inline-block bg-center bg-no-repeat bg-contain h-15px w-100px;
    background-image: url('~assets/img/logo-hiskio.svg');
  }
  .btn {
    @apply px-4 py-2 text-gray-500 rounded-lg hover:bg-emerald-100 hover:text-emerald-700;

    &.nuxt-link-exact-active {
      @apply bg-emerald-100 text-emerald-700;
    }
  }
  .userBtn{
    @apply rounded-full h-10 w-10 bg-contain;

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
</style>
