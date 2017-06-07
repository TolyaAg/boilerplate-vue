import axios from 'axios';

export const  getAxios = (url, params) => {
  return axios({
    method: 'get',
    params,
    url,
    withCredentials: true
  });
};

export function uploadFile(url, file){
	return new Promise((resolve, reject) => {
		const xmlHttp = getXmlHttp();

		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState === 4) {
				if (xmlHttp.status === 200){
					resolve(xmlHttp.responseText);
				} else {
					console.log(xmlHttp.status);
					reject(new Error(xmlHttp.statusText || 'Upload file error'));
				}
			}
		};

		xmlHttp.open('POST', url);

		const formData = new FormData();
		formData.append('file', file, file.name);

		xmlHttp.send(formData);
	});
}

export function uploadFiles(url, files) {
	return new Promise((resolve, reject) => {
		const xmlHttp = getXmlHttp();

		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState === 4) {
				if (xmlHttp.status === 200){
					resolve(xmlHttp.responseText);
				} else {
					console.log(xmlHttp.status);
					reject(new Error(xmlHttp.statusText || 'Upload file error'));
				}
			}
		};

		xmlHttp.open('POST', url);

		const formData = new FormData();
		for (let i = files.length - 1; i >= 0; i--) {
			const file = files[i];
			formData.append('files[]', file, file.name);
		}
		xmlHttp.send(formData);
	});
}