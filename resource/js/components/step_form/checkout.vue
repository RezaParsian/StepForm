<template>
    <div>
        <div class="row mx-auto">
            <div class="col-md-7 p-0">
                <div class="col-md rounded border">
                    <div class="row border-bottom px-3 pt-2">
                        <h6 class="text-muted">مشخصات کمپین</h6>
                    </div>
                    <div class="form-group">
                        <label>نام کمپین</label>
                        <input type="text" v-model="name" name="camping_name" class="form-control">
                    </div>

                    <div class="alert alert-info">
                        <div class="row">
                            <div class="col-md-1 d-flex">
                                <strong class="my-auto"><i class="fa fa-info-circle fa-2x"></i></strong>
                            </div>
                            <div class="col-md d-flex">
                                <p class="my-auto">به زودی کارشناسان جهت هماهنگی و راهنمایی با شما تماس خواهند گرفت</p>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row mx-auto justify-content-around">
                        <input type="hidden" name="strat_time" v-model="start_time">
                        <input type="hidden" name="end_time" v-model="end_time">
                        <datePicker placeholder="زمان شروع" v-model="start_time"/>
                        <datePicker placeholder="زمان پایان" v-model="end_time"/>
                    </div>

                    <div class="form-group">
                        <label>ملاحظات انتشار</label>
                        <textarea v-model="description" name="description" class="form-control" rows="3"></textarea>
                    </div>
                </div>

                <div class="col-md rounded border mt-2">
                    <div class="row border-bottom px-3 pt-2">
                        <h6 class="text-muted">جزئیات کمپین</h6>
                    </div>
                    <div class="row p-3">
                        <div class="col-md text-center">
                            <p class="font-weight-light">شبکه اجتماعی: <strong class="font-weight-bold">{{ social }}</strong></p>
                        </div>
                        <div class="col-md text-center">
                            <p class="font-weight-light">نوع کمپین: <strong class="font-weight-bold">{{ camping }}</strong></p>
                        </div>
                    </div>

                    <div class="row p-3">
                        <div class="col-md text-center">
                            <p class="font-weight-light">بودجه: <strong class="font-weight-bold">{{ budget }}</strong></p>
                        </div>
                        <div class="col-md text-center">
                            <p class="font-weight-light">نوع محتوا: <strong class="font-weight-bold">{{ content }}</strong></p>
                        </div>
                    </div>

                </div>

            </div>
            <div id="show_here" class="col-md">

            </div>
        </div>
    </div>
</template>

<script>

import {Bus} from "../../app";

export default {
    name: "checkout",
    props: {
        social: {
            default: ''
        },
        camping: {
            default: ''
        },
        budget: {
            default: ''
        },
        content: {
            default: ''
        },
    },
    data() {
        return {
            start_time: null,
            end_time: null,
            name: "",
            description: ""
        }
    },
    watch: {
        start_time(val) {
            Bus.$emit("state", "checkout_start_time", val);
        },
        end_time(val) {
            Bus.$emit("state", "checkout_end_time", val);
        },
        name(val) {
            Bus.$emit("state", "checkout_name", val);
        },
        description(val) {
            Bus.$emit("state", "checkout_description", val);
        },
    },
    mounted() {
        Bus.$on("checkout_name", (value) => {
            this.name = value;
        });
        Bus.$on("checkout_start_time", (value) => {
            this.start_time = value;
        });
        Bus.$on("checkout_end_time", (value) => {
            this.end_time = value;
        });
        Bus.$on("checkout_description", (value) => {
            this.description = value;
        });
    }
}
</script>

<style>
.vpd-icon-btn {
    height: 2.3rem !important;
}
</style>
