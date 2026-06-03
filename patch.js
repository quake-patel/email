const fs = require('fs');
let c = fs.readFileSync('js/export.js', 'utf8');

c = c.replace(/<td align=/g, '<td class="es-p-td" align=');
c = c.replace(/<td class="es-p-td" align="(.*?)" style="padding:\$\{block\.margin\}/g, '<td class="es-m-td" align="$1" style="padding:${block.margin}');

// Now in generatePerBlockMobileCss, add the mobilePadding and mobileMargin overrides
c = c.replace(
  'if (block.mobileAlign) {',
  `if (block.mobilePadding) {
        css += \`      .es-b-\${block.id} .es-p-td { padding: \${block.mobilePadding} !important; }\\n\`;
      }
      if (block.mobileMargin) {
        css += \`      .es-b-\${block.id} .es-m-td { padding: \${block.mobileMargin} !important; }\\n\`;
      }
      
      if (block.mobileAlign) {`
);

fs.writeFileSync('js/export.js', c);
console.log('done');
