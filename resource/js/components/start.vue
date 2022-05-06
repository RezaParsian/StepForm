<template>
  <div id="vue_start">
    <div class="form-group">
      <label> دسته‌بندی کسب و‌ کار شما</label>
      <select name="work_category[]" required id="work_category" multiple="">
        <option v-for="item in work_category" :value="item.id">{{ item.name }}</option>
      </select>
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
  props:["value"],
  data() {
    return {
      work_category: [
        {
          id: "محصولات هنری و دست ساز",
          name: "محصولات هنری و دست ساز"
        }
        ,
        {
          id: "کسب و کار مربوط به کودکان",
          name: "کسب و کار مربوط به کودکان"
        }
        ,
        {
          id: "کتاب و مجله",
          name: "کتاب و مجله"
        }
        ,
        {
          id: "خدمات مشاوره به کسب و کارها",
          name: "خدمات مشاوره به کسب و کارها"
        }
        ,
        {
          id: "لباس و کفش و اکسسوری های پوشیدنی",
          name: "لباس و کفش و اکسسوری های پوشیدنی"
        }
        ,
        {
          id: "کامپیوتر و تجهیزات مربوطه",
          name: "کامپیوتر و تجهیزات مربوطه"
        }
        ,
        {
          id: "آموزشی",
          name: "آموزشی"
        }
        ,
        {
          id: "تکنولوژی و پلتفرمهای آنلاین",
          name: "تکنولوژی و پلتفرمهای آنلاین"
        }
        ,
        {
          id: "سرگرمی",
          name: "سرگرمی"
        }
        ,
        {
          id: "خدمات مالی",
          name: "خدمات مالی"
        }
        ,
        {
          id: "خوراکی و غذا",
          name: "خوراکی و غذا"
        }
        ,
        {
          id: "هدیه و گل",
          name: "هدیه و گل"
        }
        ,
        {
          id: "دولتی",
          name: "دولتی"
        }
        ,
        {
          id: "خدمات درمانی و سلامت",
          name: "خدمات درمانی و سلامت"
        }
        ,
        {
          id: "خدمات مربوط به خانه داری",
          name: "خدمات مربوط به خانه داری"
        }
        ,
        {
          id: "غیر انتفاعی",
          name: "غیر انتفاعی"
        }
        ,
        {
          id: "خدمات حیوانات خانگی",
          name: "خدمات حیوانات خانگی"
        }
        ,
        {
          id: "رمز ارز",
          name: "رمز ارز"
        }
        ,
        {
          id: "محصولات و خدمات ورزشی",
          name: "محصولات و خدمات ورزشی"
        }
        ,
        {
          id: "اسباب بازی",
          name: "اسباب بازی"
        }
        ,
        {
          id: "سفر",
          name: "سفر"
        }
        ,
        {
          id: "فروش خودرو",
          name: "فروش خودرو"
        }
        ,
        {
          id: "خدمات خودرو",
          name: "خدمات خودرو"
        }
        ,
        {
          id: "مشاوره املاک",
          name: "مشاوره املاک"
        }
        ,
        {
          id: "مهاجرتی",
          name: "مهاجرتی"
        }
        ,
        {
          id: "انگیزشی و روانشناسی",
          name: "انگیزشی و روانشناسی"
        }
        ,
        {
          id: "تجهیزات صنعتی",
          name: "تجهیزات صنعتی"
        }
        ,
        {
          id: "بیمه",
          name: "بیمه"
        }
        ,
        {
          id: "وکالت",
          name: "وکالت"
        }
        ,
        {
          id: "سایر",
          name: "سایر"
        }
        ,
        {
          id: "لاغری",
          name: "لاغری"
        }
        ,
        {
          id: "دیجیتال مارکتینگ",
          name: "دیجیتال مارکتینگ"
        }
        ,
        {
          id: "زیبایی و آرایشی بهداشتی بانوان",
          name: "زیبایی و آرایشی بهداشتی بانوان"
        }
        ,
        {
          id: "زیبایی و آرایشی بهداشتی آقایان",
          name: "زیبایی و آرایشی بهداشتی آقایان"
        }
        ,
        {
          id: "جواهرات",
          name: "جواهرات"
        }
        ,
        {
          id: "کنکور",
          name: "کنکور"
        }
        ,
        {
          id: "دکوراسیون و لوازم خانگی",
          name: "دکوراسیون و لوازم خانگی"
        }

      ],
      model:{
        value: '',
      },
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
      this.$emit("input",$("#vue_start").find("#campaign_goal").find(":selected").text())
        this.$emit("go_next", $("#campaign_goal").val() != 0 && $("#work_category").val() != 0);
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
  }
}
</script>

<style scoped>

</style>