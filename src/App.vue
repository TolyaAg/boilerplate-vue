<template>
  <div id="app">
    <h1>Изначальное сообщение: {{ message }}</h1>
    <h1>Перевернутое сообщение: {{ reversedMessage }}</h1>
    <p v-if="seen">Сейчас меня видно</p>
    <ol v-if="todos.length > 0">
      <todo
        v-for="(todo, index) of todos"
        :key="index"
        :todo="todo"
        :text="'Hello'"
        @pick="todos.splice(index,1)">
      </todo>
    </ol>
    <button :disabled=false @click.stop="reverseMessage">Обратить порядок букв в сообщении</button>
    <input v-model="message"/>
    <br>
    <button @click="seen = !seen">Изменить видимость</button>
    <br>
    <input type="radio" id="one" value=true v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value=false v-model="picked">
    <label for="two">Two</label>
    <br>
    <span>Выбрано: {{ picked }}</span>
  </div>
</template>

<script>
import todo from './components/ToDo';

export default {
  name: 'app',
  data () {
    return {
      message: 'Welcome to Your Vue.js',
      seen: true,
      todos: [
        { id: 1, text: 'Посадить дерево' },
        { id: 2, text: 'Построить дом' },
        { id: 3, text: 'Вырастить сына' }
      ],
      picked: '',
      
      changeShow: () => {
        this.seen = !this.seen;
      }
    }
  },
  computed: {
    reversedMessage () {
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    reverseMessage () {
      this.message = this.message.split('').reverse().join('')
    }
  },
  components: {
    todo
  }
}
</script>