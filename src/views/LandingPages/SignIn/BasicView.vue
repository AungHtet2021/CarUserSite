<script setup>
import { onMounted } from "vue";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import image from "@/assets/img/car-image.jpg";
// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<script>
import utils from "../../../utils/utils";
export default{
  data(){
    return{
      gmail:"",
      password:"",
    }
  },
  methods:{
    async login(){
      const resp = await utils.http.post("/user/login", {
            gmail: this.gmail,
            password: this.password,
          });
          if(resp.status==200){
            this.$router.push({ path: "/" });
          }else{
            alert('Invalid Gmail & Password')
          }
    },

  }
}
</script>
<template>
  <DefaultNavbar transparent />
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
        `url(${image})`
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
       
        <div class="welcome container">
                    <form @submit.prevent="signUp">
                    <!-- <input type="text" placeholder="displayname" v-model="displayName"> -->
                    <input type="email" placeholder="email" v-model="gmail">
                    <input type="password" placeholder="password" v-model="password">
                    <div v-if="error" class="error">{{ error }}</div>
                    <button @click="login">Login</button>
                  </form>
                  </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div
                class="copyright text-center text-sm text-white text-lg-start"
              >
                © {{ new Date().getFullYear() }}, made with
                <i class="fa fa-heart" aria-hidden="true"></i> by
                <a
                  href="https://www.creative-tim.com"
                  class="font-weight-bold text-white"
                  target="_blank"
                  >Creative Tim</a
                >
                for a better web.
              </div>
            </div>
            <div class="col-12 col-md-6">
              <ul
                class="nav nav-footer justify-content-center justify-content-lg-end"
              >
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com"
                    class="nav-link text-white"
                    target="_blank"
                    >Creative Tim</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/presentation"
                    class="nav-link text-white"
                    target="_blank"
                    >About Us</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/blog"
                    class="nav-link text-white"
                    target="_blank"
                    >Blog</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/license"
                    class="nav-link pe-0 text-white"
                    target="_blank"
                    >License</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Header>
</template>

<style>
.welcome{
    text-align: center;
    padding:20px 0;
}
.welcome form{
    width: 300px;
    margin: 20px auto;
}
.welcome label{
    display: block;
    margin:20px 0 10px;
}
.welcome input{
    width:100%;
    padding:10px;
    border-radius:20px;
    border:1px solid #eee;
    outline:none;
    color:#999;
    margin:10px auto;
}
.welcome span{
    font-weight:bold;
    text-decoration: underline;
    cursor:pointer;
}
.welcome button{
    margin:20px auto;
}

.container{
    width: 90%;
    max-width: 400px;
    margin:30px auto;
    border-radius: 20px;
    box-shadow: 2px 4px 6px rgba(28,6, 49, 0.1);
    /* background:black; */
}

button{
    text-decoration: none;
    background: #f25417 !important;
    font-weight: bold;
    border:0;
    border-radius: 20px !important;
    padding:10px 20px;
}

</style>
