<template>
    <div id="vue_advertise" class="row mx-auto justify-content-center">
        <input type="hidden" name="advertise_type">
        <div
            class="position-relative overflow-hidden col-md-4 rounded border m-1 p-2"
            v-for="item in advertise_items"
            :data-id="item.id"
            @click="selectAdvertise(item.id)">
            <!--      <p v-if="item.is_new" class="position-absolute bg-danger new">جدید</p>-->
            <h5 class="text-center my-3">{{ item.name }}</h5>
            <p class="font-weight-light mt-3">{{ item.description }}</p>
        </div>
    </div>
</template>

<script>
import {Bus} from "../../app";

export default {
    name: "Advertise",
    data() {
        return {
            selected_advertise: null,
            advertise_items: [
                {
                    id: 0,
                    name: "بازدیدی",
                    description: "فقط به اندازه‌ای که تبلیغ‌تان در پیج‌های مختلف بازدید خواهد داشت هزینه پرداخت کنید نه بیشتر!",
                    tooltip: "با کمپین‌های جدید بازدیدی جریان، تا ۷۰ درصد هزینه کمتری نسبت به کمپین‌های تعرفه‌ای داشته باشید!",
                    is_new: true
                },
                {
                    id: 1,
                    name: "اینفلوئنسری و تعرفه‌ای",
                    description: "اگر می‌خواهید تبلیغات اینفلوئنسری داشته باشید یا مشخصا فقط در پیج‌های غیراینفلوئنسری مورد نظرتان تبلیغ انجام دهید این نوع کمپین مناسب شماست!",
                    tooltip: "",
                    is_new: false
                },
            ],
        }
    },
    watch: {
        selected_advertise(new_advertise) {
            Bus.$emit("state", "selected_advertise", new_advertise);
            const $selector = $("#vue_advertise");
            $selector.find(`[data-id]`).removeClass("border-success selected");
            $selector.find(`[data-id='${new_advertise}']`).addClass("border-success selected");
            $(`input[name='advertise_type']`).val(this.advertise_items[new_advertise].name);
            this.checkData();
        },
    },
    methods: {
        checkData() {
            // this.$emit("go_next", $(`input[name='advertise_type']`).val() != "");
            this.$emit("go_next", true);
        },
        selectAdvertise(advertise_id) {
            this.selected_advertise = advertise_id;
        }
    },
    mounted() {
        Bus.$on("selected_advertise", (value) => {
            this.selected_advertise = value;
        })
    }
}
</script>

<style scoped>
.selected {
    border-width: 3px !important;
}

/*.new {*/
/*  width: 150px;*/
/*  height: 30px;*/
/*  line-height: 30px;*/
/*  top: 3px;*/
/*  right: -56px;*/
/*  z-index: 2;*/
/*  overflow: hidden;*/
/*  transform: rotate(45deg);*/
/*  border: 1px dashed;*/
/*  box-shadow: 0 0 0 3px #e51f78, 0 21px 5px -18px rgba(0, 0, 0, .6);*/
/*  background-color: rgb(229, 31, 120);*/
/*  text-align: center;*/
/*  color: #fff;*/
/*}*/
</style>
