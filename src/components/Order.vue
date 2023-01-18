<template>
  <div class="c">
    <br /><br />
    <!-- <HelloWorld /> -->
    <!-- <br /><br /> -->

    <h3>Orders Table</h3>
    <br /><br />
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" style="width: 30%">Order Id</th>
            <th class="text-left">User name</th>
            <th class="text-left">Product name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">SUM</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item._id }}</td>
            <td>{{ item.orders_user }}</td>
            <td>{{ item.orders_product }}</td>
            <td>{{ item.orders_price }}</td>
            <td>{{ item.orders_amount }}</td>
            <td>{{ item.orders_sum }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
// import HelloWorld from "../components/HelloWorld.vue";

export default {
  components: {
    // HelloWorld,
  },
  data() {
    return {
      cart: [],
    };
  },
  created() {
    console.log("auth =", this.auth);
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("http://localhost:3000/order/").then((response) => {
        console.log(response.data);
        this.length = response.data.data.length;
        this.cart = response.data.data;
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
</style>
