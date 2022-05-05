window.$=window.jQuery=require("jquery");
const Vue = require("vue").default;
require("select2");
require("bootstrap-v4-rtl");
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

const app=new Vue({
    el: "#step_form"
});