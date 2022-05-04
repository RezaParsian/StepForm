window.$=window.jQuery=require("jquery");
const Vue = require("vue").default;
require("bootstrap-v4-rtl");
require("./custom");


Vue.component("main_form", require("./components/Main").default);
Vue.component("iran", require("./components/Iran").default);

const app=new Vue({
    el: "#step_form"
});