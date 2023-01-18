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
    validation(){
      var name=document.getElementById("name");
      var email=document.getElementById("email");
      var password=document.getElementById("password");
      var image=document.getElementById("image");
      var phone=document.getElementById("phone");

      if(name.value.trim()==""){
        // alert("blank nameqwqwqwq");
        name.style.border="solid 3px red"
        document.getElementById("blankName").style.visibility="visible";
        return false;
      }
      else if(email.value.trim()==""){
        email.style.border="solid 3px red"
        document.getElementById("blankEmail").style.visibility="visible";
        return false;
      }
      else if(password.value.trim()==""){
        password.style.border="solid 3px red"
        document.getElementById("blankPassword").style.visibility="visible";
        return false;
      }
      else if(image.value.trim()==""){
        image.style.border="solid 3px red"
        document.getElementById("blankImage").style.visibility="visible";
        return false;
      }
      else if(phone.value.trim()==""){
        phone.style.border="solid 3px red"
        document.getElementById("blankPhone").style.visibility="visible";
        return false;
      }
      return true;
      
    },
    async register(){
    
       
        let respPosterData=null;
        if(this.validation()){
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
        }else{
          // console.log("fill all fields")
          // alert("Fill all fields")
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
            this.$router.push({ name: "signin-basic" });
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
      <span class="mask bg-gradient-dark opacity-3"></span>
      <div class="container ">
        <div class="welcome containerRegister">
                <v-form ref="categoryForm " v-model="categoryForm">
                    <input type="text" id="name" placeholder="name" v-model="name" >
                    <!-- <label id="bname" style="color:red; visibility: hidden;" >Invalid</label> -->
                    <span id="blankName" style="color:red; visibility: hidden;" >Pls Fill the Name!</span>
                    <input type="email" id="email" placeholder="email" v-model="gmail">   
                    <span id="blankEmail" style="color:red; visibility: hidden;" >Pls Fill the Email!</span>                
                    <input type="password" id="password" placeholder="password" v-model="password">  
                    <span id="blankPassword" style="color:red; visibility: hidden;" >Pls Fill the Password!</span> 
                    <input type="file" id="image" ref="image" accept="image/*" @change="onFilePicked" >
                    <span id="blankImage" style="color:red; visibility: hidden;" >Pls Fill the User Profile!</span>
                    <img class="img" v-if="imageUrl != ''" :src="imageUrl"  contain>           
                    <input type="number" id="phone" placeholder="Phone Number" v-model="phone">    
                    <span id="blankPhone" style="color:red; visibility: hidden;" >Pls Fill the PhoneNumber!</span>
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
    padding: 0;
}
.welcome form{
    width: 300px;
    margin: 2px auto;
}
.welcome span{
    display: block;
    margin:1px 0 1px;
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
/* .welcome span{
    font-weight:bold;
    text-decoration: none;
    cursor:pointer;
} */
.welcome button{
    margin:center !important;
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
    background: #00a602;
    font-weight: bold;
    border:1px solid #eee;
    border-radius: 28px !important;
    padding:10px 20px;
}

</style>
