import Vuex from 'vuex';
import Vue from 'vue';
import { getAxios, postAxios, postVue, getVue } from '../api/ajax';
import { getTemplate } from '../api/servers.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedProgramm: {},
        itemsProgramm: { items: [] },
        error: '',
        success: '',
        selectedRegion: {},
        itemsRegion: { items: [] },
        collabs: [],
        reason: '',
        adaptId: '',
        oldReason: ''
    },

    getters: {
        splitReasons: state => {
            return state.oldReason.split(';');
        }
    },

    mutations: {
        selectProgramm: (state, programm) => {
            state.selectedProgramm = programm;
        },

        getProgramms: (state, programms) => {
            state.itemsProgramm = programms;
        },

        getCollabs: (state, collabs) => {
            state.collabs = collabs;
        },

        getError: (state, error) => {
            state.error = error;
        },

        getSuccess: (state, success) => {
            const filterCollabs = state.collabs.map((collab) => {
                if (state.adaptId == collab.id) {
                    collab.isEntered = true;
                }
                return collab;
            });
            state.collabs = filterCollabs;
            state.success = success;
            setTimeout(function() { state.success = '' }, 1000);
        },

        selectRegion: (state, region) => {
            state.selectedRegion = region;
        },

        getRegions: (state, regions) => {
            state.itemsRegion = regions;
        },

        closeError: (state) => {
            state.error = ''
        },

        enterReason: (state, reason) => {
            state.reason = reason;
        },

        selectAdapt: (state, { adaptId, oldReason }) => {
            state.adaptId = adaptId;
            state.oldReason = oldReason;
        }
    },

    actions: {
        getProgramms: ({ commit }, search) => {
            getVue({ ...getTemplate('notStudy','Programms'), search })
            .then(resp => resp.body)
            .then(data => {
                if (data.error) {
                    commit('getError', data.error);
                } else {
                    commit('getProgramms', data);
              }
            });
        },

        getRegions: ({ commit }, search) => {
            getVue({ ...getTemplate('notStudy', 'Regions'), search })
            .then(resp => resp.body)
            .then(data => {
                if (data.error) {
                    commit('getError', data.error);
                } else {
                    commit('getRegions', data);
              }
            });
        },

        getCollabs: ({ commit, state }) => {
            const { selectedProgramm: {id: programm_id = ''} = {}, selectedRegion: {info: {name: region_name = ''} = {}} = {} } = state;
            getVue({ ...getTemplate('notStudy', 'Collabs'), programm_id, region_name })
            .then(resp => resp.body)
            .then(data => {
                if (data.error) {
                    commit('getError', data.error);
                } else {
                    commit('getCollabs', data.data);
                }
            });
        },

        postReason: ({ commit, state }, reason) => {
            const { adaptId: adapt_id, selectedProgramm: {id: programm_id = ''} = {} } = state;
            postVue(getTemplate('notStudy', 'Reason'), { adapt_id, reason, programm_id })
            .then(resp => resp.body)
            .then(data => {
                if (data.error) {
                    commit('getError', data.error);
                } else {
                    commit('getSuccess', data.success);
                }
                commit('selectAdapt', { adaptId: '', oldReason: '' });
            })
        }
    }
})