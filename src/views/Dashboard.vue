<template>
  <form>
    <div class="input-group">
      <input
        type="text"
        placeholder="What needs to be done ?"
        class="form-control offset-md-4 col-md-3 input-groups"
        v-model="todo"
      />
      <span>
        <button class="btn btn-primary input-groups" @click.prevent="addTodo">Add Todo</button>
      </span>
    </div>
    <div class="card offset-md-4 col-md-4 input-groups">
      <div class="card-header text-center">Todos</div>
      <ul class="list-group list-group-flush" v-for="(todo,index) in todos" :key="todo.id">
        <li class="list-group-item">
          {{todo.todo}}
          <button
            class="float-right button btn btn-danger btn-sm"
            @click.prevent="deleteTodo(index,todo.id)"
          >Remove</button>
          <button class="float-right button btn btn-info btn-sm">Completed</button>
        </li>
      </ul>
    </div>
  </form>
</template>

<style>
.input-groups {
  margin-top: 30px;
}
.button {
  margin-left: 15px;
}
</style>

<script>
import Axios from "axios";
import firebase from "firebase";

export default {
  data() {
    return {
      todo: "",
      id: 2,
      todos: [],
      name: null,
      uid: ""
    };
  },
  methods: {
    addTodo() {
      if (this.todo === "") {
        alert("please enter something");
      } else {
        const todo = { todo: this.todo, id: this.id };
        this.todos.push(todo);
        this.id += 1;
        Axios.post("https://my-todos-app-a3ee6.firebaseio.com/todos.json", {
          todo: this.todo,
          uid: this.uid
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
    deleteTodo(index, id) {
      console.log(id);
      this.todos.splice(index, 1);
      firebase
        .database()
        .ref("todos/" + id)
        .remove()
        .then(() => {
          console.log("removed successfully");
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    Logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
        });
    }
  },
  created() {
    const user = firebase.auth().currentUser;
    if (user != null) {
      this.uid = user.uid;
      this.todoname = user.displayName;
      console.log(name);
    }
    Axios.get("https://my-todos-app-a3ee6.firebaseio.com/todos.json").then(
      res => {
        console.log(res);
        const data = res.data;
        const mytodos = [];
        for (let key in data) {
          const todo = data[key];
          todo.id = key;
          if (todo.uid === this.uid) {
            mytodos.push(todo);
          }
        }
        this.todos = mytodos;
      }
    );
  }
};
</script>

