<script setup>
import { onMounted } from "vue";
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import image from "@/assets/img/car-image.jpg";
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<script>
import utils from "../../../utils/utils";
export default {
  data() {
    return {
      gmail: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const resp = await utils.http.post("/user/login", {
        gmail: this.gmail,
        password: this.password,
      });
      if (resp.status == 200) {
        this.$router.push({ path: "/" });
      } else {
        alert("Invalid Gmail & Password");
      }
    },
  },
};
</script>
<template>
  <DefaultNavbar transparent />
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage: `url(${image})`,
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="welcome container">
          <form @submit.prevent="signUp">
            <!-- <input type="text" placeholder="displayname" v-model="displayName"> -->
            <input type="email" placeholder="email" v-model="gmail" />
            <input type="password" placeholder="password" v-model="password" />
            <div v-if="error" class="error">{{ error }}</div>
            <button @click="login">Login</button>
          </form>
        </div>
      </div>
    </div>
  </Header>
</template>

<style scoped>
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
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button {
  margin: 20px auto;
}

.container {
  width: 90%;
  max-width: 400px;
  margin: 30px auto;
  border-radius: 20px;
  box-shadow: 2px 4px 6px rgba(28, 6, 49, 0.1);
  /* background:black; */
}

button {
  text-decoration: none;
  background: #f25417 !important;
  font-weight: bold;
  border: 0;
  border-radius: 20px !important;
  padding: 10px 20px;
}
</style>
