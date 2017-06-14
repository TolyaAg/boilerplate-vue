import Vuex from 'vuex';
import Vue from 'vue';
import { getAxios } from '../api/ajax';
import { url } from '../api/config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedProgramm: {},
        itemsProgramm: { items: [] },
        error: '',
        selectedRegion: {},
        itemsRegion: { items: [] },
        collabs: [],
        reason: '',
        adaptId: ''
    },

    mutations: {
        selectProgramm (state, programm) {
            state.selectedProgramm = programm;
        },

        getProgramms(state, programms) {
            state.itemsProgramm = programms;
        },

        getCollabs(state, collabs) {
            state.collabs = collabs;
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

        closeError(state) {
            state.error = ''
        },

        enterReason(state, reason) {
            state.reason = reason;
        },

        selectAdapt(state, adaptId) {
            state.adaptId = adaptId;
        }
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
        },

        getCollabs({ commit, state }) {
            const urlPath = url.createPath({ server_name: 'notStudy', action_name: 'Collabs' });
            const { selectedProgramm: {id: programm_id = ''} = {}, selectedRegion: {id: region_id = ''} = {} } = state;
            getAxios(urlPath, { programm_id, region_id })
            .then(resp => resp.data)
            .then(data => {
                if (data.error) {
                    commit('getError', data.error);
                } else {
                    commit('getCollabs', data.data);
              }
            });
        }
    }
})