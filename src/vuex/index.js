import { createStore } from "vuex";
import { getOperator } from "../request/operator";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: {},
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    async saveUser(state) {
      const result = await getOperator();
      console.log(result);
      state.user = result.data;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
});

export default store;
