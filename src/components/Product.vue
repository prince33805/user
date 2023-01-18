<!-- eslint-disable -->
<template>
  <div class="c">
    <div class="label">
      <h4>showing all {{ length }} results</h4>
    </div>
    <!-- <h1>Hello Api Con</h1>
    <v-btn color="success" @click="newItemMode()">NewItem</v-btn> -->
    <v-row no-gutters>
      <v-col cols="4" v-for="(item, index) in apidata" :key="index">
        <v-card elevation="8" class="mx-16 pb-4">
          <v-img
            src="https://inwfile.com/s-ge/o0fctq.jpg"
            height="200px"
          ></v-img>
          <v-card-title class="my-2 mx-12">
            {{ item.product_name }}
          </v-card-title>
          <v-card-subtitle class="pl-16">
            $ <b> {{ item.price }}</b>
            <!-- <v-btn color="error" class="ml-16" text @click="decrement(item)"
              >-</v-btn
            >
            <b> {{ number }} </b>
            <v-btn color="info" text @click="increment(item)">+</v-btn> -->
          </v-card-subtitle>
          <v-card-actions class="mx-12">
            <v-btn color="info" @click="info(item._id)">Details</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="addCart(item)">Add Cart</v-btn>
          </v-card-actions>
        </v-card>
        <br /><br />
      </v-col>
    </v-row>
    <v-dialog v-model="dialogdetail" max-width="500px">
      <v-card>
        <v-card-title class="justify-center h4">
          {{ itemdata.product_name }}
        </v-card-title>
        <v-img
          src="https://inwfile.com/s-ge/o0fctq.jpg"
          height="200px"
          class="mb-6"
        ></v-img>

        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-card-text
                >Price : <b> $ {{ itemdata.price }} </b></v-card-text
              >
            </v-col>
            <v-col cols="6">
              <v-card-text>
                Category : <b> {{ itemdata.category }} </b></v-card-text
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-n4">
              <v-card-text>
                Description : {{ itemdata.description }}</v-card-text
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end pr-8 pb-8">
          <v-btn color="error" text @click="closeData()">close</v-btn>
          <!-- <v-btn color="success" @click="addCart(item)">Add Cart</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogedit" max-width="500px">
      <v-card>
        <v-card-title>{{ savemode }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                name="product_name"
                label="product_name"
                id="product_name"
                v-model="postdata.product_name"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="price"
                label="price"
                id="price"
                v-model="postdata.price"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="closeData()">cancel</v-btn>
          <v-btn color="success" text @click="selectSave()">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogdelete" max-width="500px">
      <v-card>
        <v-card-title> Delete it </v-card-title>
        <v-card-text> are you sure ? </v-card-text>
        <v-card-actions>
          <v-btn color="info" text @click="closeData()"> cancel </v-btn>
          <v-btn color="error" @click="deleteData()"> delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      length: "",
      apidata: [],
      itemdata: {
        product_name: "",
        price: "",
        quantity: "",
        sum: "",
      },
      itemdefault: {
        // ตัวเคลียค่าว่าง
        product_name: "",
        price: "",
        quantity: "",
        sum: "",
      },
      dialogedit: false,
      dialogdelete: false,
      dialogdetail: false,
      number: 1,
      postdata: {
        // ตัวส่งข้อมูลหลัก
        product_name: "",
        price: "",
        amount: "",
      },
      postdefault: {
        // ตัวเคลียค่าว่าง
        product_name: "",
        price: "",
        amount: "",
      },
    };
  },
  computed: {
    savemode() {
      // เข็คโหมดการบันทึกเรียลไทม์
      // eslint-disable-next-line eqeqeq
      return this.id == "" ? "New Item" : "Edit Item";
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("http://localhost:3000/user/").then((response) => {
        console.log(response.data);
        this.length = response.data.data.length;
        this.apidata = response.data.data;
      });
    },
    async postData() {
      // เพิ่มข้อมูล
      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/product/",
          this.postdata
        );
        alert(data.message);
        this.getData();
        this.postdata = { ...this.postdefault };
        this.dialogedit = false;
      } catch (err) {
        console.log(err);
      }
    },
    // *******************
    async addCart(item) {
      // เพิ่มcart
      this.id = item._id;
      this.itemdata = {
        product_name: item.product_name,
        price: item.price,
        quantity: 1,
      };
      // console.log(this.itemdata);
      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/cart/",
          this.itemdata
        );
        alert(data.message);
        // console.log(itemdata[]);
        this.itemdata = { ...this.itemdefault };
        this.dialogedit = false;
        location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteData() {
      // ลบข้อมูล
      try {
        const { data } = await this.axios.delete(
          "http://localhost:3000/product/" + this.id
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
    async putData() {
      // แก้ไขข้อมูล
      try {
        const { data } = await this.axios.put(
          "http://localhost:3000/product/" + this.id,
          this.postdata
        );
        alert(data.message);
        this.getData();
        this.postdata = { ...this.postdefault };
        this.dialogedit = false;
      } catch (err) {
        console.log(err);
      }
    },
    selectSave() {
      // ตัดสินใจบันทึกโหมดไหน
      // eslint-disable-next-line eqeqeq
      if (this.savemode == "Edit Item") {
        this.putData();
      } else this.postData();
    },
    newItemMode() {
      // กดปุ่มสร้างใหม่
      this.id = "";
      this.dialogedit = true;
    },
    editItemMode(item) {
      // กดปุ่มแก้ไข
      this.id = item._id;
      this.postdata = { ...item };
      this.dialogedit = true;
    },
    closeData() {
      // กดปุ่มปิด
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialogedit = false;
      this.dialogdelete = false;
      this.dialogdetail = false;
    },
    deleteItemMode(item) {
      // กดปุ่มแก้ไข
      this.id = item._id;
      this.dialogdelete = true;
    },
    increment(item) {
      console.log(item._id);
      // this.postdata.map((item)=>{

      // })
      // number.value++;
    },
    decrement(item) {
      console.log(item._id);
      // number.value--;
    },
    info(itemid) {
      // info
      console.log(itemid);
      this.axios
        .get("http://localhost:3000/product/" + itemid)
        .then((response) => {
          console.log(response.data);
          // this.length = response.data.data.length;
          this.itemdata = response.data.data;
          this.dialogdetail = true;
        });
    },
  },
};
</script>

<style scoped>
.c {
  margin-left: 250px;
  margin-right: 250px;
  /* border: 1px solid red; */
  /* text-align: center; */
}

.label {
  margin: 25px 50px;
}
</style>
