import Vue from "vue"
import VueRecource from "vue-resource"

const customBaseUrl = process.env.NODE_ENV === "production" ? "/custom_web_template.html" : "https://study.merlion.ru/custom_web_template.html"
console.log(process.env.NODE_ENV)
Vue.use(VueRecource)

export const postVue = (params, body) => {
    return Vue.http.post(
        customBaseUrl,
        body,
        {
            params,
            credentials: true,
            emulateJSON: true
        }
    )
}

export const getVue = (params) => {
    return Vue.http.get(
        customBaseUrl,
        {
            params,
            credentials: true
        }
    )
}
