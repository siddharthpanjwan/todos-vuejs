import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: ["dfsdf", "dsfdf"],
  },
  getters: {
    gettodos: (state) => {
      return state.todos;
    },
  },
  mutations: {
    addtodos: (state, todoss) => {
      state.todos = todoss;
    },
    todoposted: (state, todo) => {
      state.todos.push(todo);
    },
  },
  actions: {
    gettodosfromfirebase: (context) => {
      Axios.get("https://my-todos-app-a3ee6.firebaseio.com/todos.json").then(
        (res) => {
          console.log(res);
          const data = res.data;
          const mytodos = [];
          for (let key in data) {
            const todo = data[key];
            todo.id = key;
            mytodos.push(todo);
          }
          context.commit("addtodos", mytodos);
          console.log(mytodos);
        }
      );
    },
    posttodos: (context, todo) => {
      Axios.post("https://my-todos-app-a3ee6.firebaseio.com/todos.json", {
        todo: todo,
      })
        .then(function(response) {
          console.log(response);
          context.commit("todoposted", todo);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
});
