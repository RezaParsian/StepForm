<template>
    <div id="vue_start">

        <nav class="navbar sticky-top navbar-expand-lg navbar-light pt-2 px-0 px-md-5 bg-white">
            <a href="https://ad-venture.app/" class="d-md-none d-block">
                <img src="https://zeroteam.ir/advn/wp-content/uploads/2022/03/adventure-logo.png" style="width: 6rem;" class="mr-2 phone" alt="melal-call">
            </a>
            <a class="navbar-brand d-md-block d-none" href="https://ad-venture.app/">
                <img src="https://zeroteam.ir/advn/wp-content/uploads/2022/03/adventure-logo.png" class="img-fluid" alt="Adventure" style="width: 7rem">
            </a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item ml-3">
                        <a class="text-dark menus px-3 pb-1 d-block" href="https://ad-venture.app">خانه</a>
                    </li>
                    <li class="nav-item ml-3 dropdown">
                        <a class="text-dark menus px-3 pb-1 d-block" href="https:/ad-venture.app/خدمات/" id="navbardrop" data-toggle="dropdown">
                            خدمات ما
                        </a>
                        <div class="dropdown-menu">
                            <a class="text-dark dropdown-item" href="https://ad-venture.app/تبلیغات-بازدیدی-cpm/">تبلیغات بازدیدی (CPM)</a>
                            <a class="text-dark dropdown-item" href="https://ad-venture.app/تبلیغات-بازده-محور-cpa/">تبلیغات بازده محور (CPA)</a>
                            <a class="text-dark dropdown-item" href="https://ad-venture.app/تبلیغات-کلیکی-cpc-چیست؟/">تبلیغات کلیکی (CPC) چیست؟</a>
                            <a class="text-dark dropdown-item" href="https://ad-venture.app/تبلیغات-نصب-محور-cpi-چیست؟/">تبلیغات نصب محور (CPI) چیست؟</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="text-dark menus px-3 pb-1 d-block" href="https://ad-venture.app/وبلاگ/">وبلاگ</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="text-dark menus px-3 pb-1 d-block" href="https://ad-venture.app/125-2/">تماس با ما</a>
                    </li>
                    <li class="nav-item">
                        <a class="text-dark menus px-3 pb-1 d-block" href="https://advn.ad-venture.app/social">رسانه های ادونچر</a>
                    </li>
                </ul>
            </div>

            <a href="https://advn.ad-venture.app/login" class="btn btn-outline-danger rounded">
                <span>ورود | ثبت نام</span>
            </a>
        </nav>

        <div class="p-0 container">
            <!--start-hero-section-->
            <div class="row mx-md-auto position-relative pb-5 hero-section" style="overflow: hidden;">
                <div class="col-md-6 col mt-md-3 p-0 align-self-center">
                    <h2>با ادونچر سریعتر بازخورد بگیرید!</h2>
                    <p>افزایش نرخ بازدید و رشد 100% کسب و کارتان را به ادونچر بسپارید!</p>
                </div>
                <div class="col-md-6 col-12">
                    <img class="img-fluid" src="/img/hero.svg" alt="hero">
                </div>
            </div>
            <!--end-hero-section-->
            <div class="background-shape d-none d-md-block d-lg-block"></div>
        </div>
        <!--    start-form-section-->
        <div class="container p-0 position-relative" style="height: 3rem;">
            <!--    start-form-section-->
            <div class="col-md-12 bg-white mx-5 pb-4 position-absolute pt-4 sabt-section px-0 d-none d-md-block">
                <div class="row justify-content-center mx-0 px-3">
                    <div class="col-md-5 px-4 text-right">
                        <select name="socialMedia" id="type" class="sabt-input form-control">
                            <option v-for="media in socialMedia" :value="media.value">{{ media.name }}</option>
                        </select>
                    </div>
                    <div class="col-md-5 px-4 text-right">
                        <select name="work_category[]" required multiple="" class="form-control mdb-select md-form work_category js-example-placeholder-multiple js-states">
                            <option v-for="item in work_category.filter((x)=> x.category_isActive===1)" :value="item.id">{{ item.category_name }}</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <button @click="page=1;channels=[];getChannels()" type="button"
                                class="btn btn-block d-flex text-white btn-sabt d-block icons rpZizi justify-content-center py-2">
                            <label class="p-0 m-0">اعمال</label>
                            <p id="space"></p>
                            <i class="fa fa-arrow-left mr-3 my-auto"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-10 mx-auto pb-4 mb-5 position-absolute pt-3 sabt-section-phone px-0 d-block d-md-none">
                    <div class="col-12 mb-3 text-right">
                        <select id="type2" class="sabt-input form-control">
                            <option v-for="media in socialMedia" :value="media.value">{{ media.name }}</option>
                        </select>
                    </div>
                    <div class="col-12 mb-3 text-right">
                        <select class="sabt-input form-control work_category" name="work_category[]" required multiple="">
                            <option v-for="item in work_category.filter((x)=> x.category_isActive===1)" :value="item.id">{{ item.category_name }}</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-block text-white btn-sabt py-2" @click="page=1;channels=[];getChannels()"> اعمال<i class="fa fa-arrow-left mr-3 "></i></button>
                    </div>
            </div>
        </div>
        <div class="container-fluid justify-content-center p-0 mt-5 pt-3">
            <div class="row mx-auto px-2 mt-5">
                <div class="mx-auto mb-3" v-for="channel in channels.filter((x)=> !selected.find((b)=> b.id==x.id))" :key="channel.username" :id="channel.id">
                    <PublisherCart
                            :social_media="social_media"
                            :user="user"
                            :bgColors="bgColors"
                            :token="token"
                            :like="isLiked(channel.id)"
                            :block="isBlocked(channel.id)"
                            :channel="channel">

                    </PublisherCart>
                </div>
            </div>
        </div>
        <!--    cards-container-->
        <div class="row p-5 mx-auto">
            <div id="reza" class="mx-auto p-5" :class="grow"></div>
        </div>

        <span class="filter" @click="showFilterModal" title="فیلتر نتایج">
            <i class="fa fa-filter fa-3x text-white"></i>
        </span>

        <span class="music" @click="player" title="موزیک">
            <i class="fa fa-music fa-3x text-white"></i>
        </span>

        <div class="modal fade" id="filter-modal">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-body row">
                        <div class="form-group col-md-12 m-0">
                            <label>جستجو کنید</label>
                            <input type="text" v-model="filters.q" class="form-control">
                        </div>
                        <div class="form-group col-md-12 m-0">
                            <label>حداقل دنبال کننده

                                <small>{{ filters.follower_g ? Separate(filters.follower_g, "عدد") : "" }}</small>

                            </label>
                            <input type="range" step="10000" max="1000000" v-model="filters.follower_g"
                                   class="form-control">
                        </div>
                        <div class="form-group col-md-12 m-0">
                            <label>حداکثر دنبال کننده
                                <small>{{ filters.follower_l ? Separate(filters.follower_l, "عدد") : "" }}</small>
                            </label>
                            <input type="range" step="10000" max="1000000" min="100000" v-model="filters.follower_l"
                                   class="form-control">
                        </div>

                        <div class="col-md-12">
                            <hr class="m-0">
                        </div>

                        <div class="form-group col-md-12 m-0">
                            <label>حداقل مبلغ پست

                                <small>{{ filters.post_g ? Separate(filters.post_g, "ریال") : "" }}</small>

                            </label>
                            <input type="range" step="100000" min="100000" max="10000000" v-model="filters.post_g"
                                   class="form-control">
                        </div>
                        <div class="form-group col-md-12 m-0">
                            <label>حداکثر مبلغ پست
                                <small>{{ filters.post_l ? Separate(filters.post_l, "ریال") : "" }}</small>
                            </label>
                            <input type="range" step="100000" max="10000000" min="100000" v-model="filters.post_l"
                                   class="form-control">
                        </div>

                        <div class="col-md-12">
                            <hr class="m-0">
                        </div>

                        <div class="form-group col-md-12 m-0">
                            <label>حداقل نرخ تعامل

                                <small>{{ filters.eng_g ? (filters.eng_g) : "" }}</small>

                            </label>
                            <input type="range" step="0.01" min="0" max="30" v-model="filters.eng_g"
                                   class="form-control">
                        </div>

                        <div class="form-group col-md-12 m-0">
                            <label>حداکثر نرخ تعامل
                                <small>{{ filters.eng_l ? (filters.eng_l) : "" }}</small>
                            </label>
                            <input type="range" step="0.01" max="30" min="0" v-model="filters.eng_l"
                                   class="form-control">
                        </div>

                        <div class="col-md-12">
                            <hr class="m-0">
                        </div>

                        <div class="form-group col-md-12 m-0">
                            <label>حداقل مبلغ استوری
                                <small>{{ filters.story_g | currency }}</small>
                            </label>
                            <input type="range" step="100000" min="100000" max="10000000" v-model="filters.story_g" class="form-control">
                        </div>

                        <div class="form-group col-md-12 m-0">
                            <label>حداکثر مبلغ استوری
                                <small>{{ filters.story_l | currency }}</small>
                            </label>
                            <input type="range" step="100000" max="10000000" min="100000" v-model="filters.story_l" class="form-control">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-danger" @click="clearFilters">حذف فیلتر ها</button>
                        <button class="btn btn-success" @click="filter">فیلتر کن</button>
                    </div>

                </div>
            </div>
        </div>
        <div id="login-modal" class="modal fade">
            <div class="modal-dialog modal-login">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="text-danger">برای استفاده از این امکانات باید به حساب خود وارد شوید</p>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post">
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                    <input type="text" class="form-control" id="email" placeholder="نام کاربری"
                                           required="required">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                    <input type="password" class="form-control" id="password" placeholder="کلمه عبور"
                                           required="required">
                                </div>
                            </div>
                            <div class="form-group">
                                <button type="button" @click="attemptLogin" class="btn btn-primary btn-block btn-lg">
                                    ورود به حساب
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">حساب کاربری ندارید؟ <a href="/register">ثبت نام</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    name: "mediaAdventure",
    props: {
        user: {
            type: Object,
            default: null,
        },
        token: {
            type: String,
        },
        favorite: {
            type: Array,
            default: function () {
                return [];
            },
        },
        black: {
            type: Array,
            default: function () {
                return [];
            },
        },

    },
    data() {
        return {
            music: new Audio("https://advn.ad-venture.app/music.mp3"),
            channels: [],
            bgColors: 'middle',
            responsive: '',
            page: 1,
            grow: "",
            wishList: [],
            filters: {},
            selected: [],
            url: "https://advn.ad-venture.app",
            blackList: [],
            social_media: "",
            follower_l: 1000,
            types: '',
            work_category: [],
            categories: [],
            selected_category: [],
            socialMedia: [
                {name: 'اینستاگرام', value: 'INSTAGRAM'},
                {name: 'تلگرام', value: 'TELEGRAM'},
                {name: 'اینفلوئنسر', value: 'INFLUENCER'},
            ],
        }
    },
    methods: {
        player() {
            if (this.music.paused)
                this.music.play();
            else
                this.music.pause();
        },
        getChannels() {
            let data = this.filters;
            data.page = this.page;
            data.type = this.types.toUpperCase() === "" ? "INSTAGRAM" : this.types.toUpperCase();
            data.category = this.categories;

            window.history.pushState([], "", `?set=1&&filter=${JSON.stringify(data)}`);
            this.grow = "spinner-grow";
            this.social_media = data.type;

            $.post(this.url + "/api/publisher", data, (data) => {
                this.channels = this.channels.concat(data);
                this.grow = "";
                if (data.length > 0) {
                    observer.observe($("#reza")[0])
                    $(".filter").css('visibility', 'visible');
                }

            });
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
        showFilterModal() {
            $("#filter-modal").modal('show');
        },
        validate(element) {
            let error = false;
            let val = $(element).val();
            if (val === undefined) {
                error = true;
            }

            if (!error && val === null) {
                error = true;
            }
            if (!error && val.trim() === "") {
                error = true;
            }

            if (error) {
                if (element.hasClass("select2-hidden-accessible")) {
                    element = element.parent().find(".select2-selection");
                }
                element.addClass("border border-danger");
                setTimeout(function () {
                    element.removeClass("border border-danger");
                }, 5000);
            }
            return !error;
        },
        filter() {
            this.page = 0;
            this.channels = [];
            this.getChannels();
            $("#filter-modal").modal('hide');
        },
        clearFilters() {
            this.filters = {};
            this.page = 0;
            this.channels = [];
            this.getChannels();
            $("#filter-modal").modal('hide');
        },
        attemptLogin() {
            $("#login-modal .error").remove();
            $("#login-modal .border").removeClass('border border-danger');
            let email = $("#email");
            let password = $("#password");

            const passwordValid = this.validate(password);
            const emailValid = this.validate(email);
            if (!passwordValid || !emailValid) {
                return false;
            }

            let data = {
                email: email.val(),
                password: password.val(),
                _token: this.token,
            };
            fetch(this.url + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                return res.status === 204 ? location.reload() : res.json();
            }).then(res => {
                if (res.errors) {
                    let modal = $("#login-modal");
                    for (const key in res.errors) {
                        let error = res.errors[key][0];
                        let input = modal.find(`#${key}`);
                        input.addClass("border border-danger");
                        input.parent().parent().append('<small class="text-danger text-right error">' + error + '</small>');
                    }
                }
            })
        },
        isBlocked(publisher) {
            return !!this.black.find((x) => x == publisher);
        },
        isLiked(publisher) {
            return !!this.favorite.find((a) => a == publisher);
        },
        Separate(number, suffix = null) {
            let n = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (suffix)
                return n + " " + suffix;
        }
    },
    watch: {
        page() {
            if (this.page > 0)
                this.getChannels();
        },
        channels() {
            if (this.types === "INSTAGRAM" || this.types === "INFLUENCER")
                this.bgColors = "middle"
            else if (this.types === "TELEGRAM")
                this.bgColors = "tel_middle"
        }
    },
    computed: {
        channelsShow() {
            this.types = $('#type option:selected').val()
            const $work_category = $(".work_category");
            this.selected_category = this.work_category.filter((x) => $work_category.val().indexOf(x.id + '') > -1);
            if (this.selected_category.length > 0 && this.types !== '')
                this.getChannels()
        },
    },
    mounted() {
        this.music.loop = false;

        window.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.page++;
                    observer.unobserve($("#reza")[0])
                }
            })
        });

        this.$nextTick(() => {
            setTimeout(() => {
                const $category = $(".work_category");

                $category.select2({
                    placeholder: "دسته بندی خودرا انتخاب کنید.",
                    dir: "rtl",
                    closeOnSelect: false,
                    width: "100%",
                });
            }, 500);

            $(document).on("change", "#type", (element) => {
                this.types = element.target.value;
            });
            $(document).on("change", "#type2", (element) => {
                this.types = element.target.value;
            });
            this.types = 'INSTAGRAM';
        });

        $.get("https://advn.ad-venture.app/api/cats", (data) => {
            this.work_category = data;
        });

        $(() => {
            const urlParams = Object.fromEntries(new URLSearchParams(location.search));
            if (urlParams.filter) {
                this.filters = JSON.parse(urlParams.filter);
                this.types = this.filters.type;
                this.page = 1;

                while (this.page <= this.filters.page) {
                    this.getChannels();
                    this.page++;
                    if (this.page > this.filters.page) {
                        setTimeout(() => {
                            location.href = '#' + this.filters.id;
                            this.types = this.filters.type;
                        }, 4000)
                    }
                }

            }

            let Vue = this;
            $(document).on('mouseover', ".publisher", function () {
                Vue.filters.id = $(this).attr('id');
                window.history.pushState([], "", `${Vue.url}/social?set=1&&filter=${JSON.stringify(Vue.filters)}`);

            });

            $(document).on("change", ".work_category", (element) => {
                this.categories = $(element.target).val();
            });

            this.$nextTick(()=>{
                this.getChannels();
            });
        })

    },
}
</script>

<style>
::placeholder {
    color: #2592c3 !important;
    font-size: 9pt
}

.sabt-input {
    border-radius: 5px;
    font-size: 10pt;
    background-color: rgba(191, 215, 237, 1);
    border-color: rgba(191, 215, 237, 1);
    height: 2.5rem;
}

.sabt-section {
    border-radius: 5px;
    top: -4.5rem;
    right: -3%;
    box-shadow: 5px 10px 10px rgba(191, 215, 237, 0.20);
}

.btn-sabt {
    background-image: linear-gradient(to right, #C04848 0%, #480048 51%, #C04848 100%);
    transition: 0.5s;
    background-size: 200% auto;
    border-radius: 8px;
    box-shadow: 5px 10px 10px rgba(191, 215, 237, 0.20);
}

.sabt-section-phone {
    border-radius: 5px;
    top: -5rem;
    right: 8.5%;
    box-shadow: 5px 10px 10px rgba(191, 215, 237, 0.20);
    background-color: rgba(242, 242, 242, 1);
}

.btn-sabt:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}

.hero-section {
    background-size: cover;
    height: 33rem;
    bottom: 0;
    width: 100%;
    padding: 20px;
}

.targets {
    background-color: #055C9D !important;
    color: white !important;
    border-radius: 5px;
}

.zoom {
    transition: transform .2s; /* Animation */
    margin: 0 auto;
}

.zoom:hover {
    transform: scale(1.5); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    z-index: 99999;
}

.background-shape {
    background: rgba(191, 215, 237, 0.20);
    width: 120rem;
    height: 85rem;
    -ms-transform: skewY(-20deg);
    -webkit-transform: skewY(25deg);
    position: absolute;
    top: 57rem;
    left: 0;
}

.icons i:hover {
    margin-right: 10rem;
}

#space {
    transition: all .7s;
}

.rpZizi:hover #space {
    margin-right: .5rem;
}

.special {
    font-weight: bold !important;
    color: #fff !important;
    background: #bc0000 !important;
    text-transform: uppercase;
    padding: 10px;
}

.modal-login .modal-content {
    padding: 20px;
    border-radius: 5px;
    border: none;
}

.modal-login .modal-header {
    border-bottom: none;
    position: relative;
    justify-content: center;
}

.modal-login .close {
    position: absolute;
    top: -10px;
    right: -10px;
}

.modal-login h4 {
    color: #636363;
    text-align: center;
    font-size: 26px;
    margin-top: 0;
}

.modal-login .modal-content {
    color: #999;
    border-radius: 1px;
    margin-bottom: 15px;
    background: #fff;
    border: 1px solid #f3f3f3;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 25px;
}

.modal-login .form-group {
    margin-bottom: 20px;
}

.modal-login label {
    font-weight: normal;
    font-size: 13px;
}

.modal-login .form-control {
    min-height: 38px;
    padding-left: 5px;
    box-shadow: none !important;
    border-width: 0 0 1px 0;
    border-radius: 0;
}

.modal-login .form-control:focus {
    border-color: #ccc;
}

.modal-login .input-group-addon {
    max-width: 42px;
    text-align: center;
    background: none;
    border-bottom: 1px solid #ced4da;
    padding-right: 5px;
    border-radius: 0;
}

.modal-login .btn, .modal-login .btn:active {
    font-size: 16px;
    font-weight: bold;
    background: #19aa8d !important;
    border-radius: 3px;
    border: none;
    min-width: 140px;
}

.modal-login .btn:hover, .modal-login .btn:focus {
    background: #179b81 !important;
}

.modal-login .hint-text {
    text-align: center;
    padding-top: 5px;
    font-size: 13px;
}

.modal-login .modal-footer {
    color: #999;
    border-color: #dee4e7;
    text-align: center;
    margin: 0 -25px -25px;
    font-size: 13px;
    justify-content: center;
}

.modal-login a {
    color: #fff;
    text-decoration: underline;
}

.modal-login a:hover {
    text-decoration: none;
}

.modal-login a {
    color: #19aa8d;
    text-decoration: none;
}

.modal-login a:hover {
    text-decoration: underline;
}

.modal-login .fa {
    font-size: 21px;
    position: relative;
    top: 6px;
}

.trigger-btn {
    display: inline-block;
    margin: 100px auto;
}

.TELEGRAM {
    background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA 51%, #1FA2FF 100%);
    border-radius: 30px;
    position: absolute;
    top: 51%;
    left: -5px;
    height: 65%;
    width: 108%;
    transform: skew(19deg, -9deg);
    transition: 0.5s;
    background-size: 200% auto;
}

.TELEGRAM:hover {
    background-position: right center; /* change the direction of the change here */
    color: black;
    text-decoration: none;
    transition: 0.5s;
}

.filter {
    position: fixed;
    z-index: 90000;
    bottom: 2rem;
    right: 1rem;
    visibility: hidden;
    background-color: #2b8af0;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 6.3;
    font-size: 8pt;
}

.music{
    position: fixed;
    z-index: 90000;
    bottom: 2rem;
    left: 1rem;
    background-color: #2b8af0;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 6.3;
    font-size: 8pt;
}

.filter:hover {
    cursor: pointer;
}

.INSTAGRAM, .INFLUENCER {
    background-image: linear-gradient(0deg, #3f5efb, #fc466b);
    border-radius: 30px;
    position: absolute;
    top: 51%;
    left: -5px;
    height: 65%;
    width: 108%;
    transform: skew(19deg, -9deg);
    transition: 0.5s;
    background-size: 200% auto;
}

.INSTAGRAM:hover, .INFLUENCER:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
    transition: 0.5s;
}

.zizigolo {
    background-image: linear-gradient(to right, #360033 0%, #0b8793 51%, #360033 100%);
    border-radius: 30px;
    position: absolute;
    top: 51%;
    left: -5px;
    height: 65%;
    width: 108%;
    transform: skew(19deg, -9deg);
    transition: 0.5s;
    background-size: 200% auto;
}

.zizigolo:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
    transition: 0.5s;
}

.middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: 200% auto;
    color: white;
    text-align: center;
    font-weight: 900;
    background-image: linear-gradient(0deg, #3f5efb, #fc466b);
    padding-top: 5rem;
}

.middle:hover {
    transition: .7s;
    background-position: right center;
}

.tel_middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: 200% auto;
    color: black;
    text-align: center;
    font-weight: 900;
    background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA 51%, #1FA2FF 100%);
    padding-top: 5rem;
}

.tel_middle:hover {
    transition: .7s;
    background-position: right center;
}
</style>
