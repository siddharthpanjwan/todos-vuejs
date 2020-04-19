import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;
const firebaseConfig = {
  apiKey: "AIzaSyC253MBHvdICSiArY4R0DEYfsleGNmpI-4",
  authDomain: "my-todos-app-a3ee6.firebaseapp.com",
  databaseURL: "https://my-todos-app-a3ee6.firebaseio.com",
  projectId: "my-todos-app-a3ee6",
  storageBucket: "my-todos-app-a3ee6.appspot.com",
  messagingSenderId: "622305076757",
  appId: "1:622305076757:web:164a2ebb3efbbc54a6501c",
  measurementId: "G-BHP8JFBQ96",
};
firebase.initializeApp(firebaseConfig);
let app;
firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
