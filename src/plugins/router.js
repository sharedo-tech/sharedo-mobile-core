import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

class Router { }

const useRouter = (routes, mode = "history", base = process.env.BASE_URL) => {
  Router.instance = new VueRouter({
    mode,
    base,
    routes
  });

  return Router.instance;
}

export {
  Router,
  useRouter
}