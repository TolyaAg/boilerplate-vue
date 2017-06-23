import Vue from 'vue';
import VueRecource from 'vue-resource';
import axios from 'axios';

const customBaseUrl = process.env.NODE_ENV === 'production' ? '/custom_web_template.html' : 'http://study.merlion.ru/custom_web_template.html';
console.log(process.env.NODE_ENV);
Vue.use(VueRecource);

export const  getAxios = (url, params) => {
  return axios({
    method: 'get',
    params,
    url,
    withCredentials: true,
    baseURL: customBaseUrl
  });
};

export const postAxios = (url, params, data) => {
  return axios({
    method: 'post',
    url,
    withCredentials: true,
    data,
    params,
    baseURL: customBaseUrl
  });
};

export const postVue = (params, body) => {
    return Vue.http.post(
        customBaseUrl, 
        body, 
        { 
            params, 
            credentials: true,
            emulateJSON: true
        }
    );
}

export const getVue = (params) => {
    return Vue.http.get(
        customBaseUrl, 
        { 
            params, 
            credentials: true 
        }
    );
}