<script setup>
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import { onMounted } from "vue";
import setMaterialInput from "@/assets/js/material-input";
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
      list: [
        {
          id: 1,
          name: "KMT1",
        },
        {
          id: 2,
          name: "KMT2",
        },
        {
          id: 1,
          name: "KMT3",
        },
      ],
    };
  },

  async created() {
    await this.getAllCars();
    const tmp = this.list.forEach((x) => {
      id: x.id;
    });

    const add = {};
    const genres = {};
    let arr = [];
    this.list.forEach((genre, index) => {
      if (genre.id == genre.id) {
        arr.push(genre);
      }
      genres[genre.id] = arr;
      this.list.splice(index, 1);
    });
    console.log(genres);
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

          <h5 class="text-white mt-6">BMW3</h5>
          <span span style="font-size: smaller; margin-left: 3px"
            >Quantity: </span
          ><span style="font-size: smaller">2</span><br />
          <span span style="font-size: smaller; margin-left: 3px">Price: </span
          ><span style="font-size: smaller"> $12000</span>
          <hr
            style="
              height: 2px;
              border-width: 0;
              color: gray;
              background-color: gray;
            "
          />
        </div>
      </div>

      <div class="row"></div>
    </div>
  </section>
</template>

<style scoped>
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
  background: #00a602;
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
