<template>
  <div>
    <form>
      <div class="form-group col-md-5 offset-3">
        <label style="margin:20px 0px;">Enter Todos</label>
        <textarea v-model="todo" class="form-control"></textarea>
      </div>
      <div class="form-group col-md-6 offset-3">
        <button class="btn btn-primary" @click.prevent="addTodo">Add Todo</button>
      </div>
    </form>
    <div class="card">
      <div class="card-header">Quote</div>
      <div class="card-body">
        <p v-for="x in gettodos" :key="x.id">{{x.todo}}</p>
      </div>
    </div>
  </div>
</template>

<script>
//mport Axios from "axios";
//import { mapActions } from "vuex";
export default {
  data() {
    return {
      todo: ""
    };
  },
  methods: {
    addTodo() {
      this.$store.dispatch("posttodos", this.todo);
      this.$store.dispatch("gettodosfromfirebase");
    },
    computed: {
      gettodos() {
        return this.$store.getters.gettodos;
      }
    },
    created() {
      this.$store.dispatch("gettodosfromfirebase");
    }
  }
};
</script>

<style></style>
