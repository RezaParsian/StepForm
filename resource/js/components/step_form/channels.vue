<template>
    <div id="vue_channels" class="position-relative" style="max-height: 98rem;overflow: scroll !important;">
        <div class="row mx-auto">
            <div>
                <button
                        type="button"
                        id="filter_btn"
                        data-target="#filters" data-toggle="modal"
                        class="btn position-fixed btn-primary text-muted text-decoration-none rounded-circle mr-3 my-2"
                        style="z-index: 15">
                    <i class="fa fa-filter text-white"></i>
                </button>
                <button class="btn rounded-circle bg-primary position-fixed"
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        style="display: none;z-index: 15;left:2rem" id="shop_button">
                    <span class="fa fa-shopping-cart text-white"></span>
                </button>
                <div id="filters" class="my-4 mx-auto modal fade" tabindex="-1" role="dialog"
                     labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">فیلترها</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <div id="post" class="row mx-auto" v-show="this.content === 'پست'">
                                    <div class="col-md">
                                        <p>حداکثرقیمت پست:</p>
                                        <div class="row">
                                            <input id="postPriceG" data-variable="postPrice_g" type="range" class="mr-3"
                                                   min="0" max="999999">
                                            <label class="my-auto mx-2 text-info">{{ postPrice_g }}</label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <p for="postPriceL">حداقل قیمت پست:</p>
                                        <div class="row">
                                            <input id="postPriceL" data-variable="postPrice_l" type="range" class="mr-3"
                                                   min="0" max="999999">
                                            <label class="my-auto mx-2 text-info">{{ postPrice_l }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div v-show="this.content !== 'پست'">
                                    <div id="story" class="row mx-auto" v-if="this.content !== 'پست'">
                                        <div class="col-md">
                                            <p for="storyPriceG">حداکثرقیمت استوری:</p>
                                            <div class="row">
                                                <input id="storyPriceG" data-variable="storyPrice_g" class="mr-3"
                                                       type="range" min="0" max="9999999">
                                                <label class="my-auto mx-2 text-info">{{ storyPrice_g }}</label>
                                            </div>
                                        </div>
                                        <div class="col-md">
                                            <p for="postPriceL">حداقل قیمت استوری:</p>
                                            <div class="row">
                                                <input id="storyPriceL" class="mr-3" data-variable="storyPrice_l"
                                                       type="range" min="0" max="9999999">
                                                <label class="my-auto mx-2 text-info">{{ storyPrice_l }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="follower" class="row mx-auto pb-3">
                                    <div class="col-md">
                                        <p for="minFollow">حداکثرتعداد فالوور:</p>
                                        <div class="row">
                                            <input id="minFollow" class="mr-3" data-variable="minFollower" type="range"
                                                   min="0" max="9999999">
                                            <label class="my-auto mx-2 text-info">{{ minFollower }}</label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <p for="maxFollow">حداقل تعداد فالوور:</p>
                                        <div class="row">
                                            <input id="maxFollow" class="mr-3" type="range" data-variable="maxFollower"
                                                   min="0" max="9999999">
                                            <label class="my-auto mx-2 text-info">{{ maxFollower }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div id="eng" class="row mx-auto pb-3 mb-5">
                                    <div class="col-md">
                                        <p for="min-Eng">حداکثر نرخ تعامل:</p>
                                        <div class="row">
                                            <input id="min-Eng" class="mr-3" data-variable="eng_l" type="range" min="0" max="30" step="0.1">
                                            <label class="my-auto mx-2 text-info">{{ eng_l }}</label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <p for="max-Eng">حداقل نرخ تعامل:</p>
                                        <div class="row">
                                            <input id="max-Eng" class="mr-3" type="range" data-variable="eng_g" min="0" max="30" value="0" step="0.1">
                                            <label class="my-auto mx-2 text-info">{{ eng_g }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">بستن</button>
                                    <button type="button" class="btn btn-danger" @click="clearFilters">حذف فیلتر</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-group col-md-3 ml-auto my-3 pl-5">
                <input class="form-control border-end-0 border rounded-pill" type="text" @keypress.enter.prevent="searchForm" value="search" id="example-search-input" name="search"
                       v-model="search" placeholder="جستجو کنید">
                <span class="input-group-append">
                <button class="btn btn-outline-primary bg-white border-start-0 border rounded-pill ms-n3" type="button" @click="searchForm">
                    <i class="fa fa-search text-primary"></i>
                </button>
            </span>
            </div>
        </div>

        <input type="hidden" name="channels[]" v-for="item in selected.map((x) => x.id)" :value="item" :key="item">

        <div class="row mx-auto justify-content-center" id="gap">
            <div class="card col-md-3 p-0" v-for="channel in channels" :key="channel.username" :id="channel.id">
                <div class="banner">
                    <img :src="channel.pic" class="svg" alt="">
                </div>
                <div class="menu">
                </div>
                <h2 class="name" style="font-size: 15pt">{{ channel.name }}</h2>
                <div class="title">@{{ channel.username }}</div>
                <div class="actions">
                    <div class="follow-info">
                        <h2 style="font-size: 13pt"><a href="#"><span>{{ channel.eng }}</span><small>نرخ
                            تعامل</small></a></h2>
                        <h2 style="font-size: 13pt"><a href="#"><span>{{
                                channel.following
                            }}</span><small>Following</small></a></h2>
                    </div>
                    <div class="small text-muted mb-2 text-center">آخرین بروزرسانی : {{ channel.last_update }}</div>
                    <div class="small text-muted mb-2 text-center" v-html="getPrice(channel)"></div>
                    <div class="follow-btn">
                        <button :data-id="channel.id"
                                @click="select"
                                type="button"
                                :data-post="channel.post_price"
                                :data-story="channel.story_price"
                                :key="channel.id">
                            انتخاب
                        </button>
                    </div>
                </div>
            </div>

            <h1 class="text-center text-muted" v-if="channels.length <= 0">هیچ رسانه‌ای یافت نشد!</h1>
        </div>

        <!-- Modal -->
        <div v-model="filterFollowers" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">کانال های منتخب شما</h5>
                    </div>
                    <div class="modal-body">
                        <div class="col-md-12 p-4 justify-content-center table-responsive-sm" id="basket">
                            <table class="table table-bordered text-center table-hover table-striped">
                                <thead>
                                <tr class="text-center">
                                    <th scope="col">شناسه</th>
                                    <th scope="col">تصویر پروفایل</th>
                                    <th scope="col">نام فارسی</th>
                                    <th scope="col">نام کاربری</th>
                                    <th scope="col">وضعیت</th>
                                    <th scope="col">فالویینگ</th>
                                    <th scope="col">فالوور</th>
                                    <th scope="col">تعداد پست</th>
                                    <th scope="col">نرخ تعامل</th>
                                    <th scope="col">نوع</th>
                                    <th scope="col">تعرفه</th>
                                    <th scope="col">تاریخ آخرین تغییر</th>
                                    <th scope="col">عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="items  in selected" :key="items.username" :id="items.id">
                                    <td scope="row">{{ items.id }}</td>
                                    <td>
                                        <img :src="items.pic" class="img-fluid" style="width: 60%;height:50%"/>
                                    </td>
                                    <td>{{ items.name ? items.name : 'موجود نیست' }}</td>
                                    <td>{{ items.username ? items.username : 'موجود نیست' }}</td>
                                    <td>تایید شده</td>
                                    <td>{{ items.following ? items.following : 'موجود نیست' }}</td>
                                    <td>{{ items.followers ? items.followers : 'موجود نیست' }}</td>
                                    <td>موجود نیست</td>
                                    <td>{{ items.eng ? items.eng : 'موجود نیست' }}</td>
                                    <td>{{ items.type ? items.type : 'موجود نیست' }}</td>
                                    <td v-html="getPriceTable(items)"></td>
                                    <td>{{ items.last_update ? items.last_update : 'موجود نیست' }}</td>
                                    <td>
                                        <button type="button" class="btn fa fa-trash-o btn-danger"
                                                :data-id="items.id" @click="select" :data-post="items.post_price"
                                                :data-story="items.story_price">
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">بستن</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Button trigger modal -->

        <!-- Modal for increase budget -->
        <div class="modal fade" id="increaseBudget" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">افزایش موجودی</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <budget></budget>
                    </div>
                    <div class="modal-footer" style="border-top: none!important;">
                        <button type="button" class="btn btn-success" data-dismiss="modal">ثبت تغییرات</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row p-5 mx-auto" v-model="request">
            <div id="reza" class="mx-auto p-5" :class="grow"></div>
        </div>
    </div>
</template>

<script>
import {Bus} from './../../app.js';

export default {
    name: "channels",
    props: {
        province: {
            require: true,
            type: Array,
        },
        categories: {
            require: true,
            type: Array,
        },
        types: {
            require: true,
            type: String,
        },
        budget: {
            default: ''
        },
        content: {
            default: ''
        },
        step: {
            type: Number
        }
    },
    data() {
        return {
            channels: [],
            page: 0,
            grow: "",
            search: "",
            selected: [],
            minFollower: 0,
            maxFollower: 0,
            postPrice_g: 0,
            postPrice_l: 0,
            storyPrice_l: 0,
            eng_l: 0,
            eng_g: 0,
            storyPrice_g: 0,
            new_budget: 0,
            sumPrice: 0,
            timeOut: null
        }
    },
    methods: {
        searchForm() {
            observer.unobserve($("#reza")[0]);
            this.channels = [];
            this.page = 1;
            this.getChannels()
        },
        getChannels() {
            let data = Object.entries({
                category: this.categories,
                page: this.page,
                post_l: this.postPrice_l,
                post_g: this.postPrice_g,
                story_g: this.storyPrice_g,
                story_l: this.storyPrice_l,
                follower_g: this.maxFollower,
                follower_l: this.minFollower,
                eng_l: this.eng_l,
                eng_g: this.eng_g,
                type: this.types.toUpperCase() === "" ? "INSTAGRAM" : this.types.toUpperCase(),
                q: this.search,
            });

            data = Object.fromEntries(data.filter(([key, value]) => {
                return value != 0 || value != "";
            }));

            if (this.province.length < 31)
                data.province = this.province.map((x) => x.name);

            this.grow = "spinner-grow";

            clearTimeout(this.timeOut);

            this.timeOut = setTimeout(() => {
                $.post("https://advn.ad-venture.app/api/publisher", data, (data) => {
                    this.channels = this.channels.concat(data);
                    this.grow = "";
                    if (data.length > 0)
                        observer.observe($("#reza")[0])
                });
            }, 1000)
        },

        getPrice(channel) {
            const price = this.content === "پست" ? channel.post_price : channel.story_price;
            return `هزینه تبلیغات : ${price ?? 'موجود نیست'}`;
        },
        getPriceTable(channel) {
            const price = this.content === "پست" ? channel.post_price : channel.story_price;
            return ` ${price ?? 'موجود نیست'}`;
        },

        lowBudget(post_price, story_price, selected) {
            if (this.new_budget <= 0) {
                Swal.fire({
                    title: 'خطا',
                    text: 'لطفا بودجه خود را افزایش دهید.',
                    icon: 'error',
                    allowOutsideClick: true,
                    confirmButtonText: 'تایید'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#increaseBudget').modal('show')

                    }
                });
                return true;
            }

            if (this.new_budget < post_price || this.new_budget < story_price) {
                Swal.fire({
                    title: 'خطا',
                    text: 'بودجه شما از حد موردنظر کمتر است.',
                    icon: 'error',
                    confirmButtonText: 'تایید',
                    allowOutsideClick: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#increaseBudget').modal('show')

                    }
                });
                return true;
            }

            if (selected) {
                this.new_budget = this.new_budget + (this.content === "پست" ? post_price : story_price);
            } else {

                this.new_budget = this.new_budget - (this.content === "پست" ? post_price : story_price);
                this.sumPrice = this.sumPrice + (this.content === "پست" ? post_price : story_price);
            }

            return false;
        },

        select(element) {
            const post_price = $(element.target).data("post");
            const story_price = $(element.target).data("story");
            const selected = this.selected.find((x) => x.id === +element.target.dataset.id);

            if (this.lowBudget(post_price, story_price, selected))
                return;

            if (selected) {
                this.selected.splice(this.selected.indexOf(this.selected.find((x) => x.id === +element.target.dataset.id)), 1);
                element.target.innerText = "انتخاب";
                $("[data-id='" + element.target.dataset.id + "']"[1]).text("انتخاب");
                this.sumPrice = this.sumPrice - (this.content === "پست" ? post_price : story_price);
            } else {
                this.selected.push(this.channels.find((x) => x.id === +element.target.dataset.id));
                element.target.innerText = "لغو انتخاب";
            }
        },
        checkData() {
            this.$emit("go_next", this.selected.length > 1);
        },
        clearFilters() {
            this.eng_g = 0;
            this.eng_l = 99999999;
            this.minFollower = 99999999;
            this.maxFollower = 0;
            this.postPrice_g = 0;
            this.postPrice_l = 99999999;
            this.storyPrice_l = 99999999;
            this.storyPrice_g = 0;
            this.page = 0;
            this.channels = [];
            this.getChannels();
        },
    },
    watch: {
        page() {
            if (this.page > 0)
                this.getChannels();
        },
        budget() {
            this.new_budget = +(this.budget.replaceAll(",", ""));
        },
        step(val) {
            if (val === 5) {
                $("head").append("<style id='rp_stack'>*{overflow: unset}</style>");
                filter_observer.observe($("#filter_btn")[0]);
            } else {
                $("head").find("#rp_stack").remove();
                $("#shop_button").hide(500);
                $("#up_button").hide(500);
                filter_observer.unobserve($("#filter_btn")[0]);
            }
        },
        selected(val) {
            if (val.length > 0)
                $("#shop_button").show(500);
            else
                $("#shop_button").hide(500);
        },
        new_budget(val) {
            Bus.$emit("new_budget", val);
        },
        sumPrice(val) {
            Bus.$emit("sumPrice", val);
        }
    },
    computed: {
        request() {
            if ((this.province !== [] && this.categories !== [] && this.types !== "") && this.selected.length <= 0) {
                this.page = 1;
                this.selected = [];
                this.channels = [];

                observer.observe($("#reza")[0])
            }

            if ((this.province !== [] && this.categories !== [] && this.types !== "") && this.step == 5)
                this.checkData();

            return [
                this.province,
                this.categories,
                this.types,
            ];
        },
        filterFollowers() {
            if (this.step !== 5)
                return;

            this.$nextTick(() => {
                this.page = 0;
                this.channels = [];
                observer.observe($("#reza")[0])
            });

            return [
                this.minFollower,
                this.maxFollower,
                this.postPrice_g,
                this.postPrice_l,
                this.storyPrice_g,
                this.storyPrice_l,
                this.eng_l,
                this.eng_g,
            ];
        },


    },
    mounted() {
        window.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.page++;
                    observer.unobserve($("#reza")[0])
                }
            })
        });

        window.filter_observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting)
                    $("#up_button").hide(500);
                else
                    $("#up_button").show(500);

            })
        });

        $("#minFollow").val(this.minFollower).trigger("change")
        $("#storyPriceL").val(this.storyPrice_l).trigger("change")
        $("#postPriceL").val(this.postPrice_l).trigger("change")
        $('#min-Eng').val(this.eng_l).trigger("change")

        $("#storyPriceG, #storyPriceL, #minFollow, #maxFollow, #postPriceG ,#postPriceL,#min-Eng,#max-Eng").change((element) => {
            this[element.target.dataset.variable] = element.target.value;
        });
    },
}
</script>

<style scoped>
#gap {
    gap: 0.5rem;
}

.card {
    background-color: #fff;
    max-width: 259px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 2rem;
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.5);
    max-height: 32rem;
}

.card .banner {
    background-image: url("https://advn.ad-venture.app/img/social_back.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 11rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    box-sizing: border-box;
}

.card .banner .svg {
    background-color: #fff;
    width: 8rem;
    height: 8rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    transform: translateY(50%);
    transition: transform 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.card .banner .svg:hover {
    transform: translateY(50%) scale(1.3);
}

.card .menu {
    width: 100%;
    height: 5.5rem;
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
    box-sizing: border-box;
}

.card .menu .opener {
    width: 2.5rem;
    height: 2.5rem;
    position: relative;
    border-radius: 50%;
    transition: background-color 100ms ease-in-out;
}

.card .menu .opener:hover {
    background-color: #f2f2f2;
}

.card .menu .opener span {
    background-color: #404040;
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 0;
    left: calc(50% - 0.2rem);
    border-radius: 50%;
}

.card .menu .opener span:nth-child(1) {
    top: 0.45rem;
}

.card .menu .opener span:nth-child(2) {
    top: 1.05rem;
}

.card .menu .opener span:nth-child(3) {
    top: 1.65rem;
}

.card h2.name {
    text-align: center;
    padding: 0 2rem 0.5rem;
    margin: 0;
}

.card .title {
    color: #a0a0a0;
    font-size: 0.85rem;
    text-align: center;
    padding: 0 2rem 1.2rem;
}

.card .actions {
    padding: 0 2rem 1.2rem;
    display: flex;
    flex-direction: column;
    order: 99;
}

.card .actions .follow-info {
    padding: 0 0 1rem;
    display: flex;
}

.card .actions .follow-info h2 {
    text-align: center;
    width: 50%;
    margin: 0;
    box-sizing: border-box;
}

.card .actions .follow-info h2 a {
    text-decoration: none;
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.8rem;
    transition: background-color 100ms ease-in-out;
}

.card .actions .follow-info h2 a span {
    color: #1c9eff;
    font-weight: bold;
    transform-origin: bottom;
    transform: scaleY(1.3);
    transition: color 100ms ease-in-out;
}

.card .actions .follow-info h2 a small {
    color: #afafaf;
    font-size: 0.85rem;
    font-weight: normal;
}

.card .actions .follow-info h2 a:hover {
    background-color: #f2f2f2;
}

.card .actions .follow-info h2 a:hover span {
    color: #007ad6;
}

.card .actions .follow-btn button {
    color: inherit;
    font: inherit;
    font-weight: bold;
    background-color: #847692;
    color: whitesmoke;
    width: 100%;
    border: none;
    padding: 1rem;
    outline: none;
    box-sizing: border-box;
    border-radius: 1.5rem/50%;
    transition: background-color 100ms ease-in-out, transform 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.card .actions .follow-btn button:hover {
    background-color: rebeccapurple;
    transform: scale(1.1);
}

.card .actions .follow-btn button:active {
    background-color: rebeccapurple;
    transform: scale(1);
}

.card .desc {
    text-align: justify;
    padding: 0 2rem 2.5rem;
    order: 100;
}
</style>
