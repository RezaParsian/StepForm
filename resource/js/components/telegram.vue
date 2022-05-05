<template>
  <div>
    <div class="row mx-auto">
      <div class="col-md-7">
        <div class="form-group">
          <label>عکس یا ویدیو</label>
          <input type="file" class="form-control-file border rounded" id="fileUploader" @change="readFile">
          <small>تصاویر باید در فرمت‌های .jpeg, .jpg, .png یا .gif و ویدیوها در فرمت .mp4 باشند. حداکثر حجم مجاز تصاویر ۵ و ویدیوها ۱۹ مگابایت است.</small>
        </div>

        <div class="form-group">
          <label> متن کامل تبلیغ (همراه با آدرس کانال)</label>
          <textarea class="form-control" v-model="post_text" rows="3" id="post_text"></textarea>
        </div>

        <div class="form-group">
          <label>لینک</label>
          <input type="url" class="form-control" v-model="post_link">
        </div>

        <div class="form-group">
          <label>توضیحات بیشتر</label>
          <textarea class="form-control" rows="3" id="post_text"></textarea>
        </div>
      </div>
      <div class="col-md">
        <h5 class="text-center">پیش‌نمایش پست</h5>
        <div class="col mx-auto border rounded" id="preview_panel">
          <span class="m-2 mb-3">استپ فرم</span>
          <video id="preview" poster="" class="col img-fluid">
            <source src="" type="">
          </video>
          <p style="white-space: break-spaces">{{ post_text }}</p>
          <a :href="post_link" target="_blank">{{ post_link }}</a>
          <br>
          <span class="m-2 text-muted">
              <small class="mx-2">20:47</small>
              <small><i class="fa fa-eye"></i> 3.2k views</small>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "telegram",
  data() {
    return {
      post_text: "",
      post_link: "",
    }
  },
  methods: {
    readFile(element) {
      if (element.target.files && element.target.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
          const $selector = $('#preview');
          let type = e.target.result.indexOf("video") > 0 ? "src" : "poster";
          $selector.attr("src", "");
          $selector.attr("poster", "");
          $selector.attr(type, e.target.result);
        }

        reader.readAsDataURL(element.target.files[0]);
      }
    }
  }
}
</script>

<style scoped>
#preview_panel {
  min-height: 75% !important;
}
</style>