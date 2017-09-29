// import Vue from "vue"
// import VueRecource from "vue-resource"
import axios from "axios"
// import querystring from "querystring"

const customBaseUrl = process.env.NODE_ENV === "production" ? "/custom_web_template.html" : "http://study.merlion.ru/custom_web_template.html"

export const getAxios = (params) => {
    return axios.get(
        customBaseUrl,
        {
            params,
            withCredentials: true
        }
    ).then(resp => resp.data)
}

export const postAxios = (params, data) => {
    // data = querystring.stringify(data)
    return axios.post(
        customBaseUrl,
        data,
        {
            params,
            withCredentials: true
        }
    ).then(resp => resp.data)
}

// export const postAxios = (params, data) => {
//     const url = customBaseUrl + "?" + querystring.stringify(params)
//     console.log(data)
//     var fd = new FormData()
//     fd.append("file", data.file)
//     fd.append("user", "hubot")

//     return fetch(url, {
//         method: "POST",
//         // headers: {
//         //     "Content-Type": "application/json"
//         // },
//         body: fd,
//         credentials: "include"
//     })
//     // .then(resp => {
//     //     console.log(resp)
//     //     // resp.text()
//     // })
// }
