import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    storeTodos(state, data) {
      state.todos = data
    },

    storeTodo(state, data) {
      const index = state.todos.findIndex(todo => todo.id === data.id)

      if(index >= 0) {
        state.todos.splice(index, 1, data)
      } else {

        state.todos.push(data)
      }

    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)

      if(index >= 0) {
        state.todos.splice(index, 1)
      } 

    }
  },
  actions: {
    getTodos({commit}) {
      return axios.get('http://localhost:3000/todos')
      .then((response) => {
        commit('storeTodos', response.data)
        console.log(response.data)
      })
      
    },

    addTodo({commit}, data) {
      axios.post('http://localhost:3000/todos', data).then((response) => commit('storeTodo', response.data))
    },

    updateTodo({commit},{id, data}) {
      axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => commit('storeTodo', response.data))
    }, 
    removeTodo({commit},id) {
      axios.delete(`http://localhost:3000/todos/${id}`)
        .then((response) => {
          commit('deleteTodo', response.id)
        })
    }
  },
  getters: {
  },
  modules: {
  }
})
