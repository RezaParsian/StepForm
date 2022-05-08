<template>
  <div>

    <transition name="bounce">
      <login @lets_fade="fadeMe" v-if="is_login"></login>
      <register @lets_fade="fadeMe" v-else−if="!is_login"></register>
    </transition>

  </div>
</template>

<script>
export default {
  name: "uerEntrance",
  data() {
    return {
      is_login: true,
    }
  },
  methods: {
    fadeMe() {
      this.is_login = !this.is_login;
    },
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .9s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}


</style>