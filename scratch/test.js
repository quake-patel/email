const el = { content: '<strong>Slip-Pruf Deluxe Dolly 18" x 30"</strong>' };
const figmaTexts = ['New Text 123'];
let txtIdx = 0;

const parser = new DOMParser();
const doc = parser.parseFromString(el.content, 'text/html');
const walk = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null, false);
let node;
while(node = walk.nextNode()) {
  if (node.nodeValue.trim().length > 2) {
    node.nodeValue = figmaTexts[txtIdx];
    break;
  }
}
el.content = doc.body.innerHTML;
console.log(el.content);
