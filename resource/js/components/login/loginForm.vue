<template>
<div class="col-md-12 align-content-center mt-5 pt-5 px-0">
    <form @submit.prevent="login">
       <div class="mx-auto col-md-5 position-relative">
         <div class="box btn-grad form-box py-5 mt-5 ">
           <div class="col-md-4 col-5 user position-absolute">
             <svg viewBox="0 0 120 120" xmlns="">
               <circle cx="60" cy="60" r="60"/>
             </svg>
           </div>

           <div class="form-group pt-3 mt-4">
             <div class="input-group col-md-9 mx-auto">
               <span class="input-group-addon px-3 pt-2"><i class="fa fa-user mt-1 text-white"></i></span>
               <input id="chat" type="text" v-model="chatID" class="form-control" name="chat-id" placeholder="جت ای دی">
             </div>
           </div>

           <div class="form-group pt-1">
             <div class="input-group col-md-9 mx-auto">
               <span class="input-group-addon px-3 pt-2"><i class="fa fa-lock mt-1 text-white"></i></span>
               <input type="password" name="password" class="form-control" id="password" v-model="password" placeholder="رمز عبور">
             </div>
           </div>
           <div class="row mx-auto text-center mt-5 px-0">
             <div class="col-md-6">
               <a class="text-center">ثبت نام</a>
             </div>
             <div class="col-md-6 mx-auto">
               <a class="text-center">فراموشی رمز عبور</a>
             </div>
           </div>
         </div>
         <div class="login-container">
           <button type="submit" class="btn btn-grad btn-block py-3">ورود</button>
         </div>
       </div>
    </form>
</div>
</template>

<script>
export default {
  name: "loginForm",
  data() {
    return {
      chatID: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        chatID: this.chatID,
        password: this.password
      });
    }
  }
}
</script>

<style scoped>


.btn-grad {background-image: linear-gradient(to right, #DAE2F8 0%, #D6A4A4  51%, #DAE2F8  100%)}
.form-control{
  background-color: rgba(33, 45, 105, 0.76);
  border: none;
  border-radius: 0rem!important;
  font-size: 12pt;
  padding: 0.5rem;
  height: 3rem;
}
input::placeholder {
  color: #fff;
}

.form-control:focus{
  background-color: rgba(33, 45, 105, 0.76);
  color: white!important;
}

.input-group-addon {
  background-color: #1D2B64;
}

.form-box{
  border-radius: 2rem;
}

.user{
  top: -4rem;
  right: 32%;
}

.login-container{
  position: absolute;
  bottom: -17%;
  right: 10%;
  width: 80%;
  text-align: center;
  z-index: -1;
}

.btn-block{
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
}

a{
  text-decoration: none;
  color: #1D2B64;
}
i{
  font-size: 14pt;
}
svg{
  fill:#1D2B64;
}
.box{
  box-shadow: 0 0 43px rgba(0,0,0,0.78);
}
</style>