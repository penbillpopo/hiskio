<template>
  <div v-if="isLoginOpen" class="wrapper">
    <!--login-->
    <div class="card grid grid-cols-1 gap-4">
      <!--avatar-->
      <img class="img justify-self-center" src="~/assets/img/logo-hiskio.svg"/>
      <span class="text-2 text-center font-bold">使用HISKIO ID 登入</span>
      <div class="justify-self-center">
      </div>
      <!--fields-->
      <label class="block">
        <span class="sr-only">請輸入HISKIO ID</span>
        <input v-model="formData.account" type="text" class="w-full" placeholder="請輸入HISKIO ID" required />
      </label>
      <label class="block">
        <span class="sr-only">請輸入密碼</span>
        <input v-model="formData.password" type="password" class="w-full" placeholder="請輸入密碼" required />
      </label>
      <label class="block">
        <input type="checkbox" checked />
        <span class="text-sm">登入註冊及代表您同意<a href="#">使用者</a>及<a href="#">隱私權政策</a></span>
      </label>
      <button class="btn justify-center" type="submit" @click="OnSubmitClick">登入</button>
      <a href="#" class="text-sm text-gray-400 text-center">忘記密碼</a>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            formData:{
                account:null,
                password:null
            }
        }
    },
    mounted(){
    },
    computed:{
        isLoginOpen(){
            return this.$store.getters.getIsLoginOpen
        }
    },
    methods:{
        OnSubmitClick(){
            this.$store.dispatch('login',this.formData)
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply flex justify-center items-center h-screen;
}
.card {
  @apply border rounded-lg p-10 m-10 bg-white shadow-sm w-full max-w-sm;
}

[type="text"],
[type="password"],
[type="checkbox"],
[multiple],
textarea,
select {
  @apply rounded-md border-gray-100 border shadow-sm bg-gray-100 focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50;
}

[type="checkbox"],
[type="radio"] {
  @apply text-emerald-400 bg-current;
}

.btn {
  @apply rounded border px-6 py-2 bg-emerald-400 text-gray-100 shadow-sm;
}

.img{
  width: 100px;
}
</style>
