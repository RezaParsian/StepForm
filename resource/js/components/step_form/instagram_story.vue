<template>
    <div id="vue_instagram_story">
        <div class="row mx-auto">
            <div class="col-md-7">
                <div class="form-group">
                    <label>عکس ،ویدیو یا سناریو</label>
                    <input type="file" name="file" required class="form-control-file border rounded mb-1" @change="readFile">
                    <small>تصاویر باید در فرمت‌های .jpeg, .jpg, .png یا .gif و ویدیوها در فرمت .mp4 و سناریو به فرمت pdf باشند. حداکثر حجم مجاز تصاویر ۵ و ویدیوها ۱۹ مگابایت است.</small>
                </div>
                <div class="form-group">
                    <label>متن </label>
                    <textarea class="form-control" v-model="post_comment" rows="3" maxlength="80" id="post_text" name="post_text"></textarea>
                </div>

                <div class="form-group">
                    <label>منشن</label>
                    <select class="form-control" multiple="multiple" name="mention[]">
                    </select>
                </div>

                <div class="form-group">
                    <label>هشتگ</label>
                    <select class="form-control" multiple="multiple" name="hashtag[]">
                    </select>
                </div>

                <div class="form-group">
                    <label>لینک استوری</label>
                    <input type="url" v-model="link" class="form-control" name="link">
                </div>

                <div class="form-group">
                    <label>سایر توضیحات</label>
                    <textarea class="form-control" v-model="detail" rows="3" id="detail" name="detail"></textarea>
                </div>

            </div>

            <div id="preview_section" class="col-md">
                <h5 class="text-center">پیش‌نمایش پست</h5>
                <div class="col mx-auto border rounded" id="preview_panel">
                    <video id="preview" poster="" class="col img-fluid">
                        <source src="" type="">
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Bus} from "../../app";

export default {
    name: "instagram_story",
    props: ['state'],
    data() {
        return {
            file: "",
            post_comment: this.state.instagram_story_post_comment,
            detail: this.state.instagram_story_detail,
            link: this.state.instagram_story_link,
        }
    },
    watch: {
        post_comment(val) {
            Bus.$emit("state", "instagram_story_post_comment", val);
        },
        detail(val) {
            Bus.$emit("state", "instagram_story_detail", val);
        },
        link(val) {
            Bus.$emit("state", "instagram_story_link", val);
        }
    },
    methods: {
        checkData() {
            return this.file != "";
        },
        readFile(element) {
            const vm = this;
            if (element.target.files && element.target.files[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                    const $selector = $(`#preview`);
                    let type = e.target.result.indexOf("video") > 0 ? "src" : "poster";
                    $selector.attr("src", "");
                    $selector.attr("poster", "");
                    $selector.attr(type, e.target.result);
                    vm.file = element.target.files[0].name;
                }

                reader.readAsDataURL(element.target.files[0]);
            }
        }
    },
    computed: {
        check() {
            const condition = this.file != "";

            this.$emit("check_me")

            return condition;
        }
    },
    mounted() {
        this.$nextTick(() => {
            const $component = $("#vue_instagram_story");

            $component.find("[name='hashtag[]']").select2({
                width: "100%",
                tags: true,
                createTag(params) {
                    return {
                        id: "#" + params.term,
                        text: "#" + params.term
                    }
                }
            });

            $component.find("[name='mention[]']").select2({
                width: "100%",
                tags: true,
                createTag(params) {
                    return {
                        id: "@" + params.term,
                        text: "@" + params.term
                    }
                }
            });

            $component.find("select").change((e) => {
                Bus.$emit("state", e.target.name, $(e.target).val())
            });

            this.state["mention[]"].forEach((item) => {
                let newOption = new Option(item, item, true, true);
                $("[name='mention[]'").append(newOption).trigger('change');
            });

            this.state["hashtag[]"].forEach((item) => {
                let newOption = new Option(item, item, true, true);
                $("[name='hashtag[]'").append(newOption).trigger('change');
            });
        });
    }
}
</script>

<style scoped>
#preview_panel {
    min-height: 75% !important;
}
</style>
