<template>
  <div class="asideMember">
    <img class="userImg" :src="avatar" alt="">
    <p class="userName">{{userName}}</p>
    <div class="line"></div>
    <button class="loginBtn" @click="OnLogoutClick">會員登出</button>
  </div>
</template>

<script>
export default {
    props: ['avatar','userName'],
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
    .asideMember{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .userImg{
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 20px;
        }
        .userName{
            font-size: 22px;
            color: #595959;
            margin-bottom: 20px;
        }
        .line{
            width: 100%;
            height: 1px;
            background-color: #00000010;
            margin-bottom: 20px;
        }
        .loginBtn{
            font-size: 18px;
            color: rgb(140,140,140);
        }
    }
</style>