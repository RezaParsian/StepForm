<template>
  <div class="card">
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices dui sapien eget mi proin sed libero enim. Quis hendrerit dolor magna eget est lorem ipsum. Fringilla ut morbi
          tincidunt augue. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Justo laoreet sit amet cursus sit amet. Etiam non quam lacus suspendisse faucibus interdum posuere. Eget mauris pharetra et ultrices neque. A diam sollicitudin tempor
          id eu nisl nunc mi ipsum. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. At tellus at urna
          condimentum mattis pellentesque. Augue ut lectus arcu bibendum. Viverra orci sagittis eu volutpat. Vulputate enim nulla aliquet porttitor. Mattis aliquam faucibus purus in massa tempor nec feugiat. Amet volutpat consequat mauris nunc congue nisi
          vitae suscipit tellus.
        </p>
        <start></start>
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
          <iran ref="iran"></iran>
        </div>
      </div>

      <!--  Step 2 - Advertise -->
      <div v-show="current_step===2">
        <advertise></advertise>
      </div>

      <!--  Step 3 - Budget -->
      <div v-show="current_step===3">
        <budget></budget>
      </div>

      <!--  Step 3 - SocialMedia -->
      <div v-show="current_step===4">
        <social-media></social-media>
      </div>

      <button type="button" @click="current_step++" class="btn btn-primary float-left">
        مرحله بعد
        <i class="fa fa-caret-left"></i>
      </button>

      <button type="button" v-if="current_step>0" @click="current_step--" class="btn btn-primary float-right">
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
      selectedPlaceButton: null,
      current_step: -1,
      steps: [
        {
          id: 0,
          name: "شروع"
        },
        {
          id: 1,
          name: "موقعیت جغرافیایی تبلیغ"
        },
        {
          id: 2,
          name: "نوع تبلیغ"
        },
        {
          id: 3,
          name: "بودجه"
        },
        {
          id: 4,
          name: "شبکه اجتماعی"
        },
        {
          id: 5,
          name: "نوع پست"
        },
        {
          id: 6,
          name: "تایید"
        }
      ],
    };
  },
  methods: {
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
        console.log(item)
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
    }
  },
  mounted() {
    this.current_step = 4;
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