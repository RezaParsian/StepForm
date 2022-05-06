<template>
  <div id="vue_main" class="card">
    <div class="card-header">
      ساخت کمپین جدید
    </div>
    <div class="card-body">
      <div class="row text-center mt-2">
        <div class="col steps inactive" v-for="item in steps" :id="item.id" :key="item.name">
          {{ item.name }}
        </div>
      </div>

      <hr>

      <!-- Step 0 - Start -->
      <div v-show="current_step===0">
        <p class="text-justify">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
          کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می
          توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
        </p>
        <start @go_next="nextStep" v-model="camping" ref="start"></start>
      </div>

      <!--  Step 1 - Map    -->
      <div v-show="current_step===1">
        <div class="row justify-content-center">
          <button class="btn mx-3 px-5" :class="selectedPlaceButton==='county' ? 'btn-success' : 'btn-outline-success'" @click="selectAllCity" type="button">کشوری</button>
          <button
              class="btn mx-3 px-5"
              :class="selectedPlaceButton==='city' ? 'btn-success' : 'btn-outline-success'"
              @click="selectNoneCity"
              title="بر روی استان های مدنظر خود کلیک کنید."
              data-toggle="tooltip"
              type="button">
            استانی
          </button>
        </div>

        <div class="row text-center justify-content-center">
          <iran ref="iran" @go_next="nextStep"></iran>
        </div>
      </div>

      <!--  Step 2 - Advertise -->
      <div v-show="current_step===2">
        <advertise @go_next="nextStep" ref="advertise"></advertise>
      </div>

      <!--  Step 3 - Budget -->
      <div v-show="current_step===3">
        <budget v-model="budget" @go_next="nextStep" ref="budget"></budget>
      </div>

      <!--  Step 3 - SocialMedia -->
      <div v-show="current_step===4">
        <social-media v-model="socialModel" @go_next="nextStep" ref="social-media"></social-media>
      </div>

      <!--  Step 6 - Checkout -->
      <div v-show="current_step===6">
        <checkout @go_next="nextStep" :social="social" :camping="camping" :budget="budget" :content="content" ref="checkout"></checkout>
      </div>

      <hr>

      <button type="button" v-if="next_step" @click="next" class="btn btn-primary float-left">
        مرحله بعد
        <i class="fa fa-caret-left"></i>
      </button>

      <button type="button" v-if="current_step>0" @click="goBack" class="btn btn-primary float-right">
        <i class="fa fa-caret-right"></i>
        مرحله قبل
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      next_step: false,
      selectedPlaceButton: null,
      social: "",
      camping: "",
      budget: "",
      content: "",
      current_step: -1,
      steps: [
        {
          id: 0,
          name: "شروع",
          component: "start"
        },
        {
          id: 1,
          name: "موقعیت جغرافیایی تبلیغ",
          component: "iran"
        },
        {
          id: 2,
          name: "نوع تبلیغ",
          component: "advertise"
        },
        {
          id: 3,
          name: "بودجه",
          component: "budget"
        },
        {
          id: 4,
          name: "شبکه اجتماعی",
          component: "social-media"
        },
        {
          id: 5,
          name: "کانال ها"
        },
        {
          id: 6,
          name: "تایید",
          component: "checkout"
        }
      ],
    };
  },
  methods: {
    goBack() {
      this.current_step--;
      this.$refs[this.steps[this.current_step].component].checkData();
    },
    next() {
      this.current_step++;
      this.nextStep(false);
      this.$refs[this.steps[this.current_step].component].checkData();
    },
    nextStep(condition) {
      this.next_step = condition;
    },
    selectAllCity() {
      this.selectedPlaceButton = "county"
      $("[id^='svg'][fill='#333']").each((index, item) => {
        this.$refs.iran.select({target: item});
      });
    },
    selectNoneCity() {
      this.selectedPlaceButton = "city"
      $("[id^='svg'][fill='#008400']").each((index, item) => {
        $(item).trigger("hover")
        this.$refs.iran.select({target: item});
      });
    }
  },
  watch: {
    current_step(current) {
      $(".steps").addClass("inactive");

      for (let i = 0; i < current; i++) {
        $(`#${i}`).removeClass("inactive")
      }

      if (current === 6) {
        $("#show_here").html($("#preview_section").html());
      }
    }
  },
  computed:{
    socialModel:{
      get(){
        return [
          this.social,
          this.content
        ];
      },
      set(value){
        this.social = value[0];
        this.content = value[1];
      }
    }
  },
  mounted() {
    this.current_step = 0;
    this.$refs.iran.$watch("selected", () => {
      if (this.$refs.iran.selected.length < 31)
        this.selectedPlaceButton = "city";
    });
  }
}
</script>

<style scoped>
.steps::before {
  content: "";
  width: 1rem;
  height: 1rem;
  display: block;
  background: rebeccapurple;
  border-radius: 100%;
  position: absolute;
  left: calc(50% - 0.5rem);
  top: -1rem;
}

.steps.inactive::before {
  content: "";
  width: 1rem;
  height: 1rem;
  display: block;
  background: #847692 !important;
  border-radius: 100%;
  position: absolute;
  left: calc(50% - 0.5rem);
  top: -1rem;
}
</style>