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
// import http from "../../../utils/http";
import api from "../../../utils/api";

export default{
  data(){
    return{
      
      name:"",  
      gmail:"",
      password:"",
      phone:"",
      imagePath:"",
      errorAlert:false,
      categoryForm:false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      tmpImagePath:"",
      rules: {
        required: value => !!value || "Required."
      },
      error: false,
    }
  },
  methods:{
    signIn(){
      alert("singin")
    },
    signUp(){
      alert("loading")
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        //   console.log(this.imageUrl), console.log(this.imageFile);
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    async register(){
      console.log(this.name)
        
        let respPosterData=null;
        if (this.imageFile !== "") {
        const respPoster = await utils.http.postMedia(
          "/user/file/create",
          this.imageFile,
          this.imageFile.type
        );
        if (respPoster.status === 200) {
            console.log(respPoster)
          respPosterData = await respPoster.text();
          console.log(respPosterData)
        } else {
        }
        } else {
          respPosterData = this.tmpImagePath;
        };
        if (respPosterData) {
          console.log(this.name)
          const resp = await utils.http.post("/user/register", {
            name: this.name,
            gmail: this.gmail,
            password: this.password,
            phone:this.phone,
            imagePath: respPosterData,
          });
          if(resp.status==200){
            console.log(resp)
            this.$router.push({ path: "/" });
          }else{
            // this.errorAlert=true;
            alert('Already exist gmail')
          }
        }
    }
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
      <div class="container ">
        <div class="welcome containerRegister">
                <v-form ref="categoryForm " v-model="categoryForm">
                    <input type="text" name="name" placeholder="name" v-model="name" >
                    <input type="email" name="email" placeholder="email" v-model="gmail">                   
                    <input type="password" name="password" placeholder="password" v-model="password">   
                    <input type="file" ref="image" accept="image/*" @change="onFilePicked" >
                    <img class="img" v-if="imageUrl != ''" :src="imageUrl"  contain>           
                    <input type="text" name="phone" placeholder="Phone Number" v-model="phone">        
                    <button @click="register">Register</button>
                </v-form>  
                  </div>
      </div>
    </div>
  </Header>
  <!-- <v-alert class="mt-3" v-show="errorAlert" dense type="error">
          Register Failed!
        </v-alert> -->
</template>

<style scoped>
.img {
  margin-left: 0px;
  max-width: 120px !important;
  max-height: 100px !important;

}
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

.containerRegister{
    width: 90%;
    max-width: 400px;
    margin:80px auto;
    border-radius: 20px;
    box-shadow: 2px 4px 6px rgba(28,6, 49, 0.1);
    /* background:black; */
}

button{
    text-decoration: none;
    background: yellow !important;
    font-weight: bold;
    border:1px solid #eee;
    border-radius: 28px !important;
    padding:10px 20px;
}

</style>
