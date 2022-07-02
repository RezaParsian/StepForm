<template>
    <div id="vue_social_media" class="position-relative mx-auto" :key="fresh">
        <input type="hidden" name="platform">
        <input type="hidden" name="post_type">
        <button v-if="selected_media!==null" style="z-index: 99999" type="button" class="btn reset btn-danger rounded-circle position-absolute" title="بارگذاری مجدد" @click="reset">
            <i class="fa fa-refresh"></i>
        </button>
        <div class="row mx-auto justify-content-center">
            <div
                class="col-md-4 rounded border m-1 p-2"
                v-for="item in social_medias"
                :data-id="item.id"
                @click="selectMedia(item.id)"
                :title="item.tooltip"
                data-toggle="tooltip">
                <div class="row">
                    <img class="col-md-3 col-6 mx-auto img-fluid" :src="item.image" :alt="item.name">
                </div>
                <h5 class="text-center my-3">{{ item.persian_name }} <span v-if="selected_post_type!==null"> - {{ post_types[selected_post_type].name }}</span></h5>
            </div>
        </div>

        <div class="row mx-auto justify-content-center" v-if="selected_post_type===null">
            <div
                class="col-md-4 rounded border m-1 p-2"
                v-for="(item,index) in post_types"
                :data-id="item.id"
                @click="doAction(index)"
                :title="item.tooltip"
                data-toggle="tooltip">
                <div class="row">
                    <i :class="item.icon" class="fa-3x mx-auto"></i>
                </div>
                <h5 class="text-center my-3">{{ item.name }}</h5>
                <ul>
                    <li v-for="detail in item.details">{{ detail }}</li>
                </ul>
            </div>
        </div>

        <component :state="state" :ref="post_types[selected_post_type].component" @check_me="checkData" v-if="selected_post_type!==null" :is="post_types[selected_post_type].component"></component>

    </div>
</template>

<script>

import {Bus} from "../../app";

export default {
    name: "social_media",
    props: ["value"],
    data() {
        return {
            fresh: 0,
            selected_media: null,
            social_medias: [
                {
                    id: 0,
                    name: "Instagram",
                    persian_name: "اینستاگرام",
                    image: "https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png",
                    services: [
                        {
                            id: 0,
                            name: "پست",
                            details: [],
                            icon: "fa fa-camera-retro",
                            component: "instagram_post",
                        },
                        {
                            id: 1,
                            name: "استوری",
                            details: [],
                            icon: "fa fa-clock-o",
                            component: "instagram_story",
                        },
                        {
                            id: 2,
                            name: "تبلیغات اینفلوئنسری",
                            details: [],
                            icon: "fa fa-wpexplorer",
                            component: "instagram_post",
                        }
                    ]
                },
                {
                    id: 1,
                    name: "Telegram",
                    persian_name: "تلگرام",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/121px-Telegram_2019_Logo.svg.png",
                    services: [
                        {
                            id: 0,
                            name: "پست",
                            details: [],
                            icon: "fa fa-paper-plane-o",
                            component: "telegram"
                        },
                    ]
                },

            ],
            selected_post_type: null,
            post_types: [],
            state: {},
        }
    },
    watch: {
        selected_media(new_advertise) {
            const $selector = $("#vue_social_media");
            $selector.find(`[data-id]`).removeClass("border").hide();
            $selector.find(`[data-id='${new_advertise}']`).show(750);
        }
    }
    ,
    methods: {
        checkData() {
            const $selector = $("#vue_social_media");
            this.$nextTick(() => {
                if (this.selected_media === null) {
                    this.$emit("go_next", true);
                    return;
                }

                this.$emit('input', [
                    this.social_medias[this.selected_media].name,
                    this.social_medias[this.selected_media].services[this.selected_post_type].name
                ]);

                $selector.find("[name='platform'").val(this.social_medias[this.selected_media].name);
                $selector.find("[name='post_type']").val(this.social_medias[this.selected_media].services[this.selected_post_type].name);

                if (this.selected_post_type !== null)
                    this.$emit("go_next", this.$refs[this.post_types[this.selected_post_type].component].checkData());
                else
                    this.$emit("go_next", true);
            });
        },
        selectMedia(advertise_id) {
            Bus.$emit("state", "selected_media", advertise_id);
            this.selected_media = advertise_id;
            this.post_types = this.social_medias[advertise_id].services;
        },
        reset() {
            this.fresh++;
            this.post_types = [];
            this.selected_post_type = null;
            this.selected_media = null;
            this.checkData();
        },
        doAction(id) {
            Bus.$emit("state", "selected_post_type", id);
            this.selected_post_type = id;
        }
    },
    mounted() {
        Bus.$on("selected_media", (value) => {
            this.$nextTick(() => {
                this.selected_media = value;
                this.post_types = this.social_medias[value].services;
            })
        })

        Bus.$on("instagram_post_text", (value) => {
            this.state.instagram_post_text = value;
        });

        Bus.$on("tag[]", (value) => {
            this.state['tag[]'] = value;
        });

        Bus.$on("instagram_link", (value) => {
            this.state.instagram_link = value;
        });

        Bus.$on("instagram_post_comment", (value) => {
            this.state.instagram_post_comment = value;
        });

        Bus.$on("instagram_story_post_comment", (value) => {
            this.state.instagram_story_post_comment = value;
        });

        Bus.$on("mention[]", (value) => {
            this.state['mention[]'] = value;
        });

        Bus.$on("hashtag[]", (value) => {
            this.state['hashtag[]'] = value;
        });

        Bus.$on("instagram_story_detail", (value) => {
            this.state['instagram_story_detail'] = value;
        });

        Bus.$on("instagram_story_link", (value) => {
            this.state['instagram_story_link'] = value;
        });

        Bus.$on("telegram_post_text", (value) => {
            this.state['telegram_post_text'] = value;
        });

        Bus.$on("telegram_post_link", (value) => {
            this.state['telegram_post_link'] = value;
        });

        Bus.$on("telegram_more", (value) => {
            this.state['telegram_more'] = value;
        });

        Bus.$on("selected_post_type", (value) => {
            setTimeout(() => {
                this.selected_post_type = value;
            }, 2000);
        })
    }
}
</script>

<style scoped>
.selected {
    border-width: 3px !important;
}

ul {
    list-style: none !important;
}

ul li:before {
    content: "\f067";
    font: normal normal normal 14px/1 FontAwesome;
    font-size: 12pt;
    color: #22C55E;
    margin: 2px;
}

.reset {
    right: 0;
}

</style>
