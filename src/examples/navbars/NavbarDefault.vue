<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import MaterialButton from "@/components/MaterialButton.vue";
import html2pdf from "html2pdf.js";
import * as alertify from "alertifyjs";
const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "https://www.creative-tim.com/product/vue-material-kit",
      color: "bg-gradient-success",
      label: "Register",
    }),
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}
// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);
</script>

<script>
// import Email from "https://smtpjs.com/v3/smtp.js";
import utils from "../../utils/utils";
export default {
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "https://smtpjs.com/v3/smtp.js");
    document.head.appendChild(recaptchaScript);
  },

  data() {
    return {
      id: this.$route.params.id,
      localDomain: utils.constant.localDomain,
      carDetails: {},
      video: "",
      qty: 0,
      grandTotal: 0,
      cartList: [],
      showCart: false,
      user: false,
    };
  },

  async created() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      this.user = true;
    }
    this.getCartList();
  },

  methods: {
    getCartList() {
      this.cartList = JSON.parse(localStorage.getItem("order"));
      if (this.cartList.length > 0) {
        this.cartList.forEach((x) => {
          this.grandTotal = this.grandTotal + x.total;
        });
        this.showCart = true;
      } else {
        this.showCart = false;
      }
    },

    async order() {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (user) {
        this.user = true;
        let tmp = "<p>Hey " + user.userName + "</p>";
        this.cartList.forEach((x) => {
          tmp =
            tmp +
            "<p>Car Name: " +
            x.name +
            "; Quantity: " +
            x.quantity +
            "; Price: $" +
            x.total +
            "</p>";
        });
        tmp =
          tmp +
          "<p>Have a nice day!</p>" +
          "<p>Thank you<p>" +
          "<p>Car Guru Team</p>";
        Email.send({
          SecureToken: "79888d3d-3cbf-44ca-a4dd-8bb6076f3c01",
          To: user.email,
          From: "khantminthu199666@gmail.com",
          Subject: "Car Order Notification",
          Body: tmp,
        }).then((message) => alertify.success("Please Check Your Email"));

        let orderData = [];
        this.cartList.forEach((x) => {
          const orderTmp = {
            id : {
              carId: x.id,
            userId: user.id,
            },
            total: x.total,
            carQuantity: x.quantity,
          };
          orderData.push(orderTmp);
        });
        const respCar = await utils.http.post("/order/create", orderData);
        if (respCar.status === 200) {
          localStorage.removeItem("order");
          alertify.success("Order Success");
        }
        // html2pdf(document.getElementById("element-to-convert"), {
        //   margin: 1,
        //   filename: "CustomerOrder.pdf",
        // });
        this.cartList = [];
        this.showCart = false;
        localStorage.removeItem("order");
      } else {
        this.$router.push({ name: "signin-basic" });
      }
    },

    removeFromCart(index) {
      this.cartList.splice(this.cartList.indexOf(index), 1);
      localStorage.setItem("order", JSON.stringify(this.cartList));
      this.getCartList();
    },
    testdrive() {
      this.$router.push({ name: "test-drive" });
    },

    discount() {
      this.$router.push({ name: "discount" });
    },

    aboutUs() {
      this.$router.push({ name: "about" });
    },

    logout() {
      localStorage.clear();
      alertify.success("Logout Successful");
      this.user = false;
      this.$router.push({ name: "presentation" });
    },
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="[
          (props.transparent && textDark.value) || !props.transparent
            ? 'text-dark font-weight-bolder ms-sm-3'
            : 'text-white font-weight-bolder ms-sm-3',
        ]"
        :to="{ name: 'presentation' }"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        Car GuRu
      </RouterLink>
      <RouterLink
        class="navbar-brand d-block d-md-none"
        :class="
          props.transparent || props.dark
            ? 'text-white'
            : 'font-weight-bolder ms-sm-3'
        "
        to="/"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        Material Design
      </RouterLink>
      <a
        href="https://www.creative-tim.com/product/vue-material-kit-pro"
        class="btn btn-sm bg-gradient-success mb-0 ms-auto d-lg-none d-block"
        >Buy Now</a
      >
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-50 me-2 text-md"
                :class="getTextColor()"
                >dashboard</i
              >
              Pages
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <div
                        class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1"
                      >
                        Landing Pages
                      </div>

                      <RouterLink
                        :to="{ name: 'brand' }"
                        class="dropdown-item border-radius-md"
                      >
                        <i
                          class="material-icons opacity-50 me-2 text-md"
                          :class="getTextColor()"
                          >local_taxi</i
                        >
                        <span>Brand New</span>
                      </RouterLink>

                      <RouterLink
                        :to="{ name: 'used' }"
                        class="dropdown-item border-radius-md"
                      >
                        <i
                          class="material-icons opacity-50 me-2 text-md"
                          :class="getTextColor()"
                          >car_crash</i
                        >
                        <span>Used</span>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- test drvie -->
        <ul @click="testdrive()" class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-50 me-2 text-md"
                :class="getTextColor()"
                >directions_car</i
              >
              Test Drive
            </a>
          </li>
        </ul>

        <ul @click="discount()" class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-50 me-2 text-md"
                :class="getTextColor()"
                >monetization_on</i
              >
              Discount
            </a>
          </li>
        </ul>

        <ul @click="aboutUs()" class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-50 me-2 text-md"
                :class="getTextColor()"
                >diversity_3</i
              >
              About us
            </a>
          </li>
        </ul>
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-50 me-2 text-md mt-1"
                :class="getTextColor()"
                >shopping_cart</i
              >
            </a>
            <div
              v-if="showCart"
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <template v-for="(cart, index) in cartList" :key="index">
                        <div class="row">
                          <div class="col-3">
                            <img
                              :src="this.localDomain + '/car' + cart.image"
                              class="cartImg"
                              :key="imageIndex"
                            />
                          </div>
                          <div class="col-7">
                            <h6 style="font-size: smaller; margin-left: 3px">
                              {{ cart.name }}
                            </h6>
                            <span
                              span
                              style="font-size: smaller; margin-left: 3px"
                              >Quantity:
                            </span>
                            <span style="font-size: smaller">{{
                              cart.quantity
                            }}</span
                            ><br />
                            <span
                              span
                              style="font-size: smaller; margin-left: 3px"
                              >Price: </span
                            ><span style="font-size: smaller"
                              >${{ cart.total }} </span
                            ><br />
                          </div>
                          <div class="col-1">
                            <i
                              class="material-icons opacity-6 me-2 text-md mt-1"
                              :class="getTextColor()"
                              @click="removeFromCart(index)"
                              >close</i
                            >
                          </div>
                          <hr
                            style="
                              height: 2px;
                              border-width: 0;
                              color: gray;
                              background-color: gray;
                            "
                          />
                        </div>
                      </template>
                      <h5 class="text-center">Total</h5>
                      <h6 class="text-center">${{ this.grandTotal }}</h6>
                      <div class="row">
                        <div class="col-md-12 text-center">
                          <MaterialButton
                            @click="order()"
                            variant="gradient"
                            style="background-color: #e6e600; width: 200px"
                            class="mt-3 mb-0"
                            >Order</MaterialButton
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-50 me-2 text-md"
                :class="getTextColor()"
                >settings</i
              >
              Account
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <RouterLink
                        v-if="!this.user"
                        :to="{ name: 'signin-basic' }"
                        class="dropdown-item border-radius-md"
                      >
                        <i
                          class="material-icons opacity-50 me-2 text-md"
                          :class="getTextColor()"
                          >login</i
                        >
                        <span>Sign In</span>
                      </RouterLink>

                      <RouterLink
                        v-if="!this.user"
                        :to="{ name: 'register-basic' }"
                        class="dropdown-item border-radius-md"
                      >
                        <i
                          class="material-icons opacity-50 me-2 text-md"
                          :class="getTextColor()"
                          >app_registration</i
                        >
                        <span>Register</span>
                      </RouterLink>
                      <!-- User Profile -->
                      <RouterLink
                        v-if="this.user"
                        :to="{ name: 'about-user' }"
                        class="dropdown-item border-radius-md"
                      >
                        <i
                          class="material-icons opacity-50 me-2 text-md"
                          :class="getTextColor()"
                          >account_circle</i
                        >
                        <span>Profile</span>
                      </RouterLink>

                      <RouterLink
                        v-if="this.user"
                        :to="{ name: 'order' }"
                        class="dropdown-item border-radius-md"
                      >
                        <i
                          class="material-icons opacity-50 me-2 text-md"
                          :class="getTextColor()"
                          >list_alt</i
                        >
                        <span>Order</span>
                      </RouterLink>

                      <div v-if="this.user" @click="logout()">
                        <i
                          class="material-icons opacity-50 me-2 text-md"
                          style="margin-left: 10%"
                          :class="getTextColor()"
                          >logout</i
                        >
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
<style>
.cartImg {
  width: 45px;
  height: 37px;
  border-radius: 7%;
}
</style>
<!-- <script src="https://smtpjs.com/v3/smtp.js">
</script> -->
<!-- <script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
></script>
<script type="text/javascript">
(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init("BOJ88XuFYmJYIzo_7");
})();
</script> -->
