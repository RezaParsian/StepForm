<template>
  <div class="col-md-12 pt-2 mt-5 px-0">
    <form>
      <div class="mx-auto col-md-5 col position-relative">
        <div class="box btn-grad form-box py-5 mt-5">
        <div class="col-md-4 col-5 user position-absolute">
          <svg viewBox="0 0 120 120" xmlns="">
            <circle cx="60" cy="60" r="60"/>
          </svg>
        </div>

        <div class="form-group pt-2 mt-5">
          <div class="input-group col-md-9 mx-auto">
            <span class="input-group-addon p-1 px-3 pt-1"><i class="fa fa-user text-white mt-2"></i></span>
            <input id="name" type="text" v-model="name" class="form-control text-white" name="name" placeholder="نام و نام خانوادگی">
          </div>
        </div>

        <div class="form-group pt-1">
          <div class="input-group col-md-9 mx-auto">
            <span class="input-group-addon p-1 px-3 pt-1"><i class="fa fa-envelope text-white mt-2"></i></span>
            <input id="email" type="email" v-model="email" class="form-control text-white" name="email" placeholder="ایمیل">
          </div>
        </div>

        <div class="form-group pt-1">
          <div class="input-group col-md-9 mx-auto">
            <span class="input-group-addon p-1 px-3 pt-1"><i class="fa fa-lock text-white mt-2"></i></span>
            <input type="password" class="form-control text-white" id="password" v-model="password" placeholder="رمز عبور">
          </div>
        </div>

        <div class="form-group pt-1">
          <div class="input-group col-md-9 mx-auto">
            <span class="input-group-addon p-1 px-3 pt-2"><i class="fa fa-lock text-white mt-2"></i></span>
            <input type="password" class="form-control text-white" id="passwordRepeat" v-model="passwordRepeat" placeholder="تکرار رمز عبور">
          </div>
        </div>

        <div class="row mx-auto text-center mt-5 px-0">
          <div class="col-md-6">
            <a class="text-center">ورود</a>
          </div>
          <div class="col-md-6 mx-auto">
            <a class="text-center">فراموشی رمز عبور</a>
          </div>
        </div>
        </div>

        <div class="register-container">
          <button type="button" class="btn btn-grad btn-block py-3" @click="register">ثبت نام</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "registerForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordRepeat: ""
    };
  },
  methods: {
    register() {
      if (this.password === this.passwordRepeat) {
        this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password
        });
      } else {
        this.$store.dispatch("setError", "رمز عبور با تکرار آن یکسان نمی باشد.");
      }
    }
  }
};
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
  color: white;
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

.register-container{
  position: absolute;
  bottom: -13%;
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