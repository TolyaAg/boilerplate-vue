import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		selectedProgramm: null,
		items: [ { id: 0, info: {name: "Tolya", subdiv: "study"} }, { id: 1, info: {name: "Savva", subdiv: "not_study"} }, { id: 2, info: {name: "Damir", subdiv: "not_study"} } ]
	}
})