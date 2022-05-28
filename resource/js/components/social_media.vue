<template>
  <div id="vue_social_media" class="position-relative mx-auto" :key="fresh">
    <input type="hidden" name="platform">
    <input type="hidden" name="post_type">
    <button v-if="selected_media!==null" style="z-index: 99999" type="button" class="btn reset btn-danger rounded-circle position-absolute" title="بارگذاری مجدد" @click="reset">
      <i class="fa fa-refresh"></i>
    </button>

    <div class="row mx-auto justify-content-center">
      <div
          class="col-md-4 rounded border m-1 p-2"
          v-for="item in social_medias"
          :data-id="item.id"
          @click="selectMedia(item.id)"
          :title="item.tooltip"
          data-toggle="tooltip">
          <p v-if="item.name === 'Influencer'" class="position-absolute bg-danger new">Influencer</p>
        <div class="row">
          <img class="col-md-3 col-6 mx-auto img-fluid" :src="item.image" :alt="item.name">
        </div>
        <h5 class="text-center my-3">{{ item.persian_name }} <span v-if="selected_post_type!==null"> - {{ post_types[selected_post_type].name }}</span></h5>
      </div>
    </div>

    <div class="row mx-auto justify-content-center" v-if="selected_post_type===null">
      <div
          class="col-md-4 rounded border m-1 p-2"
          v-for="(item,index) in post_types"
          :data-id="item.id"
          @click="doAction(index)"
          :title="item.tooltip"
          data-toggle="tooltip">
        <div class="row">
          <i :class="item.icon" class="fa-3x mx-auto"></i>
        </div>
        <h5 class="text-center my-3">{{ item.name }}</h5>
        <ul>
          <li v-for="detail in item.details">{{ detail }}</li>
        </ul>
      </div>
    </div>

    <component :ref="post_types[selected_post_type].component" @check_me="checkData" v-if="selected_post_type!==null" :is="post_types[selected_post_type].component"></component>

  </div>
</template>

<script>

export default {
  name: "social_media",
  props: ["value"],
  data() {
    return {
      fresh: 0,
      selected_media: null,
      social_medias: [
        {
          id: 0,
          name: "Instagram",
          persian_name: "اینستاگرام",
          image: "https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png",
          services: [
            {
              id: 0,
              name: "پست",
              details: [],
              icon: "fa fa-camera-retro",
              component: "instagram_post",
            },
            {
              id: 1,
              name: "استوری",
              details: [],
              icon: "fa fa-clock-o",
              component: "instagram_story",
            }
          ]
        },
        {
          id: 1,
          name: "Telegram",
          persian_name: "تلگرام",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/121px-Telegram_2019_Logo.svg.png",
          services: [
            {
              id: 0,
              name: "پست",
              details: [],
              icon: "fa fa-paper-plane-o",
              component: "telegram"
            },
          ]
        },
        {
          id: 2,
          name: "Influencer",
          persian_name: "اینفلوئنسر",
          image: "https://cdn1.iconfinder.com/data/icons/influencer-2/64/1M-social-media-marketing-512.png",
          services: [
            {
              id: 0,
              name: "تبلیغات اینفلوئنسری",
              details: [],
              icon: "fa fa-wpexplorer",
              component: "instagram_post",
            }
          ],
        },
      ],
      selected_post_type: null,
      post_types: [],
    }
  },
  watch: {
    selected_media(new_advertise) {
      const $selector = $("#vue_social_media");
      $selector.find(`[data-id]`).removeClass("border").hide();
      $selector.find(`[data-id='${new_advertise}']`).show(750);
    }
  },
  methods: {
    checkData() {
      const $selector = $("#vue_social_media");
      this.$nextTick(() => {
        if (this.selected_media === null) {
          this.$emit("go_next", true);
          return;
        }

        this.$emit('input', [
          this.social_medias[this.selected_media].name,
          this.social_medias[this.selected_media].services[this.selected_post_type].name
        ]);

        $selector.find("[name='platform'").val(this.social_medias[this.selected_media].name);
        $selector.find("[name='post_type']").val(this.social_medias[this.selected_media].services[this.selected_post_type].name);

        if (this.selected_post_type !== null)
          this.$emit("go_next", this.$refs[this.post_types[this.selected_post_type].component].checkData());
        else
          this.$emit("go_next", true);
      });
    },
    selectMedia(advertise_id) {
      this.selected_media = advertise_id;
      this.post_types = this.social_medias[advertise_id].services;
    },
    reset() {
      this.fresh++;
      this.post_types = [];
      this.selected_post_type = null;
      this.selected_media = null;
      this.checkData();
    },
    doAction(id) {
      this.selected_post_type = id;
    }
  }
}
</script>

<style scoped>
.selected {
  border-width: 3px !important;
}

ul {
  list-style: none !important;
}

ul li:before {
  content: "\f067";
  font: normal normal normal 14px/1 FontAwesome;
  font-size: 12pt;
  color: #22C55E;
  margin: 2px;
}

.reset {
  right: 0;
}


.new {
    width: 73px;
    height: 30px;
    line-height: 30px;
    top: 24px;
    right: 5px;
    z-index: 2;
    overflow: hidden;
    transform: rotate(45deg);
    border: 1px dashed;
    box-shadow: 0 0 0 3px #e51f78, 0 21px 5px -18px rgba(0, 0, 0, .6);
    background-color: rgb(229, 31, 120);
    text-align: center;
    color: #fff;
}
</style>
