<template>
  <div id="vue_start">
    <div class="form-group">
      <label> دسته‌بندی کسب و‌ کار شما</label>
      <select name="work_category[]" required id="work_category" multiple="">
        <option v-for="item in work_category.filter((x)=> x.category_isActive===1)" :value="item.id">{{ item.category_name }}</option>
      </select>
    </div>


    <div v-if="selected_category!==null" class="alert alert-info">
      <div class="row">
        <div class="col-md-1 d-flex">
          <strong class="my-auto"><i class="fa fa-info-circle fa-2x"></i></strong>
        </div>
        <div class="col-md d-flex">
          <ol>
            <li v-for="item in selected_category.filter((x)=> x.category_discription!='' && x.category_discription!=null)">{{ item.category_name }}: {{ item.category_discription }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label> هدف کمپین</label>
      <select name="campaign_goal" required id="campaign_goal">
        <option v-for="item in campaign_goal" :value="item.id">{{ item.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Start",
  props: ["value"],
  data() {
    return {
      selected_category: null,
      work_category: [],
      campaign_goal: [
        {id: "", name: "یک هدف انتخاب فرمایید"},
        {id: "1", name: "آگاهی از برند"},
        {id: "1", name: "فروش محصول"},
        {id: "1", name: "جمع آوری لید"},
        {id: "1", name: "افزایش فالور"},
        {id: "1", name: "دانلود یا نصب"},
        {id: "1", name: "دیگر"},
      ]
    }
  },
  methods: {
    checkData() {
      const $work_category = $("#work_category");
      this.selected_category = this.work_category.filter((x) => $work_category.val().indexOf(x.id + '') > -1);
      this.$emit("input", $("#vue_start").find("#campaign_goal").find(":selected").text())
      this.$emit("go_next", $("#campaign_goal").val() != 0 && $work_category.val() != 0);
    }
  },
  mounted() {
    this.$nextTick(() => {
      $("#vue_start").find("select").select2({
        placeholder: "انتخاب کنید",
        dir: "rtl",
        closeOnSelect: false,
        width: "100%",
      });
    });

    $("#vue_start").find("select").on("change", function (e) {
      this.checkData();
    }.bind(this));

    $.get("http://51.38.241.252:81/api/cats", (data) => {
      this.work_category = data;
    });
  }
}
</script>

<style scoped>

</style>