<template>
  <div>
    <div class="form-group">
      <label> دسته‌بندی کسب و‌ کار شما</label>
      <select name="work_category[]" id="work_category" multiple="">
        <option v-for="item in work_category" :value="item.name">{{ item.name }}</option>
      </select>
    </div>

    <div class="form-group">
      <label> هدف کمپین</label>
      <select name="campaign_goal" id="campaign_goal">
        <option v-for="item in campaign_goal" :value="item.name">{{ item.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Start",
  data() {
    return {
      work_category: [
        {
          id: "",
          name: "محصولات هنری و دست ساز"
        }
        ,
        {
          id: "",
          name: "کسب و کار مربوط به کودکان"
        }
        ,
        {
          id: "",
          name: "کتاب و مجله"
        }
        ,
        {
          id: "",
          name: "خدمات مشاوره به کسب و کارها"
        }
        ,
        {
          id: "",
          name: "لباس و کفش و اکسسوری های پوشیدنی"
        }
        ,
        {
          id: "",
          name: "کامپیوتر و تجهیزات مربوطه"
        }
        ,
        {
          id: "",
          name: "آموزشی"
        }
        ,
        {
          id: "",
          name: "تکنولوژی و پلتفرمهای آنلاین"
        }
        ,
        {
          id: "",
          name: "سرگرمی"
        }
        ,
        {
          id: "",
          name: "خدمات مالی"
        }
        ,
        {
          id: "",
          name: "خوراکی و غذا"
        }
        ,
        {
          id: "",
          name: "هدیه و گل"
        }
        ,
        {
          id: "",
          name: "دولتی"
        }
        ,
        {
          id: "",
          name: "خدمات درمانی و سلامت"
        }
        ,
        {
          id: "",
          name: "خدمات مربوط به خانه داری"
        }
        ,
        {
          id: "",
          name: "غیر انتفاعی"
        }
        ,
        {
          id: "",
          name: "خدمات حیوانات خانگی"
        }
        ,
        {
          id: "",
          name: "رمز ارز"
        }
        ,
        {
          id: "",
          name: "محصولات و خدمات ورزشی"
        }
        ,
        {
          id: "",
          name: "اسباب بازی"
        }
        ,
        {
          id: "",
          name: "سفر"
        }
        ,
        {
          id: "",
          name: "فروش خودرو"
        }
        ,
        {
          id: "",
          name: "خدمات خودرو"
        }
        ,
        {
          id: "",
          name: "مشاوره املاک"
        }
        ,
        {
          id: "",
          name: "مهاجرتی"
        }
        ,
        {
          id: "",
          name: "انگیزشی و روانشناسی"
        }
        ,
        {
          id: "",
          name: "تجهیزات صنعتی"
        }
        ,
        {
          id: "",
          name: "بیمه"
        }
        ,
        {
          id: "",
          name: "وکالت"
        }
        ,
        {
          id: "",
          name: "سایر"
        }
        ,
        {
          id: "",
          name: "لاغری"
        }
        ,
        {
          id: "",
          name: "دیجیتال مارکتینگ"
        }
        ,
        {
          id: "",
          name: "زیبایی و آرایشی بهداشتی بانوان"
        }
        ,
        {
          id: "",
          name: "زیبایی و آرایشی بهداشتی آقایان"
        }
        ,
        {
          id: "",
          name: "جواهرات"
        }
        ,
        {
          id: "",
          name: "کنکور"
        }
        ,
        {
          id: "",
          name: "دکوراسیون و لوازم خانگی"
        }

      ],
      campaign_goal: [
        {id:"",name:"آگاهی از برند"},
        {id:"",name:"فروش محصول"},
        {id:"",name:"جمع آوری لید"},
        {id:"",name:"افزایش فالور"},
        {id:"",name:"دانلود یا نصب"},
        {id:"",name:"دیگر"},
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      $("select").select2({
        placeholder: "انتخاب کنید",
        dir: "rtl",
        width: "100%",
      });
    });
  }
}
</script>

<style scoped>

</style>