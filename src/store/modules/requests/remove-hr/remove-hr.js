import { getAxios, postAxios } from "ajax"
import { getTemplate } from "servers"

const state = {
    selectedReplaceable: {},
    itemsReplaceable: [],
    error: "",
    success: "",
    selectedReplacing: {},
    itemsReplacing: [],
    collabsLoading: false,
    mentorsLoading: false,
    requestLoading: false
}

const getters = {}

const mutations = {
    removeHr_selectReplaceable: (state, collab) => {
        state.selectedReplaceable = collab
    },

    removeHr_getReplaceables: (state, collabs) => {
        state.itemsReplaceable = collabs
    },

    removeHr_getError: (state, error) => {
        state.error = error
    },

    removeHr_postReplacingSuccess: (state, success) => {
        state.success = success
    },

    removeHr_selectReplacing: (state, collab) => {
        state.selectedReplacing = collab
    },

    removeHr_getReplacings: (state, collabs) => {
        state.itemsReplacing = collabs
    },

    removeHr_closeError: (state) => {
        state.error = ""
    },

    removeHr_collabLoading: (state) => {
        state.collabsLoading = !state.collabsLoading
    },

    removeHr_requestLoading: (state) => {
        state.requestLoading = !state.requestLoading
    },

    removeHr_mentorsLoading: (state) => {
        state.mentorsLoading = !state.mentorsLoading
    },

    removeHr_clearStore: (state) => {
        state.selectedReplaceable = {}
        state.error = ""
        state.selectedReplacing = {}
    }
}

const actions = {
    removeHr_getReplaceables: ({ commit }, search) => {
        commit("removeHr_collabLoading")
        getAxios({ ...getTemplate("removeHr", "Replaceables"), search })
            .then(data => {
                if (data.error) {
                    commit("removeHr_getError", data.error)
                } else {
                    commit("removeHr_getReplaceables", data.items)
                }
            })
        commit("removeHr_collabLoading")
    },

    removeHr_getReplacings: ({ commit }, search) => {
        commit("removeHr_mentorsLoading")
        getAxios({ ...getTemplate("removeHr", "Replacings"), search })
            .then(data => {
                if (data.error) {
                    commit("removeHr_getError", data.error)
                } else {
                    commit("removeHr_getReplacings", data.items)
                }
            })
        commit("removeHr_mentorsLoading")
    },

    removeHr_postReplacings: ({ commit, state }) => {
        commit("removeHr_requestLoading")
        const { selectedReplaceable: { id: replaceable_id = "" } = {}, selectedReplacing: { id: replacing_id = "" } = {} } = state
        postAxios(getTemplate("removeHr", "Replacing"), { replaceable_id, replacing_id })
            .then(data => {
                if (data.error) {
                    commit("removeHr_getError", data.error)
                    commit("removeHr_requestLoading")
                } else {
                    commit("removeHr_requestLoading")
                    commit("removeHr_postReplacingSuccess", data.success)
                    commit("removeHr_clearStore")
                    setTimeout(() => { commit("removeHr_postReplacingSuccess", "") }, 1000)
                }
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
