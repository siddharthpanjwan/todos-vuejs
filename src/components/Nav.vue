<template>
  <div>
    <!-- example 1 - using absolute position for center -->
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <a class="navbar-brand abs">Welcome {{name}}</a>

      <ul class="navbar-nav ml-auto">
        <li class="nav-item" @click="Logout">
          <a class="nav-link active btn btn-primary">Sign Out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  props: ["name"],
  methods: {
    Logout() {
      console.log("signout clicked");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
        });
    }
  }
};
</script>

<style>
@media (min-width: 768px) {
  .navbar-brand.abs {
    left: 0;
    text-align: center;
  }
}
</style>