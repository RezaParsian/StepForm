<template>
    <div id="vue_start">
        <div class="container-fluid p-0">
            <!--start-hero-section-->
            <div class="row mx-auto position-relative pb-5 hero-section" style="overflow: hidden;">
                <div class="col-md mx-5 mt-3 align-self-center">
                    <h2>با ادونچر سریعتر بازخورد بگیرید!</h2>
                    <p>افزایش ترخ بازدید و رشد 100% کسب و کارتان را به ادونچر بسپارید!</p>
                </div>
                <div class="col-md-5">
                    <img class="img-fluid"
                         src="https://static.vecteezy.com/system/resources/previews/002/037/235/non_2x/marketing-strategy-campaign-concept-vector.jpg" alt="">
                </div>
            </div>
            <!--end-hero-section-->
            <div class="background-shape d-none d-md-block d-lg-block"></div>
        </div>
            <!--    start-form-section-->
            <div class="container p-0 position-relative">
                <!--    start-form-section-->
                <div class="col-md-12 bg-white mx-5 pb-4 position-absolute pt-4 sabt-section px-0 d-none d-md-block">
                    <div class="row justify-content-center mx-0 px-3">
                        <div class="col-md-5 px-4 text-right">
                            <select name="socialMedia" id="type" class="sabt-input form-control">
                                <option value="">شبکه اجتماعی موردنظرتان را انتخاب کنید.</option>
                                <option v-for="media in socialMedia" :value="media.value">{{media.name}}</option>
                            </select>
                        </div>
                        <div class="col-md-5 px-4 text-right">
                            <select name="work_category[]" required id="work_Category" multiple="" class="form-control mdb-select md-form">
                                <option v-for="item in work_category.filter((x)=> x.category_isActive===1)" :value="item.id">{{ item.category_name }}</option>
                            </select>
                        </div>

                        <div class="col-md-2">
                            <button @click="getChannels()" type="button" class="btn btn-block d-flex text-white btn-sabt d-block icons rpZizi justify-content-center py-2">
                                <label class="p-0 m-0">اعمال</label>
                                <p id="space"></p>
                                <i class="fa fa-arrow-left mr-3 my-auto"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-10 mx-auto pb-4 mb-5 position-absolute pt-3 sabt-section-phone px-0 d-block d-md-none">
                    <form action="">
                        <div class="col-12 mb-3 text-right">
                            <select id="type2" class="sabt-input form-control">
                                <option class="form-control" value="">انتخاب شبکه اجتماعی</option>
                                <option v-for="media in socialMedia" :value="media.value">{{media.name}}</option>
                            </select>
                        </div>
                        <div class="col-12 mb-3 text-right">
                            <select class="sabt-input form-control" name="work_category[]" required id="work_category" multiple="">
                                <option class="form-control" value="">انتخاب دسته بندی</option>
                                <option v-for="item in work_category.filter((x)=> x.category_isActive===1)" :value="item.id">{{ item.category_name }}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-block text-white btn-sabt py-2" @click="getChannels()"> اعمال<i class="fa fa-arrow-left mr-3 "></i></button>
                        </div>
                    </form>
                </div>
                <!--    end-form-section-->

            </div>
            <!--    end-form-section-->
        <!--    cards-container-->
        <div class="container-fluid justify-content-center p-0 mt-5 pt-3">
            <div class="row mx-auto px-2 mt-5">
                <div class="col-md-3 mb-3" v-for="channel in channels.filter((x)=> !selected.find((b)=> b.id==x.id))" :key="channel.username" :id="channel.id">
                    <div class="first hero">

                        <img v-if="channel.pic!=null" class="hero-profile-img" :src="channel.pic" alt="">
                        <img v-else-if="channel.pic===null" class="hero-profile-img"
                             src="https://img.favpng.com/13/14/23/computer-icons-user-vector-graphics-portable-network-graphics-psd-png-favpng-sXybdut2iBZYirt6eHqEhE2LN.jpg" alt="">
                        <div :class="types"></div>
                        <div class="hero-logo text-center">
                            <img src="img/logo-01.png" alt="" class="img-fluid">
                        </div>
                        <div class="hero-description px-3">
                            <p>{{ channel.name }}</p>
                            <p>{{ channel.username }}@</p>
                            <p><span>{{ channel.followers }}</span><small> :Followers</small></p>
                            <p><span>{{ channel.following }}</span><small> :Following</small></p>
                        </div>

                        <div class="middle align-content-center">
                            <p v-html="getPrice(channel)"></p>
                            <p>آخرین بروزرسانی : {{ channel.last_update }}</p>
                            <div class="hero-btn">
                                <a class="btn" :data-id="channel.id" @click="select" type="button">انتخاب</a>
                            </div>
                            <button style="position: absolute;bottom: 5rem;right: .3rem;"  type="button" class="btn likeBtn">
                                <i class="fa fa-heart-o float-right text-danger" :data-id="channel.id" @click="liked" style="font-size: 15pt"></i>
                            </button>

                         <button class="btn text-white"  type="button" style="position: absolute;bottom: 3rem;right: .3rem;"><i :data-id="channel.id" @click="block" class="fa fa-ban float-right" style="font-size: 15pt;"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--    cards-container-->
        <div class="row p-5 mx-auto">
            <div id="reza" class="mx-auto p-5" :class="grow"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "mediaAdventure",
    data() {
        return {
            channels: [],
            responsive:'',
            page: 0,
            grow: "",
            wishList: [],
            selected:[],
            province: [],
            blackList:[],
            types: "",
            work_category: [],
            categories: [],
            selected_category: [],
            socialMedia: [
                {name: 'اینستاگرام', value: 'INSTAGRAM'},
                {name: 'تلگرام', value: 'TELEGRAM'},
                {name: 'اینفلوئنسر', value: 'INFLUENCER'},
            ]
        }
    },
    methods: {
        getChannels() {
            let data = {
                category: this.categories.length > 0 ? this.categories : [1, 2, 21, 26, 28, 44],
                page: this.page,
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
        select(element) {
            const selected = this.selected.find((x) => x.id === +element.target.dataset.id);

            if (selected) {
                this.selected.splice(this.channels.find((x) => x.id === +element.target.dataset.id), 1);
                element.target.innerText = "انتخاب";
                // $('#gap').find(":contains('انتخاب')").parent(".card").show();
            } else {
                this.selected.push(this.channels.find((x) => x.id === +element.target.dataset.id));

                element.target.innerText = "انتخاب شد";
            }
        },
        block(element) {
            const block = this.blackList.find((x) => x.id === +element.target.dataset.id);

            if (block) {
                this.blackList.splice(this.channels.find((x) => x.id === +element.target.dataset.id), 1);

            } else {
                this.blackList.push(this.channels.find((x) => x.id === +element.target.dataset.id));
            }
        },
        liked(element) {
            const like = this.wishList.find((a) => a.id === +element.target.dataset.id);
            if (like) {
                this.wishList.splice(this.channels.find((a) => a.id === +element.target.dataset.id), 1);
                $(element.target).removeClass('fa-heart').addClass('fa-heart-o')
            } else {
                this.wishList.push(this.channels.find((a) => a.id === +element.target.dataset.id));
               $(element.target).removeClass('fa-heart-o').addClass('fa-heart')
            }
        },
    },
    watch: {
        page() {
            if (this.page > 0)
                this.getChannels();
        }
    },
    computed: {
        channelsShow() {
            this.types = $('#type option:selected').val()
            const $work_category = $("#work_category");
            this.selected_category = this.work_category.filter((x) => $work_category.val().indexOf(x.id + '') > -1);
            if (this.selected_category.length > 0 && this.types !== '')
                this.getChannels()
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
        this.$nextTick(() => {
            $("#work_category").select2({
                placeholder: "دسته بندی خودرا انتخاب کنید.",
                dir: "rtl",
                closeOnSelect: false,
                width: "100%",
            }).val("INSTAGRAM").trigger("change");
            $("#work_Category").select2({
                placeholder: "دسته بندی ",
                dir: "rtl",
                closeOnSelect: false,
                width: "100%",
            }).val("INSTAGRAM").trigger("change");

            $(document).on("change","#type",(element)=>{
               this.types=element.target.value;
            });
            $(document).on("change","#type2",(element)=>{
               this.types=element.target.value;
            });
        });
        $.get("https://advn.ad-venture.app/api/cats", (data) => {
            this.work_category = data;
        });
    },
}
</script>

<style scoped>

</style>