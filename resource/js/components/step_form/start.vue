<template>
    <div id="vue_start">
        <div class="form-group">
            <label> دسته‌بندی کسب و‌ کار شما</label>
            <select name="work_category[]" class="form-control" id="work_category" multiple="">
                <option v-for="item in work_category.filter((x)=> x.category_isActive===1)" :value="item.id">{{ item.category_name }}</option>
            </select>
        </div>


        <div v-if="selected_category.length>0" class="alert alert-info">
            <div class="row">
                <div class="col-md-1 d-flex">
                    <strong class="my-auto mx-auto"><i class="fa fa-info-circle fa-2x"></i></strong>
                </div>
                <div class="col-md d-flex">
                    <ol>
                        <li v-for="item in selected_category.filter((x)=> x.category_discription!='' && x.category_discription!=null)">{{ item.category_name }}: {{ item.category_discription }}</li>
                    </ol>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label> هدف کمپین</label>
            <select name="campaign_goal" class="form-control" id="campaign_goal">
                <option v-for="item in campaign_goal" :value="item.id">{{ item.name }}</option>
            </select>
        </div>
        <div class="form-group" v-if="attract_active">
            <label> نوع جذب</label>
            <select name="attraction_way" class="form-control" id="attraction_way">
                <option value="">یک روش انتخاب کنید</option>
                <option v-for="item in attractionWay" :value="item.attraction">{{ item.attraction }}</option>
            </select>
        </div>
        <div class="form-group" v-if="order_active">
            <label>نحوه سفارش</label>
            <select name="order_way" class="form-control" id="order_way">
                <option value="">یک روش انتخاب کنید</option>
                <option v-for="item in orderWay" :value="item.way">{{ item.way }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import {Bus} from "../../app";

export default {
    name: "Start",
    props: {
        value: {
            required: true
        },
        order_active: {
            default: true,
            type: Boolean
        },
        attract_active: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            selected_category: [],
            work_category: [],
            selected_work: null,
            campaign_goal: [
                {id: "", name: "یک هدف انتخاب فرمایید"},
                {id: "آگاهی از برند", name: "آگاهی از برند"},
                {id: "فروش محصول", name: "فروش محصول"},
                {id: "جمع آوری لید", name: "جمع آوری لید"},
                {id: "افزایش فالور", name: "افزایش فالور"},
                {id: "دانلود یا نصب", name: "دانلود یا نصب"},
                {id: "دیگر", name: "دیگر"},
            ],
            orderWay: [
                {way: "تماس با تلفن شرکت"},
                {way: "تماس با بخش فروش"},
                {way: " سفارش از طریق سایت"},
                {way: "سفارش از طریق تلگرام"},
                {way: "سفارش از طریق اینستا"},
                {way: "سفارش از طریق لینکدین"}
            ],
            attractionWay: [
                {attraction: "بازاریابی تیم فروش"},
                {attraction: "تماس با ادونچر"},
                {attraction: "معرفی سایر مشتریان"},
                {attraction: "ارتباطات اعضای شرکت"},
            ]
        }
    },
    methods: {
        checkData() {
            const $work_category = $("#work_category");
            const $vusStart = $("#vue_start");

            this.selected_category = this.work_category.filter((x) => $work_category.val().indexOf(x.id + '') > -1);
            this.$emit("input", [
                $vusStart.find("#campaign_goal").find(":selected").text(),
                $vusStart.find("#work_category").val()
            ])
            this.$emit("go_next", $("#campaign_goal").val() != 0 && $work_category.val() != 0);
        }
    },
    mounted() {
        Bus.$on("work_category[]", (value) => {
            this.selected_work = value;
        });

        Bus.$on("campaign_goal", (value) => {
            $("[name='campaign_goal']").val(value).trigger("change");
        });

        this.$nextTick(() => {
            $("#vue_start").find("select").select2({
                placeholder: "انتخاب کنید",
                dir: "rtl",
                closeOnSelect: false,
                width: "100%",
            });
        });

        $("#vue_start").find("select").on("change", function (e) {
            Bus.$emit("state", e.target.name, $(e.target).val())
            this.checkData();
        }.bind(this));

        this.$nextTick(this.checkData);

        $.get("https://advn.ad-venture.app/api/cats", (data) => {
            this.work_category = data;

            this.$nextTick(() => {
                if (this.selected_work)
                    $("[name='work_category[]']").val(this.selected_work).trigger("change");
            });
        });
    }
}
</script>

<style>
.select2-selection__choice__display {
    color: #2592c3 !important;
}
</style>
