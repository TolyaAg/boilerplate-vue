<template>
  <li>
    <input v-model="todo.text"/> {{text}}
    <button @click="$emit('pick')">Delete</button>
  </li>
</template>

<script>
export default {
  name: 'todo',
  props: {
    todo: Object,
    text: {type:String, default: "No Text"}
  }
}
</script>