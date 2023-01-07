<template>
  <h2 class="text-black" style="text-align: center">
    OUR BEST AUTO SERVICES FOR YOU
  </h2>
  <div class="container mt-sm-5 mt-5">
    <div class="row">
      <template v-for="(brand, index) in carList" :key="index">
        <div class="main row col-6 mt-4 home">
          <div class="col-8">
            <img
              :src="this.localDomain + '/car' + brand.image_path"
              class="mainCarImg"
              :key="imageIndex"
            />
          </div>
          <div class="col-4" style="background-color: #794e41">
            <h5 class="text-white mt-2">{{ brand.name }}</h5>
            <span class="text-white" style="font-size: smaller">
              Available Quantity: {{ brand.quantity }}</span
            >
            <h6 class="text-white mt-5" v-if="!brand.percentage">
              ${{ brand.price }}
            </h6>
            <h6 class="text-white mt-5" v-if="brand.percentage">
              <del
                class="text-white"
                v-if="brand.percentage"
                style="color: #a59898; font-size: smaller; font-weight: 300"
                >${{ brand.price }}
              </del>
              <span class="text-white"> ${{ brand.discountPrice }}</span>
            </h6>
            <span class="more" @click="goToHome(brand.id)">
              <span class="viewDetail"> View Detail </span>
            </span>
          </div>
          <span v-if="brand.percentage" class="discountCar"
            ><span style="font-weight: 900; font-size: larger">
              {{ brand.percentage }}%
            </span>
            <span style="font-size: small">discount</span></span
          >
        </div>

        <!-- <span class="col-md-6 mt-5 imgHolder">
          <img
            :src="this.localDomain + '/car' + brand.image_path"
            class="carImg"
            :key="imageIndex"
          />
          <h4>{{ brand.name }}</h4>
          <h6 v-if="!brand.percentage">{{ brand.price }} $</h6>
          <h6 v-if="brand.percentage"> <del v-if="brand.percentage" style="color:#a59898 ;font-size: smaller;">{{ brand.price }} $</del> <span>{{ brand.price * (brand.percentage / 100) }} $</span></h6>
          
          <span class="more" @click="goToHome(brand.id)"> Learn More </span>

          <span v-if="brand.percentage" class="discountCar"
            ><span style="font-weight: 900; font-size: larger">
              {{ brand.percentage }}%
            </span>
            <span style="font-size: small">discount</span></span
          >
        </span> -->
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
      carList: [],
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
        this.carList.forEach((x) => {
          x.discountPrice = (x.price - x.price * (x.percentage / 100)).toFixed(
            2
          );
        });
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
.main {
  border-radius: 5%;
}

.mainCarImg {
  width: 104%;
  height: 223px;
}

.carImg {
  border-radius: 5%;
  margin-left: 0px;
  width: 92%;
  height: 75%;
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
.home {
  position: relative;
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

.home .more {
  cursor: pointer;
  color: black;
  position: absolute;
  bottom: 8%;
  left: 69%;
  width: 142px;
  background: white;
  height: 30px;
  text-align: center;
}

.home .discountCar {
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 75%;
  left: 4.4%;
  width: 83px;
  background: red;
  height: 55px;
  text-align: center;
}

.viewDetail {
  font-size: small;
  font-weight: 500;
}

.row {
  margin-left: 0px !important;
}
</style>
