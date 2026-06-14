const fs = require('fs');
const zlib = require('zlib');

const html = fs.readFileSync('d:/Quake/Projects/email/draft.html', 'utf8');

const manifestStart = html.indexOf('<script type="__bundler/manifest">') + '<script type="__bundler/manifest">'.length;
const manifestEnd = html.indexOf('</script>', manifestStart);

const templateStart = html.indexOf('<script type="__bundler/template">') + '<script type="__bundler/template">'.length;
const templateEnd = html.indexOf('</script>', templateStart);

if (manifestStart > '<script type="__bundler/manifest">'.length && templateStart > '<script type="__bundler/template">'.length) {
  console.log('Found manifest and template');
  const manifest = JSON.parse(html.substring(manifestStart, manifestEnd).trim());
  let template = JSON.parse(html.substring(templateStart, templateEnd).trim());
  
  console.log('Manifest keys:', Object.keys(manifest).length);
  console.log('Template length:', template.length);
  
  // Replace UUIDs with base64 data URLs for simplicity, or just save the template
  const uuids = Object.keys(manifest);
  for (const uuid of uuids) {
    const entry = manifest[uuid];
    let buf = Buffer.from(entry.data, 'base64');
    if (entry.compressed) {
      buf = zlib.gunzipSync(buf);
    }
    const dataUrl = `data:${entry.mime};base64,${buf.toString('base64')}`;
    template = template.split(uuid).join(dataUrl);
  }
  
  fs.writeFileSync('d:/Quake/Projects/email/draft_extracted.html', template);
  console.log('Saved extracted template to draft_extracted.html');
} else {
  console.log('Could not find manifest or template');
}
