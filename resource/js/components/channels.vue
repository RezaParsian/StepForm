<template>
    <div id="vue_channels" class="position-relative" style="max-height: 98rem;overflow: scroll !important;">
        <a id="filter_btn" href="#filters" data-toggle="collapse" class="btn btn-link text-muted text-decoration-none rounded m-3"><i class="fa fa-filter"></i>
            ‌فیلتر بر اساس
        </a>
        <div id="filters" class="my-4 collapse mx-auto">

            <div id="post" class="row mx-auto" v-show="this.content==='پست'">
                <div class="col-md">
                    <p>حداکثرقیمت پست:</p>
                    <div class="row">
                        <input id="postPriceG" data-variable="postPrice_g" type="range" class="mr-3" min="0" max="999999">
                        <label class="my-auto mx-2 text-info">{{ postPrice_g }}</label>
                    </div>
                </div>
                <div class="col-md">
                    <p for="postPriceL">حداقل قیمت پست:</p>
                    <div class="row">
                        <input id="postPriceL" data-variable="postPrice_l" type="range" class="mr-3" min="0" max="999999">
                        <label class="my-auto mx-2 text-info">{{ postPrice_l }}</label>
                    </div>
                </div>
            </div>

            <div v-show="this.content!=='پست'">
                <div id="story" class="row mx-auto" v-if="this.content!=='پست'">
                    <div class="col-md">
                        <p for="storyPriceG">حداکثرقیمت استوری:</p>
                        <div class="row">
                            <input id="storyPriceG" data-variable="storyPrice_g" class="mr-3" type="range" min="0" max="9999999">
                            <label class="my-auto mx-2 text-info">{{ storyPrice_g }}</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <p for="postPriceL">حداقل قیمت استوری:</p>
                        <div class="row">
                            <input id="storyPriceL" class="mr-3" data-variable="storyPrice_l" type="range" min="0" max="9999999">
                            <label class="my-auto mx-2 text-info">{{ storyPrice_l }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div id="follower" class="row mx-auto pb-3 mb-5">
                <div class="col-md">
                    <p for="minFollow">حداکثرتعداد فالوور:</p>
                    <div class="row">
                        <input id="minFollow" class="mr-3" data-variable="minFollower" type="range" min="0" max="9999999">
                        <label class="my-auto mx-2 text-info">{{ minFollower }}</label>
                    </div>
                </div>
                <div class="col-md">
                    <p for="maxFollow">حداقل تعداد فالوور:</p>
                    <div class="row">
                        <input id="maxFollow" class="mr-3" type="range" data-variable="maxFollower" min="0" max="9999999">
                        <label class="my-auto mx-2 text-info">{{ maxFollower }}</label>
                    </div>
                </div>
            </div>

        </div>

        <input type="hidden" name="channels[]" v-for="item in selected.map((x)=>x.id)" :value="item" :key="item">

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
                        <h2 style="font-size: 13pt"><a href="#"><span>{{ channel.followers }}</span><small>Followers</small></a></h2>
                        <h2 style="font-size: 13pt"><a href="#"><span>{{ channel.following }}</span><small>Following</small></a></h2>
                    </div>
                    <div class="small text-muted mb-2 text-center">آخرین بروزرسانی : {{ channel.last_update }}</div>
                    <div class="small text-muted mb-2 text-center" v-html="getPrice(channel)"></div>
                    <div class="follow-btn">
                        <button :data-id="channel.id" @click="select" type="button" :data-post="channel.post_price" :data-story="channel.story_price">انتخاب</button>
                    </div>
                </div>
            </div>

            <h1 class="text-center text-muted" v-if="channels.length<=0">هیچ رسانه‌ای یافت نشد!</h1>
        </div>

        <!-- Modal -->
        <div v-model="filterFollowers" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">کانال های منتخب شما</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-center" id="basket">
                            <div class="card col-md-3 p-0 mx-1 my-2" v-for="items  in selected" :key="items.username" :id="items.id">
                                <div class="banner">
                                    <img :src="items.pic" class="svg" alt="">
                                </div>
                                <div class="menu">
                                </div>
                                <h2 class="name" style="font-size: 15pt">{{ items.name }}</h2>
                                <div class="title">@{{ items.username }}</div>
                                <div class="actions">
                                    <div class="follow-info">
                                        <h2 style="font-size: 13pt"><a href="#"><span>{{ items.followers }}</span><small>Followers</small></a></h2>
                                        <h2 style="font-size: 13pt"><a href="#"><span>{{ items.following }}</span><small>Following</small></a></h2>
                                    </div>
                                    <div class="small text-muted mb-2 text-center">آخرین بروزرسانی : {{ items.last_update }}</div>
                                    <div class="small text-muted mb-2 text-center" v-html="getPrice(items)"></div>
                                    <div class="follow-btn">
                                        <button :data-id="items.id" @click="select" type="button" :data-post="items.post_price" :data-story="items.post_price">لغو انتخاب</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">بستن</button>
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
            selected: [],
            minFollower: 99999999,
            maxFollower: 0,
            postPrice_g: 0,
            postPrice_l: 99999999,
            storyPrice_l: 99999999,
            storyPrice_g: 0,
            new_budget: 0,
        }
    },
    methods: {
        getChannels() {
            let data = {
                category: this.categories,
                page: this.page,
                post_l: this.postPrice_l,
                post_g: this.postPrice_g,
                story_g: this.storyPrice_g,
                story_l: this.storyPrice_l,
                follower_g: this.maxFollower,
                follower_l: this.minFollower,
                type: this.types.toUpperCase() === "" ? "INSTAGRAM" : this.types.toUpperCase(),
            };

            if (this.province.length < 31)
                data.province = this.province.map((x) => x.name);

            this.grow = "spinner-grow";

            $.post("https://advn.ad-venture.app/api/publisher", data, (data) => {
                this.channels = this.channels.concat(data);
                this.grow = "";
                if (data.length > 0)
                    observer.observe($("#reza")[0])
            });
        },
        getPrice(channel) {
            const price = this.content === "پست" ? channel.post_price : channel.story_price;
            return `هزینه تبلیغات : ${price ?? 'موجود نیست'}`;
        },
        lowBudget(post_price, story_price, selected) {
            if (this.new_budget <= 0) {
                Swal.fire({
                    title: 'خطا',
                    text: 'لطفا بودجه خود را افزایش دهید.',
                    icon: 'error',
                    confirmButtonText: 'تایید'
                });
                return true;
            }

            if (this.new_budget < post_price || this.new_budget < story_price) {
                Swal.fire({
                    title: 'خطا',
                    text: 'بودجه شما از حد موردنظر کمتر است.',
                    icon: 'error',
                    confirmButtonText: 'تایید'
                });
                return true
            }

            if (selected)
                this.new_budget = this.new_budget + (this.content === "پست" ? post_price : story_price);
            else
                this.new_budget = this.new_budget - (this.content === "پست" ? post_price : story_price);

            return false;
        },
        select(element) {
            const post_price = $(element.target).data("post");
            const story_price = $(element.target).data("story");
            const selected = this.selected.find((x) => x.id === +element.target.dataset.id);

            if (this.lowBudget(post_price, story_price, selected))
                return;

            if (selected) {
                this.selected.splice(this.channels.find((x) => x.id === +element.target.dataset.id), 1);
                element.target.innerText = "انتخاب";
                $("[data-id='" + element.target.dataset.id + "']").text("انتخاب");
                $('#gap').find(":contains('انتخاب')").parent(".card").show();
            } else {
                this.selected.push(this.channels.find((x) => x.id === +element.target.dataset.id));
                element.target.innerText = "لغو انتخاب";
            }
        },
        checkData() {
            this.$emit("go_next", this.selected.length > 1);
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
                $("head").append("<style id='rp_stack'>*{overflow: unset !important}</style>");
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

        $("#storyPriceG, #storyPriceL, #minFollow, #maxFollow, #postPriceG ,#postPriceL").change((element) => {
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
    max-width: 360px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 2rem;
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.5);
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
