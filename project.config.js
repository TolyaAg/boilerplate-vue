const packageSettings = require('./package.json');
const path = require('path');
const exportPath = '//study.merlion.ru/c$/WebSoft/WebTutorServer/wt/web/vue';

module.exports = {
	projectName: packageSettings.name,
	localPath: path.join(__dirname, 'dist'),
	pindexPath: path.join(__dirname, 'dist'),
	remotePath: path.join(exportPath, packageSettings.name, 'client'),
    publicPath: path.join('vue', packageSettings.name, 'client')
};