// store/index.js - Vuex store setup
import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [] // Array to store task objects
  },
  mutations: {
    // Mutation to add a new task
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    // Mutation to remove a task by ID
    REMOVE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    // Mutation to toggle task completion status
    TOGGLE_TASK(state, taskId) {
      const task = state.tasks.find(task => task.id === taskId);
      if (task) task.completed = !task.completed;
    }
  },
  actions: {
    // Action to add a task by committing ADD_TASK mutation
    addTask({ commit }, text) {
      const task = { id: Date.now(), text, completed: false };
      commit('ADD_TASK', task);
    },
    // Action to remove a task by committing REMOVE_TASK mutation
    removeTask({ commit }, taskId) {
      commit('REMOVE_TASK', taskId);
    },
    // Action to toggle task completion by committing TOGGLE_TASK mutation
    toggleTask({ commit }, taskId) {
      commit('TOGGLE_TASK', taskId);
    }
  },
  getters: {
    // Getter to retrieve all tasks
    allTasks: state => state.tasks,
    // Getter to retrieve completed tasks only
    completedTasks: state => state.tasks.filter(task => task.completed),
    // Getter to retrieve pending tasks only
    pendingTasks: state => state.tasks.filter(task => !task.completed)
  }
});
