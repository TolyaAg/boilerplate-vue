import Vuex from "vuex"
import Vue from "vue"
import { postVue, getVue } from "../api/ajax"
import { getTemplate } from "../api/servers.js"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectedProgramm: {},
        itemsProgramm: { items: [] },
        error: "",
        success: "",
        selectedRegions: [],
        itemsRegion: [],
        collabs: [],
        reason: "",
        adaptId: "",
        oldReason: "",
        collabsLoading: false,
        programmsLoading: false,
        regionsLoading: false,
        withDelay: false,
        withoutReason: false
    },

    getters: {
        splitReasons: state => {
            return state.oldReason.split(";")
        },

        collabsWithDelay: state => {
            if (!state.withDelay) {
                return state.collabs
            } else {
                return state.collabs.filter(collab => {
                    return collab.info.delay > 0 ? collab : null
                })
            }
        },

        collabsWithoutReason: (state, getters) => {
            if (!state.withoutReason) {
                return getters.collabsWithDelay
            } else {
                return getters.collabsWithDelay.filter(collab => {
                    return collab.info.reason === "" ? collab : null
                })
            }
        }
    },

    mutations: {
        selectProgramm: (state, programm) => {
            state.selectedProgramm = programm
        },

        getProgramms: (state, programms) => {
            state.itemsProgramm = programms
        },

        getCollabs: (state, collabs) => {
            state.collabs = collabs
        },

        getError: (state, error) => {
            state.error = error
        },

        getSuccess: (state, success) => {
            const filterCollabs = state.collabs.map((collab) => {
                if (state.adaptId === collab.id) {
                    collab.isEntered = true
                }
                return collab
            })
            state.collabs = filterCollabs
            state.success = success
            setTimeout(function () { state.success = "" }, 1000)
        },

        selectRegion: (state, addedRegion) => {
            state.selectedRegions.push(addedRegion)
        },

        removeRegion: (state, index) => {
            state.selectedRegions.splice(index, 1)
        },

        getRegions: (state, regions) => {
            state.itemsRegion = regions
        },

        closeError: (state) => {
            state.error = ""
        },

        enterReason: (state, reason) => {
            state.reason = reason
        },

        selectAdapt: (state, { adaptId, oldReason }) => {
            state.adaptId = adaptId
            state.oldReason = oldReason
        },

        collabLoading: (state) => {
            state.collabsLoading = !state.collabsLoading
        },

        programmLoading: (state) => {
            state.programmsLoading = !state.programmsLoading
        },

        regionLoading: (state) => {
            state.regionsLoading = !state.regionsLoading
        },

        changeDelay: (state) => {
            state.withDelay = !state.withDelay
        },

        changeReason: (state) => {
            state.withoutReason = !state.withoutReason
        }
    },

    actions: {
        getProgramms: ({ commit }, search) => {
            commit("programmLoading")
            getVue({ ...getTemplate("notStudy", "Programms"), search })
                .then(resp => resp.body)
                .then(data => {
                    if (data.error) {
                        commit("getError", data.error)
                    } else {
                        commit("getProgramms", data)
                    }
                })
            commit("programmLoading")
        },

        getRegions: ({ commit }, search) => {
            commit("regionLoading")
            getVue({ ...getTemplate("notStudy", "Regions"), search })
                .then(resp => resp.body)
                .then(data => {
                    if (data.error) {
                        commit("getError", data.error)
                    } else {
                        commit("getRegions", data.items)
                    }
                })
            commit("regionLoading")
        },

        getCollabs: ({ commit, state }) => {
            commit("collabLoading")
            const { selectedProgramm: { id: programm_id = "" } = {}, selectedRegion: { info: { name: region_name = "" } = {} } = {} } = state
            getVue({ ...getTemplate("notStudy", "Collabs"), programm_id, region_name })
                .then(resp => resp.body)
                .then(data => {
                    if (data.error) {
                        commit("getError", data.error)
                        commit("getCollabs", [])
                    } else {
                        commit("getCollabs", data.data)
                    }
                    commit("collabLoading")
                })
        },

        postReason: ({ commit, state }, reason) => {
            const { adaptId: adapt_id, selectedProgramm: { id: programm_id = "" } = {} } = state
            postVue(getTemplate("notStudy", "Reason"), { adapt_id, reason, programm_id })
                .then(resp => resp.body)
                .then(data => {
                    if (data.error) {
                        commit("getError", data.error)
                    } else {
                        commit("getSuccess", data.success)
                    }
                    commit("selectAdapt", { adaptId: "", oldReason: "" })
                })
        }
    }
})
