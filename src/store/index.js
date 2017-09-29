import Vuex from "vuex"
import Vue from "vue"
// import notStudy from "./modules/not-study"
import library from "./modules/requests/change-library/change-library"

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        // notStudy,
        library
    }
})
