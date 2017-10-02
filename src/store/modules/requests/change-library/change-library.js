import { getAxios, postAxios } from "ajax"
import { getTemplate } from "servers"
// import querystring from "querystring"

const state = {
    selectedLibrary: null,
    itemsLibrary: [],
    selectedFile: null,
    error: "",
    success: "",
    materialLoading: false,
    sendDataLoading: false
}

const getters = {}

const mutations = {
    library_getMaterials: (state, materials) => {
        state.itemsLibrary = materials
    },

    library_selectMaterial: (state, material) => {
        state.selectedLibrary = material
    },

    library_changeFile: (state, file) => {
        state.selectedFile = file
    },

    library_getSuccess: (state, text) => {
        state.success = text
    },

    library_getError: (state, error) => {
        state.error = error
    },

    library_closeError: (state) => {
        state.error = ""
    },

    library_materialLoading: (state) => {
        state.materialLoading = !state.materialLoading
    },

    library_sendDataLoading: (state) => {
        state.sendDataLoading = !state.sendDataLoading
    },

    library_clearStore: (state) => {
        state.selectedMaterial = {}
        state.error = ""
        state.selectedFile = {}
    }
}

const actions = {
    library_getMaterials: ({ commit }, search) => {
        commit("library_materialLoading")
        getAxios({ ...getTemplate("changeLibMaterial", "Materials"), search })
            .then(data => {
                if (data.error) {
                    commit("library_getError", data.error)
                } else {
                    commit("library_getMaterials", data.items)
                }
            })
        commit("library_materialLoading")
    },

    library_changeMaterial: ({ commit, state }) => {
        // const material_id = state.selectedLibrary.id
        // const data = new FormData()
        // data.append("material_id", "file")
        // data.append("file", state.selectedFile)
        // data.append("material", "state")
        console.log(state.selectedFile)
        // console.log(querystring.stringify({ material_id: state.selectedLibrary.id }))
        const data = { material_id: state.selectedLibrary.id }
        const file = { name: state.selectedFile.name }
        const reader = new FileReader()

        if (state.selectedFile) {
            reader.readAsDataURL(state.selectedFile)
        }

        reader.onloadend = function () {
            file.data = reader.result
            data.file = file
            const str = JSON.stringify(data)
            console.log(str)
            postAxios(getTemplate("changeLibMaterial", "Materials"), str)
                .then(res => {
                    console.log(res)

                    if (res.error) {
                        commit("library_getError", res.error)
                    } else {
                        // postAxios(getTemplate("changeLibMaterial", "Materials"), data)
                        //     .then(response => {})
                        commit("library_getSuccess", res.success)
                        setTimeout(() => { commit("library_getSuccess", "") }, 1000)
                        commit("library_clearStore")
                    }
                })
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
