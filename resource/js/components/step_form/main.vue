<template>
    <div id="vue_main" class="card" @keypress.enter.stop>
        <div class="card-header sticky-top bg-white d-flex">
            ساخت کمپین جدید
            <div class="mr-auto">

                <button class="btn rounded-circle bg-primary" type="button" onclick='$("#gap")[0].scrollIntoView()' style="display: none" id="up_button">
                    <span class="fa fa-chevron-up"></span>
                </button>
            </div>
        </div>
        <div class="card-body">
            <div class="row d-none d-md-flex text-center mt-2">
                <div class="col steps" :class="{
                    'current' : current_step===item.id,
                    'finish':current_step>item.id,
                    'inactive':current_step!==item.id
                }" v-for="item in steps" :id="item.id" :key="item.name" @click="current_step=item.id">
                    {{ item.name }}
                </div>
            </div>

            <hr class="d-none d-md-block">

            <!-- Step 0 - Start -->
            <div v-show="current_step===0">
                <p class="text-justify">
                    <slot></slot>
                </p>
                <start @go_next="nextStep" :attract_active="attract_active" :order_active="order_active" v-model="startModel" ref="start"></start>
            </div>

            <!--  Step 1 - Map    -->
            <div v-show="current_step===1">
                <div class="row justify-content-center mb-3">
                    <button class="btn mx-3 px-5" :class="selectedPlaceButton==='county' ? 'btn-success' : 'btn-outline-success'" @click="selectAllCity" type="button">کشوری</button>
                    <button
                        class="btn mx-3 px-5"
                        :class="selectedPlaceButton==='city' ? 'btn-success' : 'btn-outline-success'"
                        @click="selectNoneCity"
                        title="بر روی استان های مدنظر خود کلیک کنید."
                        data-toggle="tooltip"
                        type="button">
                        استانی
                    </button>
                </div>

                <div class="row text-center justify-content-center">
                    <iran ref="iran" v-model="province" @go_next="nextStep"></iran>
                </div>
            </div>

            <!--  Step 2 - Advertise -->
            <div v-show="current_step===2">
                <advertise @go_next="nextStep" ref="advertise"></advertise>
            </div>

            <!--  Step 3 - Budget -->
            <div v-show="current_step===3">
                <budget :budget="budget" :budget_description="budget_description" @go_next="nextStep" ref="budget"></budget>
            </div>

            <!--  Step 3 - SocialMedia -->
            <div v-show="current_step===4">
                <social-media v-model="socialModel" @go_next="nextStep" ref="social-media"></social-media>
            </div>

            <!--  Step 5 - channels -->
            <div v-show="current_step===5">
                <channels @go_next="nextStep" :step="current_step" :budget="budget" :types="social" :province="province" :content="content" :categories="categories" ref="channels"></channels>
            </div>

            <!--  Step 6 - Checkout -->
            <div v-show="current_step===6">
                <checkout @go_next="nextStep" :social="social" :camping="camping" :budget="budget" :content="content" ref="checkout"></checkout>
            </div>

            <div v-show="current_step===5">
                <hr>

                <div class="row my-3 mx-auto">
                    <p class="text-right" style="font-size:12pt">موجودی : {{ new_budget | currency }}</p>
                    <p class="ml-auto pl-5" style="font-size:12pt">هزینه: {{ sumPrice | currency }}</p>
                </div>
            </div>

            <button type="button" v-if="next_step && current_step<6" @click="next" class="btn btn-grad float-left">
                مرحله بعد
                <i class="fa fa-caret-left"></i>
            </button>

            <button type="button" v-if="current_step>0" @click="goBack" class="btn btn-grad float-right">
                <i class="fa fa-caret-right"></i>
                مرحله قبل
            </button>

            <button type="submit" @click="form" class="btn btn-success mr-auto mt-2 float-left" style="margin: 10px" v-if="current_step===6">تایید و ثبت</button>
        </div>
    </div>
</template>

<script>
import {Bus} from "../../app.js";

export default {
    name: "Main",
    props: {
        budget_description: {
            required: false,
            type: Array,
        },
        attract_active: {
            required: true,
            type: Boolean
        },
        order_active: {
            required: true,
            type: Boolean
        },
    },
    data() {
        return {
            next_step: false,
            selectedPlaceButton: null,
            social: "",
            camping: "",
            budget: 0,
            content: "",
            new_budget: 0,
            sumPrice: 0,
            categories: [],
            province: [],
            current_step: 0,
            cache: false,
            state: {},
            steps: [
                {
                    id: 0,
                    name: "شروع",
                    component: "start"
                },
                {
                    id: 1,
                    name: "موقعیت جغرافیایی تبلیغ",
                    component: "iran"
                },
                {
                    id: 2,
                    name: "نوع تبلیغ",
                    component: "advertise"
                },
                {
                    id: 3,
                    name: "بودجه",
                    component: "budget"
                },
                {
                    id: 4,
                    name: "شبکه اجتماعی",
                    component: "social-media"
                },
                {
                    id: 5,
                    name: "کانال ها",
                    component: "channels"
                },
                {
                    id: 6,
                    name: "تایید",
                    component: "checkout"
                }
            ],
            post_price: 0,
            story_price: 0,
        };
    },
    methods: {
        form() {
            localStorage.removeItem("form");
            Swal.fire({
                title: "لطفا منتظر بمانید",
                text: "درخواست شما در حال بررسی می‌باشد.",
                icon: "info",
                showConfirmButton: false,
                toast: true,
                timerProgressBar: true,
                timer: 3000
            });

            Swal.showLoading();
        },
        goBack() {
            scrollTo(0, 0);
            this.current_step--;
            this.$refs[this.steps[this.current_step].component].checkData();
        },
        next() {
            scrollTo(0, 0);
            this.current_step++;
            this.nextStep(false);
            this.$refs[this.steps[this.current_step].component].checkData();
        },
        nextStep(condition) {
            this.next_step = this.current_step != 6;
            // this.next_step = condition;
        },
        selectAllCity() {
            this.selectedPlaceButton = "county"
            $("[id^='svg'][fill='#df93a1']").each((index, item) => {
                this.$refs.iran.select({target: item});
            });
        },
        selectNoneCity() {
            this.selectedPlaceButton = "city"
            $("[id^='svg'][fill='#008400']").each((index, item) => {
                $(item).trigger("hover")
                this.$refs.iran.select({target: item});
            });
        },
        setForm(value) {
            const fields = JSON.parse(value);
            this.state=fields;

            Object.entries(fields).forEach(([index, item]) => {
                Bus.$emit(index, item);
            })

            setTimeout(() => {
                this.cache = true;
            }, 5000)
        }
    },
    watch: {
        current_step(current) {
            $(".steps").addClass("inactive");

            for (let i = 0; i < current; i++) {
                $(`#${i}`).removeClass("inactive")
            }

            if (current === 6) {
                $("#show_here").html($("#preview_section").html()).find("[class^='carousel-control']").remove();
            }
        }
    },
    computed: {
        socialModel: {
            get() {
                return [
                    this.social,
                    this.content
                ];
            },
            set(value) {
                this.social = value[0];
                this.content = value[1];
            }
        },
        startModel: {
            get() {
                return [
                    this.camping,
                    this.categories
                ];
            },
            set(value) {
                this.camping = value[0];
                this.categories = value[1];
            }
        }
    },
    mounted() {
        this.current_step = 0;
        this.$refs.iran.$watch("selected", () => {
            if (this.$refs.iran.selected.length < 31)
                this.selectedPlaceButton = "city";
        });

        Bus.$on("changeBudget", (budget) => {
            this.budget = budget;
        });
        Bus.$on('new_budget', (budget) => {
            this.new_budget = budget;
        });
        Bus.$on('sumPrice', (sumPrice) => {
            this.sumPrice = sumPrice;
        });
        Bus.$on("state", (name, value) => {
            this.state[name] = value;
            if (this.cache)
                localStorage.setItem("form", JSON.stringify(this.state));
        });

        this.$nextTick(function () {
            if (Boolean(localStorage.getItem("form")))
                this.setForm(localStorage.getItem("form"));
            else
                this.cache = true;
        })
    }
}
</script>

<style scoped>

.steps.finish::before {
    content: "";
    width: 1rem;
    height: 1rem;
    display: block;
    background: #447fbd !important;
    border-radius: 100%;
    position: absolute;
    left: calc(50% - 0.5rem);
    top: -1rem;
}

.steps.current::before {
    content: "";
    width: 1rem;
    height: 1rem;
    display: block;
    background: #e1236f;
    border-radius: 100%;
    position: absolute;
    left: calc(50% - 0.5rem);
    top: -1rem;
}

.steps.inactive::before {
    content: "";
    width: 1rem;
    height: 1rem;
    display: block;
    background: #eeb919;
    border-radius: 100%;
    position: absolute;
    left: calc(50% - 0.5rem);
    top: -1rem;
}

.card {
    box-shadow: 20px 20px 50px 10px #8080805c;
    border: none;
}


.btn-grad {
    background-image: linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%);
    margin: 10px;
    padding: auto 15px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    display: block;
}

.btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}
</style>
