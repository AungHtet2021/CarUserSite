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
            <h2 style="color: red">Discount CAR</h2>
            <h1 class="text-white">FOR SALE</h1>
            <p class="lead mb-4 text-white opacity-8">
              FIND THE PERFECT CAR , FOR SALE TODAY!
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <h2 class="text-black" style="text-align: center;">BEST CAR DISCOUNT</h2>
    <div class="container">
      <div class="row col-md-12">
        <template v-for="(brand, index) in carList" :key="index">
          <span class="col-md-6 mt-5 imgHolder">
            <img
              :src="this.localDomain + '/car' + brand.image_path"
              class="carImg"
              :key="imageIndex"
            />
            <h4>{{ brand.name }}</h4>
            <h6>{{ brand.price }} $</h6>
            <span class="more" @click="goToHome(brand.id)"> Learn More </span>

            <span class="discountCar"
              ><span style="font-weight: 900; font-size: larger">
                {{ brand.percentage }}%
              </span>
              <span style="font-size: small">discount</span></span
            >
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
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
      carList : [],
    };
  },

  async created() {
    await this.getAllCars();
  },
  methods: {
    async getAllCars() {
      const resp = await api.get("car/discount");
      if (resp) {
        this.carList = await resp.json();
      } else {
        console.log("something wrong");
      }
    },

    goToHome(id) {
      this.$router.push({ name: "details", params: { id: id } });
    },
  },
};
</script>
<style>
.rightSide {
  margin-bottom: 25%;
}
</style>
