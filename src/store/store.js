import Vuex from 'vuex';
import Vue from 'vue';
import { getAxios } from '../api/ajax';
import { url } from '../api/config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedProgramm: null,
        itemsProgramm: { items: [] },
        error: '',
        selectedRegion: null,
        itemsRegion: { items: [] },
    },

    mutations: {
        selectProgramm (state, programm) {
            state.selectedProgramm = programm;
        },

        getProgramms(state, programms) {
            state.itemsProgramm = programms;
        },

        getError(state, error) {
            state.error = error;
        },

        selectRegion (state, region) {
            state.selectedRegion = region;
        },

        getRegions(state, regions) {
            state.itemsRegion = regions;
        },
    },

    actions: {
        getProgramms({ commit }, search) {
            const urlPath = url.createPath({ server_name: 'notStudy', action_name: 'Programms' });
            getAxios(urlPath, { search })
            .then(resp => resp.data)
            .then(data => {
                if (data.error) {
                    commit('getError', data.error);
                } else {
                    commit('getProgramms', data);
              }
            });
        },

        getRegions({ commit }, search) {
            const urlPath = url.createPath({ server_name: 'notStudy', action_name: 'Regions' });
            getAxios(urlPath, { search })
            .then(resp => resp.data)
            .then(data => {
                if (data.error) {
                    commit('getError', data.error);
                } else {
                    commit('getRegions', data);
              }
            });
        }
    }
})