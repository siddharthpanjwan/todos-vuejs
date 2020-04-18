<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="user.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="user.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-2 offset-md-5">
                  <button type="submit" class="btn btn-primary btn-block" @click="login">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import firebase from "firebase";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      error: "testing"
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          this.$router.replace("/dashboard");
          console.log(data);
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
<style scoped>
</style>
