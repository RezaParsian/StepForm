<template>
    <div id="vue_instagram_post">
        <div class="row mx-auto">
            <div class="col-md-7">
                <div class="form-group">
                    <label>عکس ، ویدیو یا سناریو</label>
                    <button class="btn btn-outline-success btn-sm" title="اضافه کردن فایل" data-toggle="tooltip" @click="post_count++" type="button">
                        <i class="fa fa-plus"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" title="حذف کردن فایل" data-toggle="tooltip" @click="post_count!== 1 ? post_count-- : ''" type="button">
                        <i class="fa fa-times"></i>
                    </button>
                    <input v-for="item in post_count" type="file" name="file[]" class="form-control-file border rounded mt-2 mb-1" :data-id="item" @change="readFile"
                           accept=".jpg, .jpeg, .gif, .mp4, .pdf">
                    <small>تصاویر باید در فرمت‌های .jpeg, .jpg, .png یا .gif و ویدیوها در فرمت .mp4 و سناریو به فرمت pdf باشند. حداکثر حجم مجاز تصاویر ۵ و ویدیوها ۱۹ مگابایت است.</small>
                </div>

                <div class="form-group">
                    <label>کپشن</label>
                    <textarea class="form-control" v-model="post_text" rows="3" id="post_text" name="post_text"></textarea>
                </div>
                <div class="form-check-inline">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" v-model="post_comment" id="switch1" name="post_comment">وضعیت کامنت : <span class="text-primary">{{ post_comment ? "باز" : "بسته" }}</span>
                    </label>
                </div>

                <div class="form-group">
                    <label>تگ روی عکس <span class="text-muted small">(اختیاری)</span></label>
                    <select class="form-control" multiple="multiple" name="tag[]">
                    </select>
                </div>

                <div class="form-group">
                    <label>لینک <span class="text-muted small">(اختیاری)</span></label>
                    <input class="form-control" v-model="link" name="link"/>
                </div>

            </div>
            <div id="preview_section" class="col-md">
                <h5 class="text-center">پیش‌نمایش پست</h5>
                <div class="col mx-auto border rounded" id="preview_panel">
                    <div class="border-bottom row mb-2">
                        <span class="py-4 px-2">استپ فرم</span>
                        <span class="ml-auto px-3 align-self-center">...</span>
                    </div>

                    <div id="demo" class="carousel slide" data-ride="carousel">
                        <!-- Indicators -->
                        <ul class="carousel-indicators">
                            <li v-for="index in post_count" data-target="#demo" :data-slide-to="index" :class="index===1 ? 'active' : ''"></li>
                        </ul>
                        <!-- The slideshow -->
                        <div class="carousel-inner">
                            <div v-for="index in post_count" class="carousel-item" :class="index===1 ? 'active' : ''">
                                <video :id="'preview_'+index" poster="" class="col img-fluid">
                                    <source src="" type="">
                                </video>
                            </div>
                        </div>
                        <!-- Left and right controls -->
                        <a class="carousel-control-prev" href="#demo" data-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </a>
                        <a class="carousel-control-next" href="#demo" data-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </a>
                    </div>
                    <br>
                    <div class="row border-bottom">
                        <div class="col">
                            <i class="fa fa-bookmark-o"></i>
                        </div>
                        <div class="col justify-content-end d-flex">
                            <i class="fa mx-1 fa-paper-plane-o"></i>
                            <i class="fa mx-1 fa-user-o" style="display: none" id="tagged"></i>
                            <i class="fa mx-1 fa-comment-o"></i>
                            <i class="fa mx-1 fa-heart-o"></i>
                        </div>
                    </div>
                    <span class="px-2">استپ فرم</span>
                    <p style="white-space: break-spaces">{{ post_text }}</p>
                    <span class="m-2 text-muted">
              <small class="mx-2 float-left">20:47</small>
          </span>
                </div>
            </div>
        </div>
        <input type="hidden" v-model="check">
    </div>
</template>

<script>
import {Bus} from "../../app";

export default {
    name: "instagram_post",
    props: ["state"],
    data() {
        return {
            file: [],
            post_count: 1,
            post_text: this.state.instagram_post_text,
            post_comment: this.state.instagram_post_comment,
            link: this.state.instagram_link
        }
    },
    watch: {
        post_text(val) {
            Bus.$emit("state", "instagram_post_text", val);
        },
        post_comment(val) {
            Bus.$emit("state", "instagram_post_comment", val)
        },
        link(val) {
            Bus.$emit("state", "instagram_link", val)
        },
    },
    methods: {
        checkData() {
            return this.file.length > 0 && this.post_text !== "";
        },
        readFile(element) {
            const vm = this;
            const $id = $(element.target).data('id');

            if (element.target.files && element.target.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    const $selector = $("#preview_".$id);
                    let type = e.target.result.indexOf("video") > 0 ? "src" : "poster";
                    $selector.attr("src", "");
                    $selector.attr("poster", "");
                    $selector.attr(type, e.target.result);

                    vm.file.push(element.target.files[0].name);
                }

                reader.readAsDataURL(element.target.files[0]);
            }
        },
        post_count(val) {
            if (val > 10) {
                this.post_count = 10;
                Swal.fire({
                    toast: true,
                    showConfirmButton: false,
                    title: "فقط مجاز به انتخاب ۱۰ ایتم برای ارسال در ایسنتاگرام می‌باشید.",
                    icon: "info",
                    timer: 1500,
                    timerProgressBar: true,
                })
            }
        }
    },
    computed: {
        check() {
            const condition = this.file.length > 0 && this.post_text != "";

            this.$emit("check_me")

            return condition;
        }
    },
    mounted() {
        this.$nextTick(() => {
            $("#vue_instagram_post").find("select").select2({
                width: "100%",
                tags: true,
                createTag(params) {
                    return {
                        id: "@" + params.term,
                        text: "@" + params.term
                    }
                },
            });

            this.state["tag[]"].forEach((item)=>{
                let newOption = new Option(item, item, true, true);
                $("[name='tag[]'").append(newOption).trigger('change');
            });
        });

        $("[name='tag[]']").change((e) => {
            const $tagged = $("#tagged");

            this.$nextTick(() => {
                $tagged.hide();
                if ($("[name='tag[]']").val().length > 0)
                    $tagged.show();
            });

            Bus.$emit("state", e.target.name, $(e.target).val())
        });

        Bus.$emit("state", "instagram_post_comment", true)
    }
}
</script>

<style scoped>
#preview_panel {
    min-height: 90% !important;
}
</style>
