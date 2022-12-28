<script setup>
import { onMounted, onUnmounted } from "vue";
import Typed from "typed.js";
import bg0 from "@/assets/img/bg9.jpg";
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
//sections
const body = document.getElementsByTagName("body")[0];
//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>
<script>
import utils from "../../../utils/utils";
import api from "../../../utils/api";
export default {
  data() {
    return {
      id: "30",
      localDomain: utils.constant.localDomain,
      carDetails: {},
      video: "",
    };
  },

  async created() {
    await this.getCarDetailById();
  },
  methods: {
    async getCarDetailById() {
      const resp = await api.get("car/" + this.id);
      if (resp) {
        this.carDetails = await resp.json();
        if (this.carDetails.video !== null && this.carDetails.video !== "") {
          if (this.carDetails.video.includes("watch?v=")) {
            this.video = this.carDetails.video.replace("watch?v=", "embed/");
          }
        }
      }
    },
  },
};
</script>
<template>
  <DefaultNavbar
    :action="{
      route: 'javascript:;',
      label: 'Buy Now',
      color: 'btn-white',
    }"
    transparent
  />
  <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-75"
      :style="{ backgroundImage: `url(${bg0})` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h2 class="text-white">NEW CAR</h2>
            <h1 style="color: yellow">FOR SALE</h1>
            <p class="lead mb-4 text-white opacity-8">
              FIND THE PERFECT CAR , FOR SALE TODAY!
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <div class="container">
      <div class="row align-items-center">
   
        <div  class="col-lg-4" style="margin-top: 6%;">
          <div class="card">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a class="d-block blur-shadow-image">
                <img
                  :src="this.localDomain + '/car' + this.carDetails.imagePath"
                  :alt="title"
                  class="img-fluid border-radius-lg"
                />
              </a>
            </div>
            <div class="card-body text-center">
              <h5 class="font-weight-normal">
                <a href="javascript:;">{{ this.carDetails.name }}</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.rightSide {
  margin-bottom: 25%;
}

</style>
