import { getAxios, postAxios } from "ajax"
import { getTemplate } from "servers"

const state = {
    selectedCollab: {},
    itemsCollab: [],
    error: "",
    success: "",
    selectedMentor: {},
    itemsMentor: [],
    collabsLoading: false,
    mentorsLoading: false
}

const getters = {}

const mutations = {
    addMentor_selectCollab: (state, collab) => {
        state.selectedCollab = collab
    },

    addMentor_getCollabs: (state, collabs) => {
        state.itemsCollab = collabs
    },

    addMentor_getError: (state, error) => {
        state.error = error
    },

    addMentor_postMentorSuccess: (state, success) => {
        state.success = success
    },

    addMentor_selectMentor: (state, mentor) => {
        state.selectedMentor = mentor
    },

    addMentor_getMentors: (state, mentors) => {
        state.itemsMentor = mentors
    },

    addMentor_closeError: (state) => {
        state.error = ""
    },

    addMentor_collabLoading: (state) => {
        state.collabsLoading = !state.collabsLoading
    },

    addMentor_mentorsLoading: (state) => {
        state.mentorsLoading = !state.mentorsLoading
    },

    addMentor_clearStore: (state) => {
        state.selectedCollab = {}
        state.error = ""
        state.selectedMentor = {}
    }
}

const actions = {
    addMentor_getCollabs: ({ commit }, search) => {
        commit("addMentor_collabLoading")
        getAxios({ ...getTemplate("addMentor", "Collabs"), search })
            .then(data => {
                if (data.error) {
                    commit("addMentor_getError", data.error)
                } else {
                    commit("addMentor_getCollabs", data.items)
                }
            })
        commit("addMentor_collabLoading")
    },

    addMentor_getMentors: ({ commit }, search) => {
        commit("addMentor_mentorsLoading")
        getAxios({ ...getTemplate("addMentor", "Mentors"), search })
            .then(data => {
                if (data.error) {
                    commit("addMentor_getError", data.error)
                } else {
                    commit("addMentor_getMentors", data.items)
                }
            })
        commit("addMentor_mentorsLoading")
    },

    addMentor_postMentor: ({ commit, state }) => {
        const { selectedCollab: { id: adapt_id = "" } = {}, selectedMentor: { id: mentor_id = "" } = {} } = state
        postAxios(getTemplate("addMentor", "Mentor"), { adapt_id, mentor_id })
            .then(data => {
                if (data.error) {
                    commit("addMentor_getError", data.error)
                } else {
                    commit("addMentor_postMentorSuccess", data.success)
                    setTimeout(() => { commit("addMentor_postMentorSuccess", "") }, 1000)
                    commit("addMentor_clearStore")
                }
                // commit("addMentor_selectAdapt", { adaptId: "", oldReason: "" })
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
