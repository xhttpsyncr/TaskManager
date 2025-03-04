// TaskManager.vue - Main task management component
<template>
  <div class="task-manager">
    <h1>Task Manager</h1>
    <div class="controls">
      <input v-model="newTask" placeholder="Add a new task" />
      <button @click="addTask">Add Task</button>
      <select v-model="filter">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
    <ul class="task-list">
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <input type="checkbox" :checked="task.completed" @change="toggleTask(task.id)" />
        <span :class="{ completed: task.completed }">{{ task.text }}</span>
        <button class="remove-btn" @click="confirmRemove(task.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      newTask: '', // Input field model for new task
      filter: 'all' // Default filter selection
    };
  },
  computed: {
    ...mapGetters(['allTasks', 'completedTasks', 'pendingTasks']),
    // Filter tasks based on selected filter
    filteredTasks() {
      if (this.filter === 'completed') return this.completedTasks;
      if (this.filter === 'pending') return this.pendingTasks;
      return this.allTasks;
    }
  },
  methods: {
    ...mapActions(['addTask', 'removeTask', 'toggleTask']),
    // Add a task if input is not empty
    addTask() {
      if (this.newTask.trim()) {
        this.$store.dispatch('addTask', this.newTask);
        this.newTask = '';
      }
    },
    // Confirm before removing a task
    confirmRemove(taskId) {
      if (confirm('Are you sure you want to remove this task?')) {
        this.removeTask(taskId);
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f4f4;
}
.task-manager {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 20px;
}
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input, select, button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  background: #007bff;
  color: white;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
.task-list {
  list-style: none;
  padding: 0;
  width: 80%;
}
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 12px;
  margin: 5px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: background 0.3s ease;
}
.task-item:hover {
  background: #f1f1f1;
}
.completed {
  text-decoration: line-through;
  color: gray;
  flex-grow: 1;
  font-weight: bold;
}
.remove-btn {
  background: #dc3545;
  border-radius: 8px;
  padding: 8px 10px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}
.remove-btn:hover {
  background: #c82333;
}
</style>
