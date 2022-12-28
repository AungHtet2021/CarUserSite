<script setup>
import { onMounted, onUnmounted } from "vue";
import Typed from "typed.js";
import bg0 from "@/assets/img/bg9.jpg";
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import MaterialButton from "@/components/MaterialButton.vue";

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
      id: this.$route.params.id, //this is the id from the browser
      localDomain: utils.constant.localDomain,
      carDetails: {},
      video: "",
      qty: 0,
      total: 0,
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
        this.price = parseInt(this.carDetails.price);
        if (this.carDetails.video !== null && this.carDetails.video !== "") {
          if (this.carDetails.video.includes("watch?v=")) {
            this.video = this.carDetails.video.replace("watch?v=", "embed/");
          }
        }
      }
    },

    add() {
      this.qty = this.qty + 1;
      this.total = this.total + this.price;
    },

    remove() {
      if (this.qty !== 0) {
        this.qty = this.qty - 1;
        this.total = this.total - this.price;
      }
    },

    addToCart() {
      var tempOrder = [];
      var orderList = JSON.parse(localStorage.getItem("order"));
      if (orderList !== null) {
        tempOrder = orderList;
      }

      tempOrder.push({
        name: this.carDetails.name,
        quantity: this.qty,
        total: this.total,
      });
      localStorage.setItem("order", JSON.stringify(tempOrder));
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
            <h1 class="text-white">Car details</h1>

            <p class="lead mb-4 text-white opacity-8">
              We’re constantly trying to express ourselves and actualize our
              dreams.
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8 ms-auto mt-lg-0 mt-6">
          <div class="row justify-content-start">
            <h2>{{ this.carDetails.name }}</h2>
            <div class="row">
              <div class="col-4"><h5>Brand</h5></div>
              <div class="col-4">
                <h5>: BMW</h5>
              </div>
            </div>

            <div class="row">
              <div class="col-4"><h5>Category</h5></div>
              <div class="col-4">
                <h5>: {{ this.carDetails.categoryId }}</h5>
              </div>
            </div>

            <div class="row">
              <div class="col-4"><h5>Price</h5></div>
              <div class="col-4">
                <h5>: {{ this.carDetails.price }}$</h5>
              </div>
            </div>

            <div class="row">
              <div class="col-4"><h5>Inventory Type</h5></div>
              <div class="col-4">
                <h5>: {{ this.carDetails.status }}</h5>
              </div>
            </div>

            <p>
              {{ this.carDetails.description }}
            </p>
          </div>

          <iframe width="100%" height="400" :src="this.video" frameborder="0">
          </iframe>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6 detailRightSide">
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
            <div class="discount">
              <h3 class="text-white text-center">20%</h3>
              <h6 class="text-white text-center" style="font-size: small">
                Discount
              </h6>
            </div>
            <div class="card-body text-center">
              <h5 class="font-weight-normal">
                <a>{{ this.carDetails.name }}</a>
              </h5>

              <i @click="remove()" class="material-icons opacity-6 me-2"
                >do_not_disturb_on</i
              >
              <span
                style="
                  margin-left: 10%;
                  margin-right: 10%;
                  font-size: xx-large;
                  font-weight: 700;
                "
                >{{ qty }}</span
              >

              <i @click="add()" class="material-icons opacity-6 me-2"
                >add_circle</i
              >
              <div>
                <h5>Total</h5>
                <span>{{ total }} $</span>
              </div>
              <div class="row">
                <div class="col-md-12 text-center">
                  <MaterialButton
                    @click="addToCart()"
                    variant="gradient"
                    style="background-color: #e6e600; width: 200px"
                    class="mt-3 mb-0"
                    >Add To Cart</MaterialButton
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.detailRightSide {
  margin-bottom: 3% !important;
}
.discount {
  border-radius: 50%;
  margin-top: 5%;
  margin-left: 5%;
  width: 80px;
  height: 80px;
  background-color: red;
}

.material-icons {
  cursor: pointer;
  font-size: 24px !important;
}
</style>
