<template>
  <h1 class="text-black">OUR BEST AUTO SERVICES FOR YOU</h1>
  <div class="container mt-sm-5 mt-5">
    <div class="row col-md-12">
      <template v-for="(brand, index) in brandList" :key="index">
        <span class="col-md-4 mt-5">
          <img
            :src="this.localDomain + '/car' + brand.imagePath"
            class="img"
            :key="imageIndex"
          />
          <h3>{{ brand.name }}</h3>
          <h5>{{ brand.price }} $</h5>
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
    };
  },

  methods: {
    async getAllBrands() {
      const resp = await api.get("car/carList");
      if (resp) {
        const data = await resp.json();
        if (data) this.brandList = data;
        console.log(data);
      } else {
        console.log("something wrong");
      }
    },
  },

  async created() {
    await this.getAllBrands();
  },
};
</script>

<style>
.img {
  margin-left: 0px;
  width: 304px;
  height: 200px;
}

.img:hover {
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.1); 
  transition: transform 0.40s;
}

h1 {
  margin-top: 2%;
  text-align: center;
}
</style>
