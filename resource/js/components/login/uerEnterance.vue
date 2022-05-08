<template>
<div>
<!--  <transition name="fade">-->
<!--  </transition>-->
  <button  @click="show">Login</button>
 <transition name="slide-fade">
       <register v-if="isLogin===false"></register>
       <login v-else-if="isRegister===false"></login>
 </transition>

</div>
</template>

<script>
export default {
  name: "uerEntrance",
  data() {
    return {
      isLogin: true,
      isRegister: false,
    }
  },
  methods: {
    show() {
      this.isLogin = !this.isLogin;
      this.isRegister = !this.isRegister;
    },

  }
}
</script>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.9s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>