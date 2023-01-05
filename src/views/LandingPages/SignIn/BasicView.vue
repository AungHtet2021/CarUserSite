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
      showError:false,
    }
  },
  methods:{
    validation(){
      var email=document.getElementById("email");
      var password=document.getElementById("password");

       if(email.value.trim()==""){
        email.style.border="solid 3px red"
        document.getElementById("blankEmail").style.visibility="visible";
        return false;
      }
      else if(password.value.trim()==""){
        password.style.border="solid 3px red"
        document.getElementById("blankPassword").style.visibility="visible";
        return false;
      }
      return true;
    },
    async login(){
        if(this.validation()){
          const resp = await utils.http.post("/user/login", {
            gmail: this.gmail,
            password: this.password,
          });
          if(resp.status==200){
            this.$router.push({ path: "/" });
          }else{
            alert('Invalid Gmail & Password')
          }
        }else{

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
                    <input type="email" id="email" placeholder="email" v-model="gmail">
                    <span id="blankEmail" style="color:red; visibility: hidden;" >Pls Fill the Email!</span>
                    <input type="password" id="password" placeholder="password" v-model="password">
                    <span id="blankPassword" style="color:red; visibility: hidden;" >Pls Fill the Password!</span>
                    <div v-if="error" class="error">{{ error }}</div>
                    <button @click="login">Login</button>
                  </form>
                  </div>

      </div>
    
    </div>
  </Header>
</template>

<style scoped>
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
  display: block;
    margin:1px 0 1px;
}
.welcome button{
  margin:center !important;
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
    background:#00a602;
    font-weight: bold;
    border:1px solid #eee;
    border-radius: 20px !important;
    padding:10px 20px;
}

</style>
