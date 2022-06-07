<template>
    <div>

        <div class="first hero publisher" :id="'channel_'+channel.id">
            <img v-if="channel.pic!=null" class="hero-profile-img" :src="channel.pic" alt="">
            <img v-else-if="channel.pic===null" class="hero-profile-img"
                 src="https://advn.ad-venture.app/img/social_back.png"
                 alt="">
            <div class="INSTAGRAM"></div>
            <div class=" hero-logo text-center">
                <img src="logo2.png" alt="" class="img-fluid">
            </div>
            <div class="hero-description px-3 text-white" dir="ltr">
                <p class="mt-4">{{ channel.name }}</p>
                <p>{{ channel.username }}@</p>
                <p><span>{{ channel.followers }}</span><small> :دنبال کننده</small></p>
                <p><span>{{ channel.eng }}</span><small> :نرخ تعامل</small></p>

                <p v-if="channel.post_price"><span dir="rtl">{{
                        seprate(channel.post_price ? parseInt(channel.post_price) : 0, "ریال")
                    }}</span><small> :هزینه پست</small></p>

                <p v-if="channel.story_price"><span dir="rtl">{{
                        seprate(channel.story_price ? parseInt(channel.story_price) : 0, "ریال")
                    }}</span><small> :هزینه استوری</small></p>
            </div>
            <div class="middle text-white">
                <p v-html="getPrice()"></p>
                <p>آخرین بروزرسانی : {{ channel.last_update }}</p>
                <p>تعداد تبلیغ : {{ channel.ad_count }}</p>
                <p>دسته بندی : {{ channel.category }}</p>
                <div class="hero-btn">
                    <a class="btn" :data-id="channel.id" @click="callPriceAction" type="button">استعلام قیمت</a>
                </div>
                <button style="position: absolute;bottom: 5rem;right: .3rem;" type="button"
                        title="افزودن به علاقه مندی"
                        class="btn likeBtn">
                    <i @click="likeAction" :data-id="channel.id"
                       :class="likeIcon() + ' fa  float-right text-danger'"
                       style="font-size: 15pt"></i>
                </button>

                <button class="btn text-white" type="button" title="بلاک ناشر"
                        style="position: absolute;bottom: 3rem;right: .3rem;">
                    <i :data-id="channel.id"
                       @click="blockAction"
                       :class="blockIcon() + ' fa  float-right text-danger'"
                       style="font-size: 15pt;"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PublisherCart",
    props: {
        like: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        channel: {
            type: Object,
            require: true
        },
        user: {
            type: Object,
            default: null,
        },
        token: {
            type: String,
        }
    },
    data() {
        return {
            url: window.location.origin,
            seprate: function (number, suffix = null) {
                let n = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if (suffix)
                    return n + " " + suffix;
            },
        }
    },
    methods: {
        getPrice() {
            const price = this.content === "پست" ? this.channel.post_price : this.channel.story_price;
            return `هزینه تبلیغات : ${price ?? 'موجود نیست'}`;
        },
        blockIcon() {
            return this.block ? "fa-unlock" : "fa-ban";
        },

        likeIcon() {
            return this.like ? "fa fa-heart" : "fa fa-heart-o";
        },
        likeAction(element) {
            let target = $(element.target);
            let publisher = this.channel.id;
            if (this.like) {
                target.removeClass('fa-heart').addClass('fa-heart-o');
                this.request('favorite', 'POST', {
                    'publisherId': publisher,
                    '_token': this.token,
                    '_method': 'DELETE'
                }).then(res => {
                    if (res.status == 204) {
                        this.like = false;
                    }
                });
            } else {
                target.removeClass('fa-heart-o').addClass('fa-heart');
                this.request('favorite', 'POST', {
                    'publisherId': publisher,
                    '_token': this.token
                }).then(res => {
                    if (res.status == 201) {
                        this.like = true;
                    }
                });
            }
        },
        blockAction(element) {
            let publisher = this.channel.id;
            let target = $(element.target);
            if (this.block) {
                target.removeClass('fa-unlock').addClass('fa-ban');
                this.request('black', 'POST', {
                    'publisher_id': publisher,
                    '_method': 'DELETE',
                    '_token': this.token
                }).then((res) => {
                    this.block = false;
                });
            } else {
                target.removeClass('fa-ban').addClass('fa-unlock');
                this.request('black', 'POST',
                    {
                        'publisher_id': publisher,
                        '_token': this.token,
                    }).then((res) => {
                    this.block = true;
                });
            }
        },
        callPriceAction(element) {
            let publisher = this.channel.id;
            $(element.target).addClass('disabled');
            this.request('calls', 'POST', {
                'publisher_id': publisher,
                '_token': this.token
            }).then(res => {
                Swal.fire({
                    'html': 'درخواست استعلام قیمت با موفقیت ثبت شد!',
                })
            })
        },
        request(uri, method, data, headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}) {
            if (!this.login())
                return;
            return fetch(this.url + "/" + uri, {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            });
        },
        login() {
            if (!this.user) {
                $("#login-modal").modal('show');
                return false;
            }
            return true;
        },
    }
}
</script>

<style scoped>
.hero {
    display: inline-block;
    position: relative;
    height: 400px;
    width: 100%;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
}

.hero:hover .middle {
    opacity: 1;
    cursor: pointer;
    height: 100%;
    width: 100%;
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

.hero-logo {
    height: 60px;
    width: 60px;
    border-radius: 20px;
    background-color: darkblue;
    position: absolute;
    bottom: 40%;
    left: 9px;
    overflow: hidden;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.7);
}

.hero-logo img {
    height: 100%;
}

.hero-description {
    position: absolute;
    color: #fff;
    bottom: -2%;
    right: 2%;
    font-weight: 900;
}

.hero-btn {
    position: absolute;
    color: #fff;
    left: 20px;
    bottom: 14%;
    padding: 0px 13px;
    border: 1px solid #fff;
}

.hero-btn a {
    color: #fff;
}


.hero:hover .INsta {
    opacity: 1;
    height: 100%;
    width: 100%;
}

.INsta {
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
    /*background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%);*/
    background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA 51%, #1FA2FF 100%);
    padding-top: 5rem;
}

.INsta:hover {
    transition: .7s;
    background-position: right center;
}

.hero-profile-img {
    width: 100%;
    height: 70%;
}

</style>
