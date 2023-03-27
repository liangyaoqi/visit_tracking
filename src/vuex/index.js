import { createStore } from "vuex";

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
    saveUser(state, user) {
      state.user = user;
    },
  },
});

export default store;
