import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import Shop from "../views/Shop.vue";
import Order from "../views/Order.vue";
import Manage from "../views/Manage.vue";
// import Layout from '../views/Layout.vue'
// import AboutView from '../views/AboutView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "",
    name: "layout",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Layout.vue"),
    children: [
      {
        path: "/",
        name: "shop",
        component: Shop,
      },
      {
        path: "/order",
        name: "order",
        component: Order,
      },
      {
        path: "/manage",
        name: "manage",
        component: Manage,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
