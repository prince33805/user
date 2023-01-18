<template>
  <v-carousel height="400">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://media.wired.com/photos/620eb0f39266d5d11c07b3c5/master/pass/Gear-Podcast-Gear-1327244548.jpg",
        },
        {
          src: "https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg",
        },
        {
          src: "https://www.apple.com/th/apple-watch-se/images/overview/hero/hero__fmx18j9bq0ya_large.jpg",
        },
        {
          src: "https://static.independent.co.uk/2022/06/15/11/baby%20monitors%20indybest%20copy.jpg?quality=75&width=982&height=726&auto=webp",
        },
      ],
    };
  },
};
</script>

<style></style>
