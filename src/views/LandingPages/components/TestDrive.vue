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
    };
  },
  async created() {
    await this.getAllCars();
  },

  methods: {
    validation() {
      var gmail = document.getElementById("gmail");
      var name = document.getElementById("name");
      var requestDate = document.getElementById("requestDate");
      var country = document.getElementById("country");
      var gender = document.getElementById("gender");
      var phone = document.getElementById("phone");

      if (name.value.trim() == "") {
        name.style.border = "solid 3px red";
        document.getElementById("blankName").style.visibility = "visible";
        return false;
      } else if (gmail.value.trim() == "") {
        gmail.style.border = "solid 3px red";
        document.getElementById("blankEmail").style.visibility = "visible";
        return false;
      }
      else if (date.value.trim() == "") {
        date.style.border = "solid 3px red";
        document.getElementById("blankDate").style.visibility = "visible";
        return false;
      }
      else if (country.value.trim() == "") {
        country.style.border = "solid 3px red";
        document.getElementById("blankCountry").style.visibility = "visible";
        return false;
      } else if (gender.value.trim() == "") {
        gender.style.border = "solid 3px red";
        document.getElementById("blankGender").style.visibility = "visible";
        return false;
      } else if (phone.value.trim() == "") {
        phone.style.border = "solid 3px red";
        document.getElementById("blankPhone").style.visibility = "visible";
        return false;
      }
      return true;
    },
    async testDriveRequest() {
      if(this.validation()){
        const resp = await utils.http.post("/testDrive/create", {
        name: this.name,
        gmail: this.gmail,
        requestDate: this.requestDate,
        country: this.country,
        gender: this.gender,
        phone: this.phone.toString(),
        carId: this.carId,
      });
      if (resp.status == 200) {
        alert("Test Drive Request Success");
      }
      }
    },
    async getAllCars() {
      const resp = await api.get("car/testdrive");
      if (resp) {
        this.carList = await resp.json();
        this.carList.forEach((x) => {
          x.discountPrice = (x.price - x.price * (x.percentage / 100)).toFixed(
            2
          );
        });
        console.log(this.carList);
      } else {
        console.log("something wrong");
      }
    },

    select(id) {
      alert(id);
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
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3
            class="text-white z-index-1 position-relative"
            style="margin-top: 10%"
          >
            Test Drive
          </h3>
          <p class="text-white opacity-8 mb-0">
            Please leave your contact information, we will get in touch with
            you.
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-6" style="margin-top: 1%">
          <form @submit.prevent="signUp">
            <div class="row">
              <div class="col-6">
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  v-model="name"
                />
                <span id="blankName" style="color: red; visibility: hidden"
                  >Please Fill the Name!</span
                >
              </div>
              <div class="col-6">
                <input
                  type="email"
                  id="gmail"
                  placeholder="email"
                  v-model="gmail"
                />
                <span id="blankEmail" style="color: red; visibility: hidden"
                  >Please Fill the Email!</span
                >
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-6">
                <input
                  type="date"
                  id="date"
                  placeholder="Request Date"
                  v-model="requestDate"
                />
                <br/>
                <span id="blankDate" style="color: red; visibility: hidden"
                  >Pls Fill the Request Date!</span
                >
              </div>
              <div class="col-6">
                <select v-model="country" id="country">
                  <option disabled value="">Please select Country</option>
                  <option>Myanmar</option>
                  <option>Japan</option>
                </select>
                <br/>
                <span id="blankCountry" style="color: red; visibility: hidden"
                  >Pls Fill the Country!</span
                >
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-6">
                <select v-model="gender" id="gender">
                  <option disabled value="">Please select one</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <br/>
                <span id="blankGender" style="color: red; visibility: hidden"
                  >Pls Fill the Gender!</span
                >
              </div>
              <div class="col-6">
                <input
                  type="number"
                  id="phone"
                  placeholder="Phone"
                  v-model="phone"
                />
                <br/>
                <span id="blankPhone" style="color: red; visibility: hidden"
                  >Pls Fill the Phone!</span
                >
              </div>
            </div>
            <div v-if="error" class="error">{{ error }}</div>
            <button @click="testDriveRequest">Test Drive Request</button>
          </form>
        </div>
        <div class="col-6">
          <div class="row">
            <template v-for="(car, index) in carList" :key="index">
              <div class="col-4">
                <input
                  style="min-width: 10px; width: 20px; height: 20px"
                  type="radio"
                  v-model="carId"
                  name="carId"
                  :value="car.id"
                />
                <br />
                <img
                  :src="this.localDomain + '/car' + car.image_path"
                  class="testCarImg"
                  :key="imageIndex"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
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
