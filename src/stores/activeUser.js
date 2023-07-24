import { defineStore } from "pinia";
export const activeUserStore = defineStore("activeUser", {
  state: () => ({
    id: 0,
    accessToken: "",
  }),
  getters: {},
  actions: {},
});
