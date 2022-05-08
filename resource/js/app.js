window.$ = window.jQuery = require("jquery");
const Vue = require("vue").default;
require("select2");
require("bootstrap-v4-rtl");
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

require("./custom");


Vue.component("main_form", require("./components/main").default);
Vue.component("iran", require("./components/iran").default);
Vue.component("start", require("./components/start").default);
Vue.component("advertise", require("./components/advertise").default);
Vue.component("budget", require("./components/budget").default);
Vue.component("social-media", require("./components/social_media").default);
Vue.component("telegram", require("./components/telegram").default);
Vue.component("instagram_post", require("./components/instagram_post").default);
Vue.component("instagram_story", require("./components/instagram_story").default);
Vue.component("checkout", require("./components/checkout").default);
Vue.component("channels", require("./components/channels").default);
Vue.component("login", require("./components/login/loginForm").default);
Vue.component("register", require("./components/login/registerForm").default);
Vue.component("entrance", require("./components/login/uerEnterance").default);

Vue.use(VuePersianDatetimePicker, {
    name: "datePicker",
    props: {
        format: 'YYYY-MM-DD HH:mm:ss',
        displayFormat: 'jYYYY-jMM-jDD HH:mm',
        color: '#008400',
        inputClass:"form-control ltr text-center",
        autoSubmit: true,
        clearable: true,
        placeholder: "",
    }
});

const app = new Vue({
    el: "#step_form"
});