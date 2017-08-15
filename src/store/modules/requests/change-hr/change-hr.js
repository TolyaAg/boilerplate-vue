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
    mentorsLoading: false
}

const getters = {}

const mutations = {
    changeHr_selectReplaceable: (state, collab) => {
        state.selectedReplaceable = collab
    },

    changeHr_getReplaceables: (state, collabs) => {
        state.itemsReplaceable = collabs
    },

    changeHr_getError: (state, error) => {
        state.error = error
    },

    changeHr_postReplacingSuccess: (state, success) => {
        state.success = success
    },

    changeHr_selectReplacing: (state, collab) => {
        state.selectedReplacing = collab
    },

    changeHr_getReplacings: (state, collabs) => {
        state.itemsReplacing = collabs
    },

    changeHr_closeError: (state) => {
        state.error = ""
    },

    changeHr_collabLoading: (state) => {
        state.collabsLoading = !state.collabsLoading
    },

    changeHr_mentorsLoading: (state) => {
        state.mentorsLoading = !state.mentorsLoading
    },

    changeHr_clearStore: (state) => {
        state.selectedReplaceable = {}
        state.error = ""
        state.selectedReplacing = {}
    }
}

const actions = {
    changeHr_getReplaceables: ({ commit }, search) => {
        commit("changeHr_collabLoading")
        getAxios({ ...getTemplate("changeHr", "Replaceables"), search })
            .then(data => {
                if (data.error) {
                    commit("changeHr_getError", data.error)
                } else {
                    commit("changeHr_getReplaceables", data.items)
                }
            })
        commit("changeHr_collabLoading")
    },

    changeHr_getReplacings: ({ commit }, search) => {
        commit("changeHr_mentorsLoading")
        getAxios({ ...getTemplate("changeHr", "Replacings"), search })
            .then(data => {
                if (data.error) {
                    commit("changeHr_getError", data.error)
                } else {
                    commit("changeHr_getReplacings", data.items)
                }
            })
        commit("changeHr_mentorsLoading")
    },

    changeHr_postReplacings: ({ commit, state }) => {
        const { selectedReplaceable: { id: replaceable_id = "" } = {}, selectedReplacing: { id: replacing_id = "" } = {} } = state
        postAxios(getTemplate("changeHr", "Replacing"), { replaceable_id, replacing_id })
            .then(data => {
                if (data.error) {
                    commit("changeHr_getError", data.error)
                } else {
                    commit("changeHr_postReplacingSuccess", data.success)
                    setTimeout(() => { commit("changeHr_postReplacingSuccess", "") }, 1000)
                    commit("changeHr_clearStore")
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
