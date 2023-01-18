<template>
  <div class="">
    <!-- <h2>banner curasor</h2> -->
    <Banner />
    <Sidebar />
    <Product />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import Sidebar from "../components/Sidebar.vue";
import Product from "../components/Product.vue";

export default {
  components: {
    Banner,
    Sidebar,
    Product,
  },
};
</script>

<style lang="scss" scoped>
// .container {
//   width: 100%;
//   padding-right: 250px;
//   padding-left: 250px;
//   margin-right: auto;
//   margin-left: auto;
//   border: 1px solid red; // }
</style>
