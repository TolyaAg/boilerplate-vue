import { getAxios, postAxios } from "../../api/ajax"
import { getTemplate } from "../../api/servers.js"

const state = {
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
}

const getters = {
    notStudy_splitReasons: state => {
        return state.oldReason.split(";")
    },

    notStudy_collabsWithDelay: state => {
        if (!state.withDelay) {
            return state.collabs
        } else {
            return state.collabs.filter(collab => {
                return collab.info.delay > 0 ? collab : null
            })
        }
    },

    notStudy_collabsWithoutReason: (state, getters) => {
        if (!state.withoutReason) {
            return getters.notStudy_collabsWithDelay
        } else {
            return getters.notStudy_collabsWithDelay.filter(collab => {
                return collab.info.reason === "" ? collab : null
            })
        }
    }
}

const mutations = {
    notStudy_selectProgramm: (state, programm) => {
        state.selectedProgramm = programm
    },

    notStudy_getProgramms: (state, programms) => {
        state.itemsProgramm = programms
    },

    notStudy_getCollabs: (state, collabs) => {
        state.collabs = collabs
    },

    notStudy_getError: (state, error) => {
        state.error = error
    },

    notStudy_postReasonSuccess: (state, success) => {
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

    notStudy_selectRegion: (state, addedRegion) => {
        state.selectedRegions.push(addedRegion)
    },

    notStudy_removeRegion: (state, index) => {
        state.selectedRegions.splice(index, 1)
    },

    notStudy_getRegions: (state, regions) => {
        state.itemsRegion = regions
    },

    notStudy_closeError: (state) => {
        state.error = ""
    },

    notStudy_enterReason: (state, reason) => {
        state.reason = reason
    },

    notStudy_selectAdapt: (state, { adaptId, oldReason }) => {
        state.adaptId = adaptId
        state.oldReason = oldReason
    },

    notStudy_collabLoading: (state) => {
        state.collabsLoading = !state.collabsLoading
    },

    notStudy_programmLoading: (state) => {
        state.programmsLoading = !state.programmsLoading
    },

    notStudy_regionLoading: (state) => {
        state.regionsLoading = !state.regionsLoading
    },

    notStudy_changeDelay: (state) => {
        state.withDelay = !state.withDelay
    },

    notStudy_changeReason: (state) => {
        state.withoutReason = !state.withoutReason
    }
}

const actions = {
    notStudy_getProgramms: ({ commit }, search) => {
        commit("notStudy_programmLoading")
        getAxios({ ...getTemplate("notStudy", "Programms"), search })
            .then(data => {
                if (data.error) {
                    commit("notStudy_getError", data.error)
                } else {
                    commit("notStudy_getProgramms", data)
                }
            })
        commit("notStudy_programmLoading")
    },

    notStudy_getRegions: ({ commit }, search) => {
        commit("notStudy_regionLoading")
        getAxios({ ...getTemplate("notStudy", "Regions"), search })
            .then(data => {
                if (data.error) {
                    commit("notStudy_getError", data.error)
                } else {
                    commit("notStudy_getRegions", data.items)
                }
            })
        commit("notStudy_regionLoading")
    },

    notStudy_getCollabs: ({ commit, state }) => {
        commit("notStudy_collabLoading")
        const region_name = state.selectedRegions.map((region) => { return region.info.name }).join("','")
        const { selectedProgramm: { id: programm_id = "" } = {} } = state
        getAxios({ ...getTemplate("notStudy", "Collabs"), programm_id, region_name })
            .then(data => {
                if (data.error) {
                    commit("notStudy_getError", data.error)
                    commit("notStudy_getCollabs", [])
                } else {
                    commit("notStudy_getCollabs", data.data)
                }
                commit("notStudy_collabLoading")
            })
    },

    notStudy_postReason: ({ commit, state }, reason) => {
        const { adaptId: adapt_id, selectedProgramm: { id: programm_id = "" } = {} } = state
        postAxios(getTemplate("notStudy", "Reason"), { adapt_id, reason, programm_id })
            .then(data => {
                if (data.error) {
                    commit("notStudy_getError", data.error)
                } else {
                    commit("notStudy_postReasonSuccess", data.success)
                }
                commit("notStudy_selectAdapt", { adaptId: "", oldReason: "" })
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
