<template>
  <h2 class="text-black" style="text-align: center;">OUR BEST AUTO SERVICES FOR YOU</h2>
  <div class="container mt-sm-5 mt-5">
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

          <span v-if="brand.percentage" class="discountCar"><span style="font-weight: 900;font-size: larger;"> {{ brand.percentage }}% </span> <span style="font-size: small;">discount</span></span>
        </span>
      </template>
    </div>
  </div>
</template>
<script>
import utils from "../../../utils/utils";
import api from "../../../utils/api";

export default {
  data() {
    return {
      localDomain: utils.constant.localDomain,
      carList : [],
    };
  },
  async created() {
    await this.getAllCars();
  },
  methods: {
    async getAllCars() {
      const resp = await api.get("car/trend");
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
.carImg {
  border-radius: 5%;
  margin-left: 0px;
  width: 400px !important;
  height: 260px !important;
}

/* .img:hover {
  -ms-transform: scale(1.5);
  -webkit-transform: scale(1.5);
  transform: scale(1.1);
  transition: transform 0.4s;
} */

h1 {
  margin-top: 2%;
  text-align: center;
}
.imgHolder {
  padding-left: 8% !important;
  position: relative;
}

.imgHolder .more {
  cursor: pointer;
  color: black;
  position: absolute;
  bottom: 33%;
  left: 34%;
  width: 200px;
  background: #f4f4f480;
  height: 30px;
  text-align: center;
}

.imgHolder .discountCar {
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 75%;
  left: 16%;
  width: 83px;
  background: red;
  height: 55px;
  text-align: center;
}
</style>
