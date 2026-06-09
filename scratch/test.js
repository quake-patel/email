const fs = require('fs');

global.window = {};
global.localStorage = { getItem: () => null, setItem: () => {} };

// Mock DOM elements for utils
global.document = {
  createElement: () => ({
    appendChild: () => {},
    style: {},
    remove: () => {}
  }),
  getElementById: () => null,
  body: {
    appendChild: () => {}
  }
};

eval(fs.readFileSync('js/utils.js', 'utf8').replace('const Utils', 'global.Utils'));
eval(fs.readFileSync('js/state.js', 'utf8').replace('const EmailState', 'global.EmailState'));
eval(fs.readFileSync('js/export.js', 'utf8').replace('const ExportEngine', 'global.ExportEngine'));

const template = JSON.parse(fs.readFileSync('reference_template.json', 'utf8'));
window.EmailState.data = template;

const html = window.ExportEngine.generate();
fs.writeFileSync('scratch/output.html', html);
console.log('Successfully generated scratch/output.html');
