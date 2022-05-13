<template>
    <div id="vue_channels" style="max-height: 31rem;overflow: auto;">
        <input type="hidden" name="channels" v-for="item in selected" :value="item" :key="item">

        <i v-if="selected.length>0" type="button" data-toggle="modal" data-target="#exampleModalCenter" class="fa fa-shopping-cart btn btn-primary position-absolute"></i>

        <div class="row mx-auto justify-content-center" id="gap">
            <div class="card col-md-3 p-0" v-for="channel in channels.filter((x)=>x.followers>0)" :key="channel.username" :id="channel.id">
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
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">کانال های منتخب شما</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-center" id="basket">
                            <div class="card col-md-3 p-0 mx-1 my-2" v-for="items  in channels.filter((x)=> selected.indexOf(x.id + '') > -1)" :key="items.username" :id="items.id">
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
                                        <button :data-id="items.id" @click="select" type="button" :data-post="items.post_price" :data-story="items.post_price">انتخاب شد</button>
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
      step:{
          type:Number
      }
    },
    data() {
        return {
            channels: [],
            page: 0,
            grow: "",
            selected: [],
        }
    },
    methods: {
        getChannels() {
            this.grow = "spinner-grow";
            $.post("http://51.38.241.252:81/api/publisher", {
                province: this.province.map((x) => x.name),
                category: this.categories,
                page: this.page,
                type: this.types.toUpperCase()
            }, (data) => {
                this.channels = this.channels.concat(data);
                this.grow = "";
                if (data.length > 0)
                    observer.observe($("#reza")[0])
            });
        },
        getPrice(channel) {
            const price = this.content === "پست" ? channel.post_price : channel.story_price;
            return `هزینه تبلیغات : ${price ?? 0}`;
        },
        select(element) {
            const post_price = $(element.target).data("post");
            const story_price = $(element.target).data("story");

            if (this.selected.indexOf(element.target.dataset.id) > -1) {
                this.selected.splice(this.selected.indexOf(element.target.dataset.id), 1);
                element.target.innerText = "انتخاب";
                $('#gap').find(":contains('انتخاب شد')").parent(".card").show();
            } else {
                this.selected.push(element.target.dataset.id);
                element.target.innerText = "انتخاب شد";
                $('#gap').find(":contains('انتخاب شد')").parent(".card").hide();

                if (this.content === "پست") {
                    if (post_price > this.budget) {
                        this.selected.splice(this.selected.indexOf(element.target.dataset.id), 1);
                        element.target.innerText = "انتخاب";
                        Swal.fire({
                            title: 'خطا',
                            text: 'مبلغ پست بیشتر از موجودی شما است',
                            icon: 'error',
                            confirmButtonText: 'تایید'
                        });
                    }
                } else {
                    if (story_price > this.budget) {
                        this.selected.splice(this.selected.indexOf(element.target.dataset.id), 1);
                        element.target.innerText = "انتخاب";
                        Swal.fire({
                            title: 'خطا',
                            text: 'مبلغ استوری بیشتر از موجودی شما است',
                            icon: 'error',
                            confirmButtonText: 'تایید'
                        });
                    }
                }
            }
        },
        checkData() {
            this.$emit("go_next", this.selected.length === 0 ? false : this.selected);
        },
    },
    watch: {
        page() {
            this.getChannels();
        }
    },
    computed: {
        request() {
            if ((this.province !== [] && this.categories !== [] && this.types !== "") && this.selected.length <= 0) {
                this.page = 0;
                this.selected = [];
                this.channels = [];

                observer.observe($("#reza")[0])
            }

            if ((this.province !== [] && this.categories !== [] && this.types !== "") && this.step==5)
                this.checkData();

            return [
                this.province,
                this.categories,
                this.types,
            ];
        }
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
    box-shadow: 0px 1rem 1.5rem rgba(0, 0, 0, 0.5);
}

.card .banner {
    background-image: url("https://images.unsplash.com/photo-1545703549-7bdb1d01b734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ");
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
