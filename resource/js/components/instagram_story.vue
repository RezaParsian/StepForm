<template>
  <div id="vue_instagram_story">
    <div class="row mx-auto">
      <div class="col-md-7">
        <div class="form-group">
          <label>عکس یا ویدیو</label>
          <input type="file" name="file" class="form-control-file border rounded mb-1" @change="readFile">
          <small>تصاویر باید در فرمت‌های .jpeg, .jpg, .png یا .gif و ویدیوها در فرمت .mp4 باشند. حداکثر حجم مجاز تصاویر ۵ و ویدیوها ۱۹ مگابایت است.</small>
        </div>

        <div class="form-group">
          <label>متن </label>
          <textarea class="form-control" rows="3" maxlength="80" id="post_text" name="post_text"></textarea>
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
          <input type="url" class="form-control" name="link">
        </div>

        <div class="form-group">
          <label>سایر توضیحات</label>
          <textarea class="form-control" rows="3" id="detail" name="detail"></textarea>
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
export default {
  name: "instagram_story",
  data() {
    return {
      file: "",
      post_comment: true,
    }
  },
  methods: {
    checkData() {
      return this.file != "";
    },
    readFile(element) {
      const vm=this;
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
      $("#vue_instagram_story").find("select").select2({
        tags: true
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
