<template>
  <div class="box">
    <img :src="avatar" alt="">
    <button class="btn" @click="OnLogoutClick">Logout</button>
  </div>
</template>

<script>
export default {
    props: ['avatar'],
    data(){
        return {
        }
    },
    computed:{
       
    },
    mounted(){
    },
    methods:{
        OnLogoutClick(){
            this.$emit('OnLogoutClick')
        }
    }
};
</script>
<style lang="scss" scoped>
    .box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
            display: inline-block;
        }
    }
    .btn {
        @apply px-4 py-2 text-gray-500 rounded-lg hover:bg-emerald-100 hover:text-emerald-700;

        &.nuxt-link-exact-active {
        @apply bg-emerald-100 text-emerald-700;
        }
    }
</style>