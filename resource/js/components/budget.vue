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

    <div class="row mx-auto">
      <button type="button" @click="budgetAmount=price.tooltip" class="btn btn-info m-2 d-none d-md-block" v-for="price in prices" :title="price.tooltip" data-toggle="tooltip">{{ price.price }}</button>
    </div>
    <div class="row mx-auto">
      <button type="button" @click="budgetAmount=price.tooltip" class="btn btn-info m-2 d-md-none" v-for="price in prices" :title="price.tooltip" data-toggle="tooltip">{{ price.tooltip }}</button>
    </div>

    <!--    <div class="row mx-auto">-->
    <!--      <strong>بازدید تخمینی:</strong>-->
    <!--      <span class="mx-2">{{ estimatedVisits }}</span>-->
    <!--    </div>-->

    <hr class="mt-0">

    <div class="row mx-auto">
      <ol class="p-0">
        <li v-for="item in budget_description">{{ item }}</li>
      </ol>
    </div>

  </div>
</template>

<script>
export default {
  name: "budget",
  props: ["value", "budget_description"],
  data() {
    return {
      current_budget: "",
      estimatedVisits: "۱۶,۰۰۰",
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