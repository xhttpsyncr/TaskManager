<template>
  <ul class="task-list">
    <li v-for="task in tasks" :key="task.id" class="task-item">
      <input type="checkbox" :checked="task.completed" @change="$emit('toggle-task', task.id)" />
      <span :class="{ completed: task.completed }">{{ task.text }}</span>
      <button class="remove-btn" @click="$emit('remove-task', task.id)">Remove</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['tasks']
};
</script>

<style>
.task-list {
  list-style: none;
  padding: 0;
}
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.remove-btn {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
.remove-btn:hover {
  background: darkred;
}
</style>
