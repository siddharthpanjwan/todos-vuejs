<template>
  <div>
    <navbar :name="name"></navbar>
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
        <div class="card-header text-center">My Todos</div>
        <ul class="list-group list-group-flush" v-for="(todo,index) in todos" :key="todo.id">
          <li class="list-group-item" :class="{'iscompleted':todo.iscompleted}">
            {{todo.todo}}
            <button
              class="float-right button btn btn-danger btn-sm"
              @click.prevent="deleteTodo(index)"
            >Remove</button>
            <button
              class="float-right button btn btn-info btn-sm"
              @click.prevent="todoCompleted(index)"
            >Completed</button>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<style>
.input-groups {
  margin-top: 30px;
}
.button {
  margin-left: 15px;
}
.iscompleted {
  text-decoration: line-through;
}
</style>

<script>
import navbar from "../components/Nav.vue";
import Axios from "axios";
import firebase from "firebase";

export default {
  components: { navbar },
  data() {
    return {
      iscompleted: false,
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
        const todo = { todo: this.todo, id: this.id, uid: this.uid };
        this.todos.push(todo);
        this.id += 1;
        Axios.post("https://my-todos-app-a3ee6.firebaseio.com/todos.json", {
          todo: this.todo,
          iscompleted: false,
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
    todoCompleted(index) {
      this.iscompleted = !this.iscompleted;
      this.todos[index].iscompleted = !this.todos[index].iscompleted;
      console.log(this.todos);
      Axios.put(
        "https://my-todos-app-a3ee6.firebaseio.com/todos.json",
        this.todos
      )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      Axios.put(
        "https://my-todos-app-a3ee6.firebaseio.com/todos.json",
        this.todos
      )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  created() {
    const user = firebase.auth().currentUser;
    if (user != null) {
      this.uid = user.uid;
      this.name = user.displayName;
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

