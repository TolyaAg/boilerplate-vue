import Vuex from "vuex"
import Vue from "vue"
import changeHr from "./modules/requests/change-hr/change-hr"

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        changeHr
    }
})
