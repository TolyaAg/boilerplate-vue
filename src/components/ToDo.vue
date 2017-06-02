<template>
  <li>
    {{ todo.text }} {{ text }} 
    <button @click="$emit('pick')">Delete</button>
  </li>
</template>

<script>
export default {
  name: 'todo',
  props: {
    todo: Array,
    text: String
  }
}
</script>