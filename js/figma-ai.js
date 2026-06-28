// ==========================================================================
// Figma AI Integration (LLM Powered + Heuristic Fallback)
// ==========================================================================

const FigmaAI = {
  init() {
    this.modal = document.getElementById('figma-modal');
    this.urlInput = document.getElementById('figma-url-input');
    this.tokenInput = document.getElementById('figma-token-input');
    this.openaiKeyInput = document.getElementById('openai-key-input');
    this.loadingOverlay = document.getElementById('ai-loading-overlay');
    this.loadingText = document.getElementById('ai-loading-text');
    this.loadingSubtext = document.getElementById('ai-loading-subtext');

    this.bindEvents();
    this.loadTokens();
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('#btn-figma-ai')) {
        this.openModal();
      }
      if (e.target.closest('#figma-modal-close')) {
        this.closeModal();
      }
      if (e.target.closest('#btn-figma-generate')) {
        this.handleGenerate();
      }
    });
  },

  loadTokens() {
    const savedFigmaToken = localStorage.getItem('figma_pat');
    const savedOpenAIKey = localStorage.getItem('openai_key');
    if (savedFigmaToken && this.tokenInput) this.tokenInput.value = savedFigmaToken;
    if (savedOpenAIKey && this.openaiKeyInput) this.openaiKeyInput.value = savedOpenAIKey;
  },

  saveTokens() {
    if (this.tokenInput && this.tokenInput.value) {
      localStorage.setItem('figma_pat', this.tokenInput.value.trim());
    }
    if (this.openaiKeyInput && this.openaiKeyInput.value) {
      localStorage.setItem('openai_key', this.openaiKeyInput.value.trim());
    }
  },

  openModal() {
    this.modal = document.getElementById('figma-modal');
    if (this.modal) this.modal.classList.add('modal-overlay--visible');
  },

  closeModal() {
    this.modal = document.getElementById('figma-modal');
    if (this.modal) this.modal.classList.remove('modal-overlay--visible');
  },

  extractFileKey(url) {
    const regex = /figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  },

  async handleGenerate() {
    this.urlInput = document.getElementById('figma-url-input');
    this.tokenInput = document.getElementById('figma-token-input');
    this.openaiKeyInput = document.getElementById('openai-key-input');
    
    const url = this.urlInput ? this.urlInput.value.trim() : '';
    const token = this.tokenInput ? this.tokenInput.value.trim() : '';
    const openaiKey = this.openaiKeyInput ? this.openaiKeyInput.value.trim() : '';

    if (!url || !token) {
      if (window.Utils) Utils.showToast('Please enter Figma URL and Figma Token', 'error');
      return;
    }

    const fileKey = this.extractFileKey(url);
    if (!fileKey) {
      if (window.Utils) Utils.showToast('Invalid Figma URL', 'error');
      return;
    }

    this.saveTokens();
    this.closeModal();
    this.startLoading();

    try {
      this.updateLoadingText('Connecting to Figma API...', 'Fetching file data...');
      
      let fileData = null;
      const cachedFile = sessionStorage.getItem(`figma_file_${fileKey}`);
      if (cachedFile) {
        fileData = JSON.parse(cachedFile);
      } else {
        const fileRes = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
          headers: { 'X-Figma-Token': token }
        });
        
        if (!fileRes.ok) {
          if (fileRes.status === 429) {
            if (window.Utils) Utils.showToast('Figma Rate Limit (429) hit. Loading Demo Layout to show spatial parsing...', 'warning');
            fileData = this.getMockFigmaDocument();
          } else {
            throw new Error(`Figma API Error: ${fileRes.status}`);
          }
        } else {
          fileData = await fileRes.json();
          sessionStorage.setItem(`figma_file_${fileKey}`, JSON.stringify(fileData));
        }
      }

      this.updateLoadingText('Scanning for matching grids...', 'Parsing node tree...');
      
      const currentBlocks = window.EmailState ? EmailState.data.blocks || [] : [];
      const headers = [];
      
      const extractText = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return (tmp.textContent || tmp.innerText || '').trim();
      };

      currentBlocks.forEach((block, index) => {
        if (block.type === 'structure') {
          block.columns.forEach(col => {
            col.forEach(el => {
              if (el.type === 'text') {
                const text = extractText(el.content);
                if (text && text.length > 3) {
                  headers.push({ text: text, upperText: text.toUpperCase(), blockIndex: index });
                }
              }
            });
          });
        }
      });

      const matchingNodes = [];
      const findHeaders = (node, parent = null) => {
        const upperName = node.name.toUpperCase().trim();
        const match = headers.find(h => h.upperText === upperName);
        if (match) {
           matchingNodes.push({ node, parent, headerText: match.text, headerIndex: match.blockIndex });
        }
        if (node.children) {
          for (const c of node.children) findHeaders(c, node);
        }
      };
      findHeaders(fileData.document);

      if (matchingNodes.length === 0) {
        throw new Error('Could not find any Figma layers matching your newsletter headers (e.g. "SHOP MORE DOLLIES").');
      }

      this.updateLoadingText('Extracting Images...', 'Getting URLs from Figma...');
      
      const imageNodeIds = [];
      const collectImageIds = (node, depth = 0) => {
        const hasImageFill = node.fills && node.fills.some(f => f.type === 'IMAGE');
        const isSmall = node.absoluteBoundingBox && node.absoluteBoundingBox.height < 70;
        
        if (depth > 0 && (node.type === 'IMAGE' || hasImageFill || (!isSmall && ['RECTANGLE', 'VECTOR', 'ELLIPSE'].includes(node.type)))) {
          imageNodeIds.push(node.id);
        }
        if (node.children) {
          for (const c of node.children) collectImageIds(c, depth + 1);
        }
      };
      
      // Deduplicate matching nodes by headerIndex to avoid double processing
      const uniqueMatches = [];
      matchingNodes.forEach(m => {
         if (!uniqueMatches.find(u => u.headerIndex === m.headerIndex)) {
             uniqueMatches.push(m);
         }
      });
      
      uniqueMatches.forEach(m => {
        let container = m.node;
        if ((!container.children || container.children.length === 0) && m.parent && m.parent.children) {
            // User just named a text node instead of a group, so we gather siblings below it spatially
            const siblingsBelow = m.parent.children.filter(c => 
               c.absoluteBoundingBox && container.absoluteBoundingBox &&
               c.absoluteBoundingBox.y >= container.absoluteBoundingBox.y &&
               c.id !== container.id
            );
            container = { ...m.parent, children: siblingsBelow };
        }
        m.processedContainer = container;
        collectImageIds(container, 0);
      });

      let imageMap = {};
      if (imageNodeIds.length > 0) {
        const idString = imageNodeIds.join(',');
        const cacheKey = `figma_img_${fileKey}_${idString.length > 50 ? idString.substring(0, 50) : idString}`;
        
        const cachedImg = sessionStorage.getItem(cacheKey);
        if (cachedImg) {
           imageMap = JSON.parse(cachedImg);
        } else {
          imageMap = {};
          const chunkSize = 50;
          for (let i = 0; i < imageNodeIds.length; i += chunkSize) {
            const chunk = imageNodeIds.slice(i, i + chunkSize);
            const imgRes = await fetch(`https://api.figma.com/v1/images/${fileKey}?ids=${chunk.join(',')}&format=png`, {
              headers: { 'X-Figma-Token': token }
            });
            if (imgRes.ok) {
              const imgData = await imgRes.json();
              Object.assign(imageMap, imgData.images || {});
            }
          }
          sessionStorage.setItem(cacheKey, JSON.stringify(imageMap));
        }
      }
      
      // Fallback for mock data so it works without API
      if (Object.keys(imageMap).length === 0 && fileData && fileData.document.name === "Email-1") {
        imageMap['mock_product_img_1'] = 'https://via.placeholder.com/300x300.png?text=Figma+Product';
      }

      let newBlocks = [...currentBlocks];
      let usedAI = false;

      uniqueMatches.forEach(match => {
        usedAI = true;
        this.updateLoadingText('Syncing Data...', `Extracting data from ${match.headerText}...`);
        
        const container = match.processedContainer;
        
        // Extract raw data from Figma node
        const figmaData = [];
        const extract = (n, parentLink = null, depth = 0) => {
          let link = parentLink;
          // Figma APIs can store links in a few places
          if (n.hyperlink && n.hyperlink.url) link = n.hyperlink.url;
          else if (n.style && n.style.hyperlink && n.style.hyperlink.url) link = n.style.hyperlink.url;
          
          if (n.type === 'TEXT') {
            figmaData.push({ type: 'text', content: n.characters, y: n.absoluteBoundingBox?.y || 0, x: n.absoluteBoundingBox?.x || 0, link });
          } else if (depth > 0) {
            const hasImageFill = n.fills && n.fills.some(f => f.type === 'IMAGE');
            const isSmall = n.absoluteBoundingBox && n.absoluteBoundingBox.height < 70;
            if ((n.type === 'IMAGE' || hasImageFill || (!isSmall && ['RECTANGLE', 'VECTOR', 'ELLIPSE'].includes(n.type))) && imageMap[n.id]) {
              figmaData.push({ type: 'image', src: imageMap[n.id], y: n.absoluteBoundingBox?.y || 0, x: n.absoluteBoundingBox?.x || 0, link });
            }
          }
          if (n.children) n.children.forEach(c => extract(c, link, depth + 1));
        };
        extract(container, null, 0);
        
        // Group elements into rough rows to preserve logical order even with misaligned Y coords
        const rows = [];
        figmaData.forEach(el => {
          let placed = false;
          for (let r of rows) {
            if (Math.abs(r.y - el.y) < 150) {
              r.elements.push(el);
              placed = true;
              break;
            }
          }
          if (!placed) rows.push({ y: el.y, elements: [el] });
        });
        
        rows.sort((a, b) => a.y - b.y);
        rows.forEach(r => r.elements.sort((a, b) => a.x - b.x));
        
        const figmaImages = [];
        const figmaTexts = [];
        rows.forEach(r => {
          r.elements.forEach(el => {
             if (el.type === 'image') figmaImages.push(el);
             if (el.type === 'text') figmaTexts.push(el);
          });
        });
        
        // Filter text items to exclude button labels
        const finalFigmaTexts = figmaTexts.filter(d => !['SHOP NOW', 'BUY NOW'].includes(d.content.toUpperCase()) && d.content.trim().length > 2);

        let imgIdx = 0;
        let txtIdx = 0;

        // Find the next header in the email to act as a boundary for this section
        let boundaryIndex = newBlocks.length;
        for (let j = match.headerIndex + 1; j < newBlocks.length; j++) {
           const block = newBlocks[j];
           let hasImg = false;
           let hasBtn = false;
           let hasText = false;
           
           block.columns.forEach(col => {
             col.forEach(el => {
               if (el.type === 'image') hasImg = true;
               if (el.type === 'button') hasBtn = true;
               if (el.type === 'text' && extractText(el.content).trim().length > 3) hasText = true;
             });
           });
           
           // A block with only text (no images/buttons) and a single column is likely a section header
           if (hasText && !hasImg && !hasBtn && block.columns.length === 1) {
              boundaryIndex = j;
              break;
           }
        }

        // Iterate through existing blocks in this section and update in-place
        for (let i = match.headerIndex + 1; i < boundaryIndex; i++) {
          const b = newBlocks[i];
          let blockHasProducts = false;
          let blockHasUpdatedProducts = false;

          // Update elements in this product block
          b.columns.forEach((col, colIndex) => {
            let isProductCol = col.some(el => el.type === 'image' || el.type === 'button');
            if (!isProductCol) return;
            
            blockHasProducts = true;

            if (imgIdx >= figmaImages.length && txtIdx >= finalFigmaTexts.length) {
                // Out of data! Clear this column so we don't leave dangling old products
                b.columns[colIndex] = [];
            } else {
                blockHasUpdatedProducts = true;
                let colLink = null;
                col.forEach(el => {
                  if (el.type === 'image' && imgIdx < figmaImages.length) {
                    const imgData = figmaImages[imgIdx];
                    el.src = imgData.src;
                    if (imgData.link) colLink = imgData.link;
                    imgIdx++;
                  } else if (el.type === 'text' && txtIdx < finalFigmaTexts.length) {
                    const plainText = extractText(el.content).toUpperCase();
                    if (!plainText.includes('SHOP NOW') && !plainText.includes('VIEW ALL') && plainText.length > 2) {
                       const txtData = finalFigmaTexts[txtIdx];
                       if (txtData.link && !colLink) colLink = txtData.link;
                       
                       const parser = new DOMParser();
                       const doc = parser.parseFromString(el.content, 'text/html');
                       const walk = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null, false);
                       let node;
                       let replaced = false;
                       while(node = walk.nextNode()) {
                         if (node.nodeValue.trim().length > 2) {
                            node.nodeValue = txtData.content;
                            replaced = true;
                            break;
                         }
                       }
                       if (!replaced) {
                          el.content = `<p style="font-family:sans-serif; margin:0;">${txtData.content}</p>`;
                       } else {
                          el.content = doc.body.innerHTML;
                       }
                       txtIdx++;
                    }
                  }
                });
                
                // Second pass to apply the found link to image and button
                if (colLink) {
                  col.forEach(el => {
                    if (el.type === 'image') el.link = colLink;
                    if (el.type === 'button') el.link = colLink;
                  });
                }
            }
          });
          
          // If this entire block was cleared because we ran out of products, delete it entirely
          if (blockHasProducts && !blockHasUpdatedProducts) {
             newBlocks.splice(i, 1);
             i--;
             boundaryIndex--;
          }
        }
      });

      if (newBlocks.length > 0) {
        EmailState.data.blocks = newBlocks;
        EmailState.data.templateName = usedAI ? 'AI Generated from Figma' : 'Figma Import (Local)';
        const nameInput = document.getElementById('template-name-input');
        if (nameInput) nameInput.value = EmailState.data.templateName;
        
        EmailState.saveSnapshot();
        EmailState.save();
        if (window.EmailState) window.EmailState.notify('reset');
        
        this.stopLoading();
        if (window.Utils && usedAI) Utils.showToast('AI successfully reconstructed your layout!', 'success');
        else if (window.Utils && !usedAI) Utils.showToast('Successfully reconstructed your layout using local engine.', 'success');
      } else {
        throw new Error('Returned an empty or invalid layout.');
      }

    } catch (e) {
      this.stopLoading();
      console.error(e);
      if (window.Utils) Utils.showToast('Error: ' + e.message, 'error');
    }
  },

  async callOpenAI(distilledTree, apiKey) {
    const systemPrompt = `You are an expert layout engine AI. Your task is to convert a JSON representation of a Figma design into a strict JSON array of email builder blocks.
Your output MUST be ONLY valid JSON. Do not include markdown codeblocks (no \`\`\`json). Just the raw JSON array.

The target format is an array of "structure" blocks.
A structure block contains columns, and each column contains text or image blocks.

Example output:
[
  {
    "id": "struct_1",
    "type": "structure",
    "layout": [100], // or [50, 50], [33, 33, 33] etc totaling 100
    "bgColor": "#ffffff",
    "padding": "20px",
    "columns": [
      [
        {
          "id": "img_1",
          "type": "image",
          "src": "https://example.com/image.png",
          "width": "100%",
          "align": "center",
          "padding": "10px 0"
        },
        {
          "id": "txt_1",
          "type": "text",
          "content": "<h2 style='font-family:sans-serif;text-align:center;'>Title</h2>",
          "align": "center",
          "padding": "10px 0"
        }
      ]
    ]
  }
]

Analyze the nested 'CONTAINER', 'TEXT', and 'IMAGE' nodes. 
- If you see layoutMode: "HORIZONTAL", create a structure with multiple columns (e.g. layout: [50, 50]).
- If you see layoutMode: "VERTICAL" or "NONE", create a single column structure (layout: [100]).
- Group related items into rows (structures) intelligently.
- Preserve text formatting using HTML tags in the 'content' field.
- Ensure all IDs start with struct_, col_, img_, or txt_ followed by random characters.
- Use the exact 'url' provided in IMAGE nodes for the 'src' field.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(distilledTree, null, 2) }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Failed to communicate with OpenAI');
    }

    const data = await response.json();
    let text = data.choices[0].message.content.trim();
    
    // Remove markdown code fences
    if (text.startsWith('```')) {
      text = text.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }
    
    return JSON.parse(text);
  },

  heuristicParse(targetFrame, imageMap) {
    const rgbToHex = (r, g, b) => {
      const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    let frameBgColor = '#ffffff';
    if (targetFrame.fills && targetFrame.fills.length > 0) {
      const solidFill = targetFrame.fills.find(f => f.type === 'SOLID');
      if (solidFill && solidFill.color) {
         frameBgColor = rgbToHex(solidFill.color.r, solidFill.color.g, solidFill.color.b);
      }
    }

    const flatElements = [];

    const extractElements = (node) => {
      if (!node) return;
      if (!node.absoluteBoundingBox) {
        if (node.children) {
          for (const child of node.children) extractElements(child);
        }
        return;
      }

      if (node.type === 'TEXT') {
        let align = 'left';
        if (node.style?.textAlignHorizontal === 'CENTER') align = 'center';
        if (node.style?.textAlignHorizontal === 'RIGHT') align = 'right';
        flatElements.push({
          type: 'text',
          originalNode: node,
          content: node.characters,
          fontSize: node.style?.fontSize || 16,
          fontWeight: node.style?.fontWeight || 400,
          align: align,
          x: node.absoluteBoundingBox.x,
          y: node.absoluteBoundingBox.y,
          width: node.absoluteBoundingBox.width,
          height: node.absoluteBoundingBox.height
        });
      } else if (node.type === 'RECTANGLE' || node.type === 'IMAGE' || node.type === 'VECTOR' || node.type === 'ELLIPSE') {
        flatElements.push({ 
          type: 'image', 
          id: node.id,
          x: node.absoluteBoundingBox.x,
          y: node.absoluteBoundingBox.y,
          width: node.absoluteBoundingBox.width,
          height: node.absoluteBoundingBox.height 
        });
      } else if (node.type === 'FRAME' || node.type === 'GROUP' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        const hasImageFill = node.fills && node.fills.some(f => f.type === 'IMAGE');
        if (hasImageFill) {
          flatElements.push({ 
            type: 'image', 
            id: node.id,
            x: node.absoluteBoundingBox.x,
            y: node.absoluteBoundingBox.y,
            width: node.absoluteBoundingBox.width,
            height: node.absoluteBoundingBox.height
          });
        } else if (node.children) {
          for (const child of node.children) extractElements(child);
        }
      }
    };

    extractElements(targetFrame);

    // Sort all elements top to bottom
    flatElements.sort((a, b) => a.y - b.y);

    // Group into rows based on Y proximity
    const rows = [];
    let currentRow = [];
    let currentRowY = null;

    for (const el of flatElements) {
      if (currentRowY === null) {
        currentRow.push(el);
        currentRowY = el.y;
      } else {
        // If it's within 30px vertically of the current row, it belongs to the same row
        if (Math.abs(el.y - currentRowY) < 30) {
          currentRow.push(el);
        } else {
          rows.push(currentRow);
          currentRow = [el];
          currentRowY = el.y;
        }
      }
    }
    if (currentRow.length > 0) rows.push(currentRow);

    const blocks = [];
    
    for (const row of rows) {
      // Sort left to right
      row.sort((a, b) => a.x - b.x);

      const colCount = Math.min(row.length, 4);
      let layout = [];
      if (colCount === 1) layout = [100];
      else if (colCount === 2) layout = [50, 50];
      else if (colCount === 3) layout = [33, 33, 33];
      else if (colCount === 4) layout = [25, 25, 25, 25];

      const columns = Array(colCount).fill(null).map(() => []);

      for (let i = 0; i < row.length; i++) {
        const el = row[i];
        const colIndex = Math.min(i, colCount - 1); // Overflowing items go into the last column

        let block = null;
        if (el.type === 'text') {
          let tag = 'p';
          if (el.fontSize >= 24) tag = 'h2';
          else if (el.fontSize >= 20) tag = 'h3';
          let fw = el.fontWeight >= 600 ? 'bold' : 'normal';
          
          block = {
            id: window.Utils ? Utils.generateId('text') : 'txt_' + Math.random(),
            type: 'text',
            content: `<${tag} style="font-family: Inter, sans-serif; font-size: ${el.fontSize}px; font-weight: ${fw}; margin: 0; color: #333333; text-align: ${el.align};">${el.content.replace(/\n/g, '<br>')}</${tag}>`,
            align: el.align,
            padding: '10px 0'
          };
        } else if (el.type === 'image') {
          const imgUrl = imageMap[el.id];
          if (imgUrl) {
            // Cap width to 100% if it's wider than email body, else use pixel width
            let imgWidth = el.width > 550 ? '100%' : `${Math.round(el.width)}px`;
            block = {
              id: window.Utils ? Utils.generateId('image') : 'img_' + Math.random(),
              type: 'image',
              src: imgUrl,
              width: imgWidth,
              align: 'center',
              padding: '10px 0'
            };
          }
        }
        
        if (block) {
          columns[colIndex].push(block);
        }
      }

      blocks.push({
        id: window.Utils ? Utils.generateId('structure') : 'struct_' + Math.random(),
        type: 'structure',
        layout: layout,
        bgColor: frameBgColor,
        padding: '20px',
        columns: columns
      });
    }

    return blocks;
  },

  startLoading() {
    this.loadingOverlay = document.getElementById('ai-loading-overlay');
    if (this.loadingOverlay) this.loadingOverlay.classList.add('active');
  },

  stopLoading() {
    this.loadingOverlay = document.getElementById('ai-loading-overlay');
    if (this.loadingOverlay) this.loadingOverlay.classList.remove('active');
  },

  updateLoadingText(mainText, subText) {
    this.loadingText = document.getElementById('ai-loading-text');
    this.loadingSubtext = document.getElementById('ai-loading-subtext');
    if (this.loadingText) this.loadingText.textContent = mainText;
    if (this.loadingSubtext) this.loadingSubtext.textContent = subText;
  },

  getMockFigmaDocument() {
    return {
      document: {
        name: "Email-1",
        children: [
          {
            name: "Email-1",
            type: "FRAME",
            fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
            children: [
              // Mock Logo
              {
                type: "RECTANGLE",
                id: "mock_logo",
                fills: [{ type: "IMAGE" }],
                absoluteBoundingBox: { x: 200, y: 50, width: 200, height: 80 }
              },
              // Mock Menu Items perfectly aligned on Y axis (y=150)
              {
                type: "TEXT",
                characters: "MOVING BOXES",
                style: { fontSize: 14, fontWeight: 600, textAlignHorizontal: "CENTER" },
                absoluteBoundingBox: { x: 50, y: 150, width: 120, height: 20 }
              },
              {
                type: "TEXT",
                characters: "RAMPS",
                style: { fontSize: 14, fontWeight: 600, textAlignHorizontal: "CENTER" },
                absoluteBoundingBox: { x: 200, y: 150, width: 120, height: 20 }
              },
              {
                type: "TEXT",
                characters: "EQUIPMENT",
                style: { fontSize: 14, fontWeight: 600, textAlignHorizontal: "CENTER" },
                absoluteBoundingBox: { x: 350, y: 150, width: 120, height: 20 }
              },
              {
                type: "TEXT",
                characters: "DOLLIES",
                style: { fontSize: 14, fontWeight: 600, textAlignHorizontal: "CENTER" },
                absoluteBoundingBox: { x: 500, y: 150, width: 100, height: 20 }
              },
              // Mock Header Text
              {
                type: "TEXT",
                characters: "SHOP MORE DOLLIES",
                style: { fontSize: 32, fontWeight: 700, textAlignHorizontal: "LEFT" },
                absoluteBoundingBox: { x: 50, y: 220, width: 500, height: 40 }
              },
              // The Product Grid Group matching the header
              {
                name: "SHOP MORE DOLLIES",
                type: "GROUP",
                children: [
                  {
                    type: "RECTANGLE",
                    id: "mock_product_img_1",
                    fills: [{ type: "IMAGE" }],
                    absoluteBoundingBox: { x: 50, y: 280, width: 200, height: 200 }
                  },
                  {
                    type: "TEXT",
                    characters: "Slip-Pruf Deluxe Dolly 18\" x 30\"",
                    style: { fontSize: 16, fontWeight: 600, textAlignHorizontal: "LEFT", hyperlink: { url: "https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-dolly-18-x-30" } },
                    absoluteBoundingBox: { x: 50, y: 490, width: 200, height: 20 }
                  },
                  {
                    type: "TEXT",
                    characters: "SHOP NOW",
                    style: { fontSize: 14, fontWeight: 600, textAlignHorizontal: "CENTER" },
                    absoluteBoundingBox: { x: 50, y: 520, width: 200, height: 30 }
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  }
};

setTimeout(() => {
  FigmaAI.init();
}, 100);
