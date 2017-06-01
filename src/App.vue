<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <p v-if="seen">Сейчас меня видно</p>
    <ol>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ol>
    <button v-on:click="reverseMessage">Обратить порядок букв в сообщении</button>
    <input v-model="message">
</div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      message: 'Welcome to Your Vue.js',
      seen: true,
      todos: [
        { text: 'Посадить дерево' },
        { text: 'Построить дом' },
        { text: 'Вырастить сына' }
      ],
      reverseMessage: () => {
         this.message = this.message.split('').reverse().join('')
       }
    }
  }
}
</script>