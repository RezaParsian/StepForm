window.$ = window.jQuery = require("jquery");
window.Swal = require('sweetalert2');
const Vue = require("vue").default;
require("select2");
require("bootstrap-v4-rtl");
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

require("./custom");

Vue.component("main_form", require("./components/step_form/main").default);
Vue.component("iran", require("./components/step_form/iran").default);
Vue.component("start", require("./components/step_form/start").default);
Vue.component("advertise", require("./components/step_form/advertise").default);
Vue.component("budget", require("./components/step_form/budget").default);
Vue.component("social-media", require("./components/step_form/social_media").default);
Vue.component("telegram", require("./components/step_form/telegram").default);
Vue.component("instagram_post", require("./components/step_form/instagram_post").default);
Vue.component("instagram_story", require("./components/step_form/instagram_story").default);
Vue.component("checkout", require("./components/step_form/checkout").default);
Vue.component("channels", require("./components/step_form/channels").default);
Vue.component("login", require("./components/login/loginForm").default);
Vue.component("register", require("./components/login/registerForm").default);
Vue.component("entrance", require("./components/login/uerEnterance").default);
Vue.component("media", require("./components/publisher/mediaAdventure").default);
Vue.component("PublisherCart", require("./components/publisher/PublisherCart").default);

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

Vue.filter("currency",(x)=>{
    return  x ? new Intl.NumberFormat('en-US', {style: 'decimal'}).format(x) : "-";
});

export const Bus = new Vue({
    data() {
        return {
            debug: true,
        }
    }
});

const app = new Vue({
    el: "#step_form"
});

