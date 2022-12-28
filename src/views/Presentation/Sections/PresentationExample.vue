<template>
  <h1 class="text-black">OUR BEST AUTO SERVICES FOR YOU</h1>
  <div class="container mt-sm-5 mt-5">
    <div class="row col-md-12">       
  
      <template v-for="(brand, index) in brandList" :key="index">
        <span class="col-md-6 mt-5 imgHolder">
          <img
            :src="this.localDomain + '/car' + brand.imagePath"
            class="img"
            :key="imageIndex"
          />
          <h4>{{ brand.name }}</h4>
          <h6>{{ brand.price }} $</h6>
          <span @click="goToHome(brand.id)"> Learn More </span>
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
      brandList : [],
    };
  },
  async created() {
    await this.getAllCars();
  },
  methods: {
    async getAllCars() {
      const resp = await api.get("car/carList");
      if (resp) {
        this.brandList = await resp.json();
        console.log(this.brandList);
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
.img {
  border-radius: 5%;
  margin-left: 0px;
  width: 400px;
  height: 260px;
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

.imgHolder span {
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
</style>
