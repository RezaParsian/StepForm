<template>
    <div id="vue_main" class="card">
        <div class="card-header">
            ساخت کمپین جدید
        </div>
        <div class="card-body">
            <div class="row d-none d-md-flex text-center mt-2">
                <div class="col steps inactive" v-for="item in steps" :id="item.id" :key="item.name">
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
                <budget v-model="budget" :budget_description="budget_description" @go_next="nextStep" ref="budget"></budget>
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

            <hr>

            <button type="button" v-if="next_step" @click="next" class="btn btn-grad float-left">
                مرحله بعد
                <i class="fa fa-caret-left"></i>
            </button>

            <button type="button" v-if="current_step>0" @click="goBack" class="btn btn-grad float-right">
                <i class="fa fa-caret-right"></i>
                مرحله قبل
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Main",
    props: {
        budget_description: {
            required: false,
            type: Array,
        },
        attract_active: {
            required: true,
            type:Boolean
        },
        order_active: {
            required: true,
            type:Boolean
        },
    },
    data() {
        return {
            next_step: false,
            selectedPlaceButton: null,
            social: "",
            camping: "",
            budget: "",
            content: "",
            categories: [],
            province: [],
            current_step: 0,
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
            this.next_step = true;
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
    }
}
</script>

<style scoped>
.steps::before {
    content: "";
    width: 1rem;
    height: 1rem;
    display: block;
    background: rebeccapurple;
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
    background: #847692 !important;
    border-radius: 100%;
    position: absolute;
    left: calc(50% - 0.5rem);
    top: -1rem;
}

.card{
    box-shadow: 20px 20px 50px 10px #8080805c;
    border: none;
}


.btn-grad {
    background-image: linear-gradient(to right, #314755 0%, #26a0da  51%, #314755  100%);
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
