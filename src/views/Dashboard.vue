<template>
  <div class="container">
    <h4 class="text-center">Todos</h4>
    <h5>welcome {{name}}</h5>

    <form>
      <div class="form-group">
        <label>Enter Todo</label>
        <input class="form-control col-md-4" v-model="todo" type="text" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary col-md-4" @click.prevent="addTodo">Submit</button>
      </div>
    </form>
    <p v-for="todo in todos" :key="todo.id">{{ todo }}</p>
  </div>
</template>

<script>
import Axios from "axios";
import firebase from "firebase";

export default {
  data() {
    return {
      todo: "",
      id: 2,
      todos: [],
      name: null
    };
  },
  methods: {
    addTodo() {
      const todo = { todo: this.todo, id: this.id };
      this.todos.push(todo);
      this.id += 1;
      Axios.post("https://my-todos-app-a3ee6.firebaseio.com/todos.json", {
        todo: this.todo
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.todo = "";
    }
  },
  created() {
    Axios.get("https://my-todos-app-a3ee6.firebaseio.com/todos.json").then(
      res => {
        console.log(res);
        const data = res.data;
        const mytodos = [];
        for (let key in data) {
          const todo = data[key];
          todo.id = key;
          mytodos.push(todo);
        }
        this.todos = mytodos;
      }
    );

    const user = firebase.auth().currentUser;
    if (user != null) {
      this.todoname = user.displayName;
      console.log(name);
    }
  }
};
</script>

<style>
</style>