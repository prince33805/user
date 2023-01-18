<template>
  <div>
    <v-app-bar app color="purple" dark class="c">
      <div class="d-flex align-center pl-4">
        <v-icon>mdi-store-outline</v-icon>
        <h1>SHOPPERs</h1>
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn href="/" text>
        <span class="mr-2">Home</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn href="/manage" text>
        <span class="mr-2">Manage</span>
        <v-icon>mdi-folder-edit-outline</v-icon>
      </v-btn>
      <v-btn href="/order" text>
        <span class="mr-2">Order</span>
        <v-icon>mdi-archive-edit-outline</v-icon>
      </v-btn>
      <v-btn target="_blank" text @click="CartMode()">
        <span class="mr-2">Cart</span>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
      <v-btn target="_blank" text @click="LoginMode()" v-if="!auth">
        <span class="mr-2">Login</span>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
      <v-btn target="_blank" text @click="LoginMode()" v-else>
        <span class="mr-2">{{ username }}</span>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer right v-model="drawer" absolute bottom temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h3"> Cart </v-list-item-title>
          <!-- <v-icon>mdi-store-outline</v-icon> -->
          <v-list-item-subtitle class="pl-2 my-2">
            item : <b> {{ length }} </b>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-col v-for="(item, index) in cart" :key="index">
          <!-- <v-list-item-content>
            <v-list-item-title>{{ item.product_name }}</v-list-item-title>
          </v-list-item-content> -->
          <v-card elevation="8">
            <v-row class="mx-4 my-2">
              <v-row class="my-2">
                <v-card-title>
                  {{ item.product_name }}
                </v-card-title>
              </v-row>
              <v-spacer></v-spacer>
              <v-row>
                <v-card-title> $ {{ item.price }} </v-card-title>
                <v-card-title> Q : {{ number }} </v-card-title>
              </v-row>
            </v-row>
            <v-row class="ml-2 pb-8 justify-start">
              <!-- <h4>Quantity : {{ number }}</h4> -->
              <v-btn color="error" text @click="decrement(item)">Delete</v-btn>
              <!-- <v-btn color="info" text @click="increment(item)">+</v-btn> -->
            </v-row>
          </v-card>
        </v-col>
      </v-list>
      <!-- <br /> -->
      <!-- <v-divider></v-divider> -->
      <!-- <br /> -->
      <v-list class="ml-16 pl-14">
        <v-btn color="success" @click="checkout()">checkout</v-btn>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialoglogin" max-width="500px">
      <v-card>
        <v-toolbar flat color="purple">
          <v-icon>mdi-account</v-icon>
          <!-- v-if auth else ....  -->
          <v-toolbar-title class="font-weight-light">Loggin</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <!-- <v-card-title>{{ savemode }}</v-card-title> -->
        <v-card-text>
          <v-text-field
            color="white"
            label="Username"
            name="username"
            id="username"
            v-model="postdata.username"
          ></v-text-field>
          <v-text-field
            color="white"
            label="Password"
            name="password"
            id="password"
            v-model="postdata.password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="mt-n8 pb-4 ml-2">
          <v-btn color="success" @click="postData()">Login</v-btn>
          <v-btn color="error" text @click="closeData()">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      username: "",
      length: "",
      auth: false,
      drawer: false,
      dialoglogin: false,
      cart: [],
      number: 1,
      postdata: {
        // ตัวส่งข้อมูลหลัก
        username: "",
        password: "",
      },
    };
  },
  created() {
    console.log("auth =", this.auth);
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("http://localhost:3000/cart/").then((response) => {
        console.log(response.data);
        this.length = response.data.data.length;
        this.cart = response.data.data;
      });
    },
    async postData() {
      // login
      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/index/login",
          this.postdata
        );
        alert(data.message);
        this.username = data.data.username;
        console.log(this.username);
        this.auth = true;
        console.log("auth =", this.auth);
        this.postdata = { ...this.postdefault };
        this.dialoglogin = false;
      } catch (err) {
        console.log(err);
        alert(
          "username or password are not correct , please check and loggin again"
        );
      }
    },
    LoginMode() {
      // กดปุ่มสร้างใหม่
      this.id = "";
      this.dialoglogin = true;
    },
    closeData() {
      // กดปุ่มปิด
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialoglogin = false;
      this.dialogdelete = false;
    },
    CartMode() {
      // กดปุ่มสร้างใหม่
      this.id = "";
      this.drawer = true;
    },
    increment(item) {
      console.log(item._id);
      // this.postdata.map((item)=>{

      // })
      // number.value++;
    },
    // decrement(item) {
    //   console.log(item._id);
    //   // number.value--;
    // },
    async decrement(item) {
      // ลบข้อมูล
      this.id = item._id;
      try {
        const { data } = await this.axios.delete(
          "http://localhost:3000/cart/" + this.id
        );
        alert(data.message);
        this.getData();
        this.id = "";
        this.postdata = { ...this.postdefault };
        this.dialogedit = false;
        this.dialogdelete = false;
      } catch (err) {
        console.log(err);
      }
    },
    // **************************
    async checkout() {
      // checkout
      try {
        for (let i = 0; i < this.cart.length; i++) {
          console.log(this.cart[i].product_name);
          this.itemdata = {
            user: "user1",
            product: this.cart[i].product_name,
            amount: this.cart[i].quantity,
            price: this.cart[i].price,
            sum: this.cart[i].sum,
          };
          const { data } = await this.axios.post(
            "http://localhost:3000/order",
            this.itemdata
          );
          // alert(data.message);
          console.log(data.message);
          this.id = this.cart[i]._id;
          await this.axios.delete("http://localhost:3000/cart/" + this.id);
        }
        location.reload();
      } catch (err) {
        console.log(err);
        alert("error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c {
  // width: 100%;
  padding-right: 250px;
  padding-left: 250px;
  // margin-right: auto;
  // margin-left: auto;
  // text-align: center;
  // border: 1px solid red;
}
</style>
