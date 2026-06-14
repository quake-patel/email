const fs = require('fs');
const getButtons = (file) => {
  const html = fs.readFileSync(file, 'utf8');
  const buttonStart = html.indexOf('es-button');
  if (buttonStart > -1) {
    const start = Math.max(0, buttonStart - 300);
    console.log('=== ' + file + ' BUTTON ===\n', html.slice(start, start + 1000));
  }
};
getButtons('reference/4.5 LARGE CARTON.html');
getButtons('reference/email_newsletter.html');
