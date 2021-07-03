<template>
  <div v-if="isLoginOpen" class="dialogContainer">
    <!--login-->
    <div class="dialog">
      <button class="closeBtn" @click="OnCloseClick"></button>
      <img class="logo" src="~/assets/img/logo-hiskio.svg"/>
      <div class="tabField">
        <button class="tab active" type="button">
          登入
        </button>
        <button class="tab" type="button">
          註冊
        </button>
      </div>
      <div class="thirdPartyField">
        <button type="button" class="thirdPartyBtn">
          <img src="~/assets/img/icon/icon-facebook.svg" alt="">
          <p>使用Facebook登入</p>
        </button>
        <button type="button" class="thirdPartyBtn">
          <img src="~/assets/img/icon/icon-google.svg" alt="">
          <p>使用Google登入</p>
        </button>
        <button type="button" class="thirdPartyBtn">
          <img src="~/assets/img/icon/icon-github.svg" alt="">
          <p>使用Github登入</p>
        </button>
        <button type="button" class="thirdPartyBtn">
          <img src="~/assets/img/icon/icon-linkedin.svg" alt="">
          <p>使用Linkedin登入</p>
        </button>
      </div>
      <div class="formField">
        <p class="title">使用HISKIO ID 登入</p>
        <div class="inputBox">
          <div class="inputItem">
            <label>
              <span class="sr-only">請輸入HISKIO ID</span>
              <input v-model="formData.account" type="text" class="w-full" placeholder="請輸入HISKIO ID" required />
            </label>
          </div>
          <div class="inputItem">
            <label>
              <span class="sr-only">請輸入密碼</span>
              <input v-model="formData.password" type="password" class="w-full" placeholder="請輸入密碼" required />
            </label>
          </div>
          <div class="inputItem gap">
            <label>
              <input type="checkbox" checked />
              <span class="text-sm">登入註冊及代表您同意<a href="#">使用者</a>及<a href="#">隱私權政策</a></span>
            </label>
          </div>
          <div class="inputItem">
            <button class="btn justify-center w-full mb-3" type="submit" @click="OnSubmitClick">登入</button>
          </div>
          <div class="inputItem">
            <a href="#" class="block text-sm text-gray-400 text-center">忘記密碼</a>
          </div>
        </div>
      </div>
      <!--fields-->
      
    </div>
    <div class="dialogBlack"></div>
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
      OnCloseClick(){
        this.$store.dispatch('changeIsLoginOpen',false)
      },
      OnSubmitClick(){
        this.$store.dispatch('login',this.formData)
      }
    }
};
</script>

<style lang="scss" scoped>
.dialogContainer{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  .dialog{
    position: absolute;
    width: 450px;
    height: 100vh;
    overflow-y: scroll;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-image: url('~assets/img/login.png');
    background-color: white;
    border-radius: 10px;
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::-webkit-scrollbar {
      -webkit-appearance: none;
    }
    &::-webkit-scrollbar:vertical {
      width: 5px;
      background-color: #00000020;
    }
    &::-webkit-scrollbar:horizontal {
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #aaa;
    }
    .closeBtn{
      position: absolute;
      width: 15px;
      height: 15px;
      right: 30px;
      top: 30px;
      background-image: url('~assets/img/icon/icon-close.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .logo{
      display: block;
      width: 100px;
      margin-bottom: 20px;
    }
    .tabField{
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      width: 100%;
      .tab{
        font-size: 32px;
        font-weight: bold;
        color: rgba(217,217,217);
        &.active{
          color: rgb(40, 143, 172);
        }
      }
    }
    .thirdPartyField{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .thirdPartyBtn{
        width: 100%;
        height: 50px;
        border:1px solid rgba(191,191,191);
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          display: block;
          width: 27px;
          height: 27px;
          margin-right: 15px;
        }
        p{
          text-align: left;
          width: 140px;
          color: rgba(140,140,140);
        }
      }
    }
    .formField{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title{
        color: rgba(89,89,89);
        margin: 25px 0;
      }
      .inputBox{
        width: 100%;
        .inputItem{
          margin-bottom: 10px;
          &.gap{
            margin: 20px 0;
          }
          label{
            display: block;
          }
        }
      }
    }
  }
  .dialogBlack{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
  }
}



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
  
  @apply rounded-md border-gray-100 border shadow-sm bg-gray-100 focus:outline-none focus:border-darkblue focus:ring focus:ring-darkblue focus:ring-opacity-0;
}

[type="checkbox"],
[type="radio"] {
  @apply text-darkblue bg-darkblue hover:bg-darkblue rounded-none;
}

.btn {
  @apply rounded border px-6 py-2 bg-darkblue text-gray-100 shadow-sm;
}

.img{
  width: 100px;
}
</style>
