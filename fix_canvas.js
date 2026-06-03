const fs = require('fs');
let code = fs.readFileSync('js/canvas.js', 'utf8');

const blocks = ['renderDividerBlock', 'renderSpacerBlock', 'renderSocialBlock', 'renderMenuBlock', 'renderHtmlBlock'];
blocks.forEach(b => {
  code = code.replace(new RegExp(b + '\\(block\\) \\{'), b + '(block) {\\n    const isMobile = window.App && App.currentViewport === \\'mobile\\';');
});

fs.writeFileSync('js/canvas.js', code);
console.log('done');
