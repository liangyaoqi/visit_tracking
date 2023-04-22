import { createStore } from "vuex";
import { getOperator } from "../request/operator";
import { updateOperator } from "../request/operator";
import { getOperatorById } from "../request/operator";

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
      console.log("saveUser");
      const result = await getOperator();
      state.user = result.data;
      console.log(state);
    },
    clearUser(state) {
      state.user = {};
    },
    async updateUser(state, id) {
      const result = await getOperatorById(id);
      state.user = result.data;
      console.log(state.user);
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
});

export default store;
