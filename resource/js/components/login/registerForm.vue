<template>
    <div class="col-md-12 pt-2 mt-5 px-0">
        <div class="mx-auto col-md-5 col position-relative">
            <div class="box btn-grad form-box py-5 mt-5">
                <div class="col-md-4 col-5 user position-absolute">
                    <img :src="icon" alt="logo" class="img-fluid">
                </div>

                <p class="mt-3 text-danger text-center" v-for="item in errors">{{ item }}</p>

                <div class="form-group pt-2 mt-5">
                    <div class="input-group col-md-9 mx-auto">
                        <span class="input-group-addon p-1 px-3 pt-1"><i class="fa fa-user text-white mt-2"></i></span>
                        <input required id="name" type="text" v-model="name" class="form-control text-white" name="name" placeholder="نام و نام خانوادگی">
                    </div>
                </div>

                <div class="form-group pt-1">
                    <div class="input-group col-md-9 mx-auto">
                        <span class="input-group-addon p-1 px-3 pt-1"><i class="fa fa-phone text-white mt-2"></i></span>
                        <input id="phone" type="text" v-model="phone" class="form-control text-white" name="phone" placeholder="شماره موبایل">
                    </div>
                </div>

                <div class="form-group pt-1">
                    <div class="input-group col-md-9 mx-auto">
                        <span class="input-group-addon p-1 px-3 pt-1"><i class="fa fa-envelope text-white mt-2"></i></span>
                        <input required id="email" type="email" v-model="email" class="form-control text-white" name="email" placeholder="ایمیل">
                    </div>
                </div>

                <div class="form-group pt-1">
                    <div class="input-group col-md-9 mx-auto">
                        <span class="input-group-addon p-1 px-3 pt-1"><i class="fa fa-lock text-white mt-2"></i></span>
                        <input required type="password" class="form-control text-white" name="password" id="password" v-model="password" placeholder="رمز عبور">
                    </div>
                </div>

                <div class="form-group pt-1">
                    <div class="input-group col-md-9 mx-auto">
                        <span class="input-group-addon p-1 px-3 pt-2"><i class="fa fa-lock text-white mt-2"></i></span>
                        <input required type="password" name="password-confirmation" class="form-control text-white" id="password-confirm" v-model="passwordRepeat" placeholder="تکرار رمز عبور">
                    </div>
                </div>

                <div class="row mx-auto text-center mt-5 px-0">
                    <div class="col-md-6">
                        <a @click="login" class="text-center hand-cursor">ورود کنید</a>
                    </div>
                    <!--          <div class="col-md-6 mx-auto">-->
                    <!--            <a class="text-center hand-cursor">فراموشی رمز عبور</a>-->
                    <!--          </div>-->
                </div>
            </div>

            <div class="register-container">
                <button type="submit" class="btn btn-grad btn-block py-3">ثبت نام</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "registerForm",
    props: {
        icon: {
            type: String
        },
        errors: {
            type: Array
        }
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordRepeat: "",
            phone: ""
        };
    },
    methods: {
        login() {
            this.$emit('lets_fade')
        }
    }
};
</script>


<style scoped>

.btn-grad {
    background-image: linear-gradient(to right, #DAE2F8 0%, #D6A4A4 51%, #DAE2F8 100%)
}

.form-control {
    background-color: rgba(33, 45, 105, 0.76);
    border: none;
    border-radius: 0rem !important;
    font-size: 12pt;
    padding: 0.5rem;
    height: 3rem;
}

input::placeholder {
    color: #fff;
}

.form-control:focus {
    background-color: rgba(33, 45, 105, 0.76);
    color: white;
}

.input-group-addon {
    background-color: #1D2B64;
}

.form-box {
    border-radius: 2rem;
}

.user {
    top: -4rem;
    right: 36%;
    width: 125px;
    height: 125px;
    border-radius: 50%;
    background-color: #1D2B64;
}

.register-container {
    position: absolute;
    right: 10%;
    width: 80%;
    text-align: center;
    z-index: -1;
}

.btn-block {
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
}

a {
    text-decoration: none;
    color: #1D2B64;
}

i {
    font-size: 14pt;
}

.box {
    box-shadow: 0 0 43px rgba(0, 0, 0, 0.78);
}
</style>
