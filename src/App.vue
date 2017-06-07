<template>
  <div id="app" class="app">
    <div class="title">Контроль причин необученности сотрудников</div>
    <div class="container">
      <select-item placeholder="Выберите учебную программу" :items="itemsProgramm" :selectedItem="selectedProgramm" :save="selectProgramm"/>
    </div>
  </div>
</template>

<script>
import SelectItem from './components/SelectItem';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'selectedProgramm',
      'itemsProgramm'
    ])
  },
  methods: {
    ...mapMutations([
      'selectProgramm'
    ])
  },
  components: {
    SelectItem
  }
}
</script>

<style lang="scss">
  .app {
    box-shadow: 2px 2px 10px 0 #979797;
    font-family: Circular,Helvetica Neue,Helvetica,Arial,sans-serif;
    max-width: 1000px;
    margin: 0 auto;

    .title {
      background-color: #646464;
      line-height: 60px;
      color: #fff;
      padding-left: 8px;
    }

    .container {
      height: 200px;
      padding: 8px;
    }
  }
</style>
