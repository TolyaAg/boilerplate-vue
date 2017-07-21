import Vuex from "vuex"
import Vue from "vue"
import notStudy from "./modules/not-study"

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        notStudy
    }
})
