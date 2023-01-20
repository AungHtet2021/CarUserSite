<script setup>
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import { onMounted } from "vue";
import setMaterialInput from "@/assets/js/material-input";
import * as alertify from "alertifyjs";
onMounted(() => {
  setMaterialInput();
});
</script>
<script>
import utils from "../../../utils/utils";
import api from "../../../utils/api";
export default {
  data() {
    return {
      localDomain: utils.constant.localDomain,
      carList: [],
      name: "",
      gmail: "",
      requestDate: "",
      country: "",
      gender: "",
      phone: "",
      carId: "",
      showError: false,
      userData: {},
      Lists: [],
    };
  },

  async created() {
    await this.getAllOrders();
  },

  methods: {
    async getAllOrders() {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const resp = await api.get("order/getOrder/" + user.id);
      if (resp) {
        this.Lists = await resp.json();
      } else {
        console.log("something wrong");
      }
    },

    async orderCancel(id) {
      const resp = await api.remove("order/delete/" + id);
      if (resp) {
        alertify.success("Order Cancel Successful")
        this.getAllOrders();
      } else {
        alertify.success("Order Cancel UnSuccessful")
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
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center mb-5 mt-5">
          <h3
            class="text-center text-white z-index-1 position-relative"
            style="margin-top: 10%"
          >
            Your Order Lists
          </h3>
          <template v-for="(list, index) in Lists" :key="index">
            <template v-for="(order, index) in list" :key="index">
              <h5 class="text-white mt-6">{{ order.name }}</h5>
              <span span style="font-size: smaller; margin-left: 3px"
                >Quantity: </span
              ><span style="font-size: smaller">{{ order.car_quantity }}</span
              ><br />
              <span span style="font-size: smaller; margin-left: 3px"
                >Price: </span
              ><span style="font-size: smaller"> ${{ order.total }}</span>
              <br />
            </template>
            <button @click="orderCancel(list[0].order_id)">
              Cancel Order
            </button>
            <hr
              style="
                height: 2px;
                border-width: 0;
                color: gray;
                background-color: gray;
              "
            />
          </template>
        </div>
      </div>

      <div class="row"></div>
    </div>
  </section>
</template>

<style scoped>
@import "../../../../node_modules/alertifyjs/build/css/alertify.min.css";
@import "../../../../node_modules/alertifyjs/build/css/themes/bootstrap.min.css";
input {
  min-width: 200px;
}
.welcome {
  text-align: center;
  padding: 20px 0;
}
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  display: block;
  margin: 1px 0 1px;
}
.welcome button {
  margin: center !important;
}

button {
  margin-left: 2%;
  margin-top: 3%;
  text-decoration: none;
  background: #e76c14;
  font-weight: bold;
  border: 1px solid #eee;
  border-radius: 20px !important;
  padding: 5px 26px;
}

.testCarImg {
  width: 150px;
  height: 130px;
  margin-bottom: 10%;
}

select {
  min-width: 200px;
}
</style>
