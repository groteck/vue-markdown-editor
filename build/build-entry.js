const fs = require('fs-extra');
const path = require('path');
const packageJson = require('../package.json');

const version = process.env.VERSION || packageJson.version;
const tips = '// This file is auto generated by build/build-entry.js';

const entryFiles = ['base-editor', 'codemirror-editor', 'preview'];

function buildEntry(filename) {
  const content = `${tips}
import Component from './${filename}.vue';
import { setGlobal } from '@/utils/global';

const version = '${version}';

const install = (Vue) => {
  Vue.component(Component.name, Component);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

Component.version = version;
Component.install = install;
Component.useTheme = function (themeConfig) {
  setGlobal('theme', themeConfig);
};

export default Component;
`;

  fs.writeFileSync(path.join(__dirname, `../src/${filename}.js`), content);
}

entryFiles.forEach((filename) => {
  buildEntry(filename);
});

module.exports = {
  entryFiles,
};
