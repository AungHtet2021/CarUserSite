<script setup>
// example components
import DefaultInfoCard from "../../../../examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../../../../examples/cards/blogCards/CenteredBlogCard.vue";
</script>

<script>
import utils from "../../../../utils/utils";
import api from "../../../../utils/api.js";

export default {
  props: ["userId"],
  data() {
    return {
      tmpImagePath: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      showForm: false,
      localDomain: utils.constant.localDomain,
      gmail: "",
      password: "",
      showError: false,
      userData: {},
      newUser: [],
    };
  },
  async created() {
    await this.getUser();
  },
  methods: {
    async getUser() {
      this.userData = JSON.parse(localStorage.getItem("currentUser"));
      //    console.log(this.userData.id)
      const resp = await utils.http.get("/user/get/user/" + this.userData.id);
      if (resp) {
        const data = await resp.json();
        // console.log(data);
        if (data) {
          this.newUser.id = data.id;
          this.newUser.name = data.name;
          this.newUser.gmail = data.gmail;
          this.newUser.password = data.password;
          this.newUser.phone = data.phone;
          this.imageUrl = this.localDomain + "/user" + data.imagePath;
          this.tmpImagePath = data.imagePath;
        }
      } else {
        // console.log("something wrong")
      }
    },

    async update() {
      if (true) {
        let respPosterData = null;
        if (this.imageFile !== "") {
          console.log(this.imageFile);
          const respPoster = await utils.http.postMedia(
            "/user/file/create",
            this.imageFile,
            this.imageFile.type
          );
          console.log("working");
          if (respPoster.status === 200) {
            respPosterData = await respPoster.text();
            console.log(respPosterData);
          } else {
          }
        } else {
          console.log("something wrong");
          respPosterData = this.tmpImagePath;
        }

        if (this.newUser.id == null) {
          if (respPosterData) {
            const resp = await utils.http.post("/user/create", {
              name: this.new.name,
              password: this.newAdmin.password,
              gmail: this.newAdmin.gmail,
              imagePath: respPosterData,
              // video: this.newAdmin.video
            });
            if (resp.status == 200) {
              console.log(resp);
              this.adminForm = false;
              this.$router.push({ path: "/" });
            } else {
              console.log("error");
            }
          }
        } else {
          if (respPosterData) {
            // console.log("workding")
            const resp = await api.update(
              "user/user/update/" + +this.newUser.id,
              {
                id: this.newUser.id,
                name: this.newUser.name,
                password: this.newUser.password,
                gmail: this.newUser.gmail,
                phone: this.newUser.phone,
                imagePath: respPosterData,
              }
            );
            console.log(resp);
            if (resp.status === 200) {
              this.newUser = {};
              this.imageName = "";
              this.imageFile = "";
              this.imageUrl = "";

              this.getUser();
              this.$router.push({ path: "/" });
            } else {
            }
          }
        }
      } else {
        // this.result = "Please check required fields";
        // this.showResult = true;
        console.log("something wrong");
      }
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
          console.log(this.imageUrl);
          console.log(this.imageFile);
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
  },
};
</script>
<template>
  <section class="py-3">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="row justify-content-start">
            <h2>User Profile</h2>
            <!-- <DefaultInfoCard           
             color="info"
           
              title="User Name"
              description=""></DefaultInfoCard> -->

            <div
              class="col-12"
              style="background-color: #794e41; border-radius: 8px"
            >
              <h4 class="text-white mt-1 px-3">User Name</h4>
              <!-- <h5 class="text-white mt-4 px-3 ">{{ newUser.name }}</h5> -->
              <input
                type="text"
                class="px-3 mb-4"
                style="border-radius: 8px; border-color: none"
                v-model="newUser.name"
              />

              <h4 class="text-white mt-1 px-3">Gmail</h4>
              <input
                type="text"
                class="px-3 mb-4"
                style="border-radius: 8px; border-color: none"
                v-model="newUser.gmail"
              />
              <!-- <h5 class="text-white mt-4 px-3 ">{{ newUser.gmail }}</h5> -->
              <h4 class="text-white mt-1 px-3">Phone Number</h4>
              <input
                type="number"
                class="px-3 mb-4"
                style="border-radius: 8px; border-color: none"
                v-model="newUser.phone"
              />
            </div>
            <button @click="update">Update Profile</button>
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <div class="col-8">
            <img
              class="img"
              :key="imageIndex"
              v-if="imageUrl != ''"
              :src="imageUrl"
              width="200"
              height="150"
              contain
            />
            <label for="file">User Profile Image</label> <br />
            <input
              type="file"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />

            <!-- <v-img
              class="img"
              v-if="imagePath != ''"
              :src="imagePath"
              width="200"
              height="150"
              contain
            >
            </v-img> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
button {
  text-decoration: none;
  background: #00a602;
  font-weight: bold;
  border: 1px solid #eee;
  border-radius: 20px !important;
  padding: 10px 20px;
}
</style>
