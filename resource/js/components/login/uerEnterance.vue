<template>
    <div>
        <transition name="bounce">
            <login :errors="error" :icon="icon" @lets_fade="fadeMe" v-if="is_login"></login>
            <register :errors="error" :icon="icon" @lets_fade="fadeMe" v-else></register>
        </transition>
    </div>
</template>

<script>
export default {
    name: "uerEntrance",
    props: {
        icon: {
            type: String,
        },
        register: {
            type: String,
        },
        login: {
            type: String
        },
        errors: {
            type: Array,
        }
    },
    data() {
        return {
            is_login: true,
        }
    },
    computed: {
        error() {
            if (this.errors.length > 1)
                this.fadeMe();
            return this.errors;
        }
    },
    methods: {
        fadeMe() {
            this.is_login = !this.is_login;
            if (this.is_login)
                $("#app").attr("action", this.login);
            else
                $("#app").attr("action", this.register);
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
