<template>
  <div>
    <div class="row mx-auto">
      <div class="input-group mb-3 col-md-6">
        <input type="text" class="form-control text-center" v-model="budgetAmount" name="budget" placeholder="بودجه شما">
        <div class="input-group-prepend">
          <span class="input-group-text">تومان</span>
        </div>
      </div>
    </div>
    <small>مبالغ پیشنهادی : </small>

    <button type="button" @click="budgetAmount=price.tooltip" class="btn btn-info m-2" v-for="price in prices" :title="price.tooltip" data-toggle="tooltip">{{ price.price }}</button>

    <div class="row mx-auto">
      <strong>بازدید تخمینی:</strong>
      <span class="mx-2">{{ estimatedVisits }}</span>
    </div>

    <hr class="mt-0">

    <div class="row mx-auto">
      <ol>
        <li v-for="item in budget">{{ item }}</li>
      </ol>
    </div>

  </div>
</template>

<script>
export default {
  name: "budget",
  props:["value"],
  data() {
    return {
      current_budget: "",
      estimatedVisits: "۱۶,۰۰۰",
      budget: [
        " تبلیغ شما برای ۶۱ کانال ارسال می‌شود. ",
        "تبلیغ شما با توجه به داده‌های جریان ابتدا برای کانال‌هایی ارسال می‌شود که بیشترین بازخورد را داشته باشند، اما نهایتا ممکن است هر کدام از ۶۱ کانال، تبلیغ شما را منتشر کنند. ",
        " با توجه به اینکه بازدید تخمینی شما 350 هزار است، نهایتا تبلیغ شما در حدود ۱۸ کانال نمایش داده ‌خواهدشد. ",
        " اگر بازدید نهایی شما از بازدید تخمینی کمتر باشد بودجه‌ی خرج‌نشده به پنل شما بازمی‌گردد و اگر بیشتر باشد هزینه‌ی بیشتری از شما دریافت نمی‌گردد. ",
        "شما میتوانید تا سقف ۱۸ کانال را از لیست خارج کنید. "
      ],
      prices: [
        {tooltip: "1,500,000", price: "یک میلیون  و پانصد هزار  تومان"},
        {tooltip: "2,000,000", price: "دو میلیون تومان"},
        {tooltip: "2,500,000", price: "دو میلیون و پانصد هزار تومان"},
      ],
    }
  },
  methods: {
    checkData() {
      this.$emit("input", this.budgetAmount);
      this.$emit("go_next", this.budgetAmount !== "0");
    }
  },
  computed: {
    budgetAmount: {
      get() {
        let price = this.current_budget.replaceAll(",", "");
        return new Intl.NumberFormat('en-US', {style: 'decimal'}).format(price);
      },
      set(value) {
        this.current_budget = value;
        this.checkData();
      }
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 0.175rem .75rem;
}

ol {
  list-style: none !important;
}

ol li:before {
  content: "\f05b";
  font: normal normal normal 14px/1 FontAwesome;
  font-size: 8pt;
  color: #2281c5;
  margin: 2px;
}
</style>