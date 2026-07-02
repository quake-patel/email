// ==========================================================================
// Email Newsletter Builder — Export Engine
// Generates email-compatible table-based HTML output
// ==========================================================================

const ExportEngine = {
  /**
   * Generate the complete email HTML
   */
  generate() {
    const gs = EmailState.data.globalStyles;
    const blocks = EmailState.getBlocks();
    const width = gs.contentWidth || 600;

    const subjectLine = EmailState.data.subjectLine || EmailState.data.templateName;
    const previewText = EmailState.data.previewText || '';

    let bodyContent = '';
    blocks.forEach(block => {
      const blockTrHtml = this.renderBlockToEmail(block, gs);
      const blockBgColor = block.type === 'structure' && block.bgColor ? block.bgColor : '#ffffff';

      bodyContent += `
          <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <!--[if gte mso 9]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="${width}" style="width:${width}px;table-layout:fixed;">
                  <tr>
                    <td align="center" valign="top" width="${width}" style="width:${width}px">
                <![endif]-->
                <table bgcolor="${blockBgColor}" align="center" cellpadding="0" cellspacing="0" class="es-content-body" width="${width}" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:${blockBgColor};width:${width}px" role="none">
${blockTrHtml}
                </table>
                <!--[if gte mso 9]>
                    </td>
                  </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
          </table>`;
    });

    // Build preheader (hidden preview text) with whitespace padding to prevent body text showing
    let preheaderHtml = '';
    if (previewText) {
      // Create padding to push following text out of preview area
      const spacePad = '&#847;&zwnj;&nbsp;'.repeat(100);
      preheaderHtml = `\n    <span style="color:#ffffff;opacity:0;line-height:0;font-size:0px;visibility:hidden;mso-hide:all;display:none !important;height:0;width:0">${Utils.escapeHTML(previewText)}${spacePad}</span>`;
    }

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>${Utils.escapeHTML(subjectLine)}</title>
  <!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap">
  <!--<![endif]-->
  <!--[if (mso 16)]>
  <style type="text/css">
    a {text-decoration: none;}
  </style>
  <![endif]-->
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
  <!--[if gte mso 9]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    u + .body img ~ div div { display:none; }
    #outlook a { padding: 0; }
    span.MsoHyperlink, span.MsoHyperlinkFollowed { color:inherit; mso-style-priority:99; }
    a.bg { mso-style-priority:100!important; text-decoration:none!important; }
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    p, a { line-height: 150%; margin: 0; }
    h1 { font-size: ${gs.h1Size} !important; color: ${gs.h1Color} !important; line-height: 120%; margin: 0; }
    h2 { font-size: ${gs.h2Size} !important; color: ${gs.h2Color} !important; line-height: 120%; margin: 0; }
    h3 { font-size: ${gs.h3Size} !important; color: ${gs.h3Color} !important; line-height: 120%; margin: 0; }
    h4, h5, h6 { line-height: 120%; margin: 0; }
    a[x-apple-data-detectors], #MessageViewBody a { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    .v { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all; }
    .es-desktop-only { display: table-row !important; }
    .es-mobile-only { display: none !important; mso-hide: all; }
    @media only screen and (max-width: ${width}px) {
      .es-wrapper { width: 100% !important; min-width: 100% !important; }
      .es-content, .es-content-body { width: 100% !important; min-width: 100% !important; max-width: 100% !important; }
      .adapt-img { width: 100% !important; height: auto !important; }
      .es-m-p10 { padding: 10px !important; }
      .es-m-p15 { padding: 15px !important; }
      body, p, a, span { ${gs.mobileFontSize ? `font-size: ${gs.mobileFontSize} !important;` : ''} }
      h1 { font-size: ${gs.mobileH1Size || gs.h1Size} !important; line-height: 120% !important; }
      h2 { font-size: ${gs.mobileH2Size || gs.h2Size} !important; line-height: 120% !important; }
      h3 { font-size: ${gs.mobileH3Size || gs.h3Size} !important; line-height: 120% !important; }
      .es-button { display: block !important; width: 100% !important; }
      .es-desktop-only { display: none !important; }
      .es-mobile-only { display: table-row !important; }
      .es-m-hide { display: none !important; max-height: 0 !important; overflow: hidden !important; mso-hide: all !important; }
      .es-m-stack .es-m-stack-col { display: block !important; float: none !important; width: 100% !important; max-width: 100% !important; }
      .es-m-stack .es-m-col-inner { width: 100% !important; max-width: 100% !important; }
      .es-m-stack .es-m-stack-gap-pad { padding-left: 0 !important; padding-right: 0 !important; }
${this.generatePerBlockMobileCss(blocks, width, gs)}
    }
    /* Width containment */
    .es-content-body { max-width: ${width}px !important; }
    .es-content-body table { max-width: 100%; }
    .es-content-body img { max-width: 100%; height: auto; }
    .es-content-body td { word-break: break-word; }
  </style>
</head>
<body class="body" style="width:100%;min-width:100%;height:100%;font-family:${gs.fontFamily};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">${preheaderHtml}
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:${gs.backgroundColor}">
    <!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="${gs.backgroundColor}"></v:fill>
      </v:background>
    <![endif]-->
    <table cellpadding="0" width="100%" cellspacing="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:${gs.backgroundColor}">
      <tr>
        <td valign="top" style="padding:0;Margin:0">
${bodyContent}
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
  },

  /**
   * Generate per-block mobile CSS rules
   */
  generatePerBlockMobileCss(blocks, width, gs) {
    let css = '';
    const processBlock = (block) => {
      // Mobile font size override for text blocks
      const textFs = block.mobileFontSize;
      if (block.type === 'text' && textFs) {
        css += `      .es-b-${block.id} p, .es-b-${block.id} a, .es-b-${block.id} span, .es-b-${block.id} h1, .es-b-${block.id} h2, .es-b-${block.id} h3 { font-size: ${textFs} !important; }\n`;
      }
      
      const btnFs = block.mobileFontSize || gs.mobileButtonFontSize;
      if (block.type === 'button' && btnFs) {
        css += `      .es-b-${block.id} a, .es-b-${block.id} span { font-size: ${btnFs} !important; }\n`;
      }
      
      const menuFs = block.mobileFontSize || gs.mobileFontSize;
      if (block.type === 'menu' && menuFs) {
        css += `      .es-b-${block.id} a { font-size: ${menuFs} !important; }\n`;
      }
      
      // Mobile alignment override
      if (block.mobilePadding) {
        css += `      .es-b-${block.id} .es-p-td { padding: ${block.mobilePadding} !important; }\n`;
      }
      if (block.mobileMargin) {
        css += `      .es-b-${block.id} .es-m-td { padding: ${block.mobileMargin} !important; }\n`;
      }
      
      if (block.mobileAlign) {
        css += `      .es-b-${block.id} td, .es-b-${block.id} div { text-align: ${block.mobileAlign} !important; }\n`;
      }
      
      // Vertical column gap
      if (block.type === 'structure' && block.colGapV) {
        css += `      .es-b-${block.id} .es-m-pad-b-v { padding-bottom: ${block.colGapV}px !important; }\n`;
      }
    };

    blocks.forEach(block => {
      processBlock(block);
      
      // Mobile columns stack disable
      if (block.type === 'structure' && block.mobileStackColumns === false && block.layout && block.layout.length > 1) {
        block.layout.forEach((wPct, i) => {
          css += `      .es-b-${block.id} .es-col-${i} { display: table !important; float: left !important; width: ${wPct}% !important; max-width: ${wPct}% !important; }\n`;
        });
      }

      if (block.columns) {
        block.columns.forEach(col => col.forEach(child => processBlock(child)));
      }
    });

    return css;
  },

  /**
   * Get CSS classes for a block's mobile responsive settings
   */
  getMobileClasses(block) {
    const classes = [];
    if (block.hideOnMobile) classes.push('es-m-hide');
    if (block.hideOnDesktop) classes.push('es-desktop-only');
    if (block.type === 'structure' && block.mobileStackColumns !== false && block.layout && block.layout.length > 1) {
      classes.push('es-m-stack');
    }
    // For per-block CSS targeting
    classes.push(`es-b-${block.id}`);
    return classes.join(' ');
  },

  /**
   * Render a single block to email HTML
   */
  renderBlockToEmail(block, gs) {
    switch (block.type) {
      case 'structure': return this.renderStructureEmail(block, gs);
      case 'text': return this.renderTextEmail(block, gs);
      case 'image': return this.renderImageEmail(block, gs);
      case 'button': return this.renderButtonEmail(block, gs);
      case 'divider': return this.renderDividerEmail(block, gs);
      case 'spacer': return this.renderSpacerEmail(block, gs);
      case 'social': return this.renderSocialEmail(block, gs);
      case 'menu': return this.renderMenuEmail(block, gs);
      case 'html': return this.renderHtmlEmail(block, gs);
      default: return '';
    }
  },

  /**
   * Structure — multi-column row
   */
  renderStructureEmail(block, gs) {
    const width = gs.contentWidth || 600;
    let padLeft = 20, padRight = 20;
    if (block.padding !== undefined) {
      const parts = block.padding.toString().split(' ').map(p => parseInt(p) || 0);
      if (parts.length === 1) { padLeft = padRight = parts[0]; }
      else if (parts.length === 2) { padLeft = padRight = parts[1]; }
      else if (parts.length === 3) { padLeft = padRight = parts[1]; }
      else if (parts.length === 4) { padRight = parts[1]; padLeft = parts[3]; }
    }
    const innerWidth = width - padLeft - padRight;

    let cols = '';
    
    const colGapH = parseInt(block.colGapH) || 0;
    const colGapV = parseInt(block.colGapV) || 0;

    block.layout.forEach((widthPct, colIdx) => {
      const colWidth = Math.floor(innerWidth * widthPct / 100);
      let cellContent = '';

      if (block.columns[colIdx] && block.columns[colIdx].length > 0) {
        block.columns[colIdx].forEach(child => {
          cellContent += this.renderBlockToEmail(child, gs);
        });
      }

      let hPadLeft = colGapH / 2;
      let hPadRight = colGapH / 2;
      if (colIdx === 0) hPadLeft = 0;
      if (colIdx === block.layout.length - 1) hPadRight = 0;
      if (block.layout.length === 1) { hPadLeft = 0; hPadRight = 0; }
      
      const hasVPad = (colIdx < block.layout.length - 1) && (colGapV > 0);
      const vPadClass = hasVPad ? ' es-m-pad-b-v' : '';

      const colBgColor = block[`colBg_${colIdx}`] || 'transparent';
      const colBg = colBgColor !== 'transparent' ? `background-color:${colBgColor};` : '';
      const colBorder = block[`colBorder_${colIdx}`] ? `border:${block[`colBorder_${colIdx}`]};` : '';
      let gapPadStr = `padding:0 ${hPadRight}px 0 ${hPadLeft}px;`;
      let innerPadStr = block[`colPadding_${colIdx}`] ? `padding:${block[`colPadding_${colIdx}`]};` : '';

      if (block.layout.length > 1) {
        let msoPrefix = '';
        if (colIdx === 0) {
          msoPrefix = `<!--[if mso]><table style="width:${innerWidth}px;table-layout:fixed;" cellpadding="0" cellspacing="0"><tr><td style="width:${colWidth}px" valign="top"><![endif]-->\n`;
        } else {
          msoPrefix = `<!--[if mso]></td><td style="width:${colWidth}px" valign="top"><![endif]-->\n`;
        }
        
        let floatDir = 'left';
        if (colIdx === block.layout.length - 1) floatDir = 'right';

        const floatClass = 'es-m-stack-col es-col-' + colIdx;
        
        cols += `${msoPrefix}                      <table cellpadding="0" cellspacing="0" align="${floatDir}" class="${floatClass}${vPadClass}" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:${floatDir};width:${colWidth}px;box-sizing:border-box;">
                        <tr>
                          <td class="es-m-stack-gap-pad" valign="top" align="left" style="Margin:0;${gapPadStr}">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;">
                              <tr>
                                <td class="es-m-col-pad" style="${innerPadStr}${colBg}${colBorder}">
                                  <table class="es-m-col-inner" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
${cellContent || '                                    <tr><td style="padding:0;Margin:0">&nbsp;</td></tr>'}
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>\n`;
      } else {
        const wrapperStyles = `Margin:0;width:100%;box-sizing:border-box;${gapPadStr}`;
        cols += `
                        <td valign="top" align="left" class="es-m-stack-col es-col-${colIdx}${vPadClass}" style="${wrapperStyles}">
                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;">
                            <tr>
                              <td class="es-m-col-pad" style="${innerPadStr}${colBg}${colBorder}">
                                <table class="es-m-col-inner" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%">
${cellContent || '                                  <tr><td style="padding:0;Margin:0">&nbsp;</td></tr>'}
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>`;
      }
    });

    const mobileClasses = this.getMobileClasses(block);

    const bgImageStyle = block.bgImage ? `background-image:url(${block.bgImage});background-size:cover;background-position:center;` : '';
    const borderStyle = Utils.getBorderStyle(block);
    const radiusStyle = block.borderRadius && block.borderRadius !== '0px' ? `border-radius:${block.borderRadius};overflow:hidden;` : '';
    const wrapperStyle = `background-color:${block.bgColor || '#ffffff'};${bgImageStyle}${borderStyle}${radiusStyle}padding:${block.padding || '0'};`;

    // Use MSO table for multi-column
    if (block.layout.length > 1) {
      cols += `                      <!--[if mso]></td></tr></table><![endif]-->`;
      return `
                  <tr class="${mobileClasses}">
                    <td class="es-p-td" align="left" style="Margin:0;${wrapperStyle}">
${cols}
                    </td>
                  </tr>`;
    }

    return `
                  <tr class="${mobileClasses}">
                    <td class="es-p-td" align="left" style="Margin:0;${wrapperStyle}">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                        <tr>${cols}
                        </tr>
                      </table>
                    </td>
                  </tr>`;
  },

  /**
   * Text block
   */
  renderTextEmail(block, gs) {
    const textDecoration = gs.underlineLinks ? 'underline' : 'none';
    let content = (block.content || '').replace(/<a /g, `<a style="text-decoration:${textDecoration};color:${gs.linkColor};" `);
    
    // Outlook 2016 text alignment workaround
    const align = block.align || 'left';
    if (align === 'center' || align === 'right') {
      content = content.replace(/<(p|h[1-6]|div)(>| [^>]*>)/gi, (match, tag, rest) => {
        if (rest.includes('text-align')) return match;
        return `<${tag} style="text-align:${align};Margin:0;"${rest}`;
      });
    }

    const mc = this.getMobileClasses(block);
    const bgColor = block.bgColor && block.bgColor !== 'transparent' ? `background-color:${block.bgColor};` : '';
    const textColor = block.textColor || gs.textColor;
    const fontFamily = block.fontFamily || gs.fontFamily;
    const fontSize = block.fontSize || gs.fontSize;
    const lineHeight = block.lineHeight || '150%';

    const borderStyle = Utils.getBorderStyle(block);
    const radiusStyle = block.borderRadius && block.borderRadius !== '0px' ? `border-radius:${block.borderRadius};` : '';

    const padding = block.padding !== undefined ? block.padding : '10px 20px';
    let contentTd = `
                              <td class="es-p-td" align="${align}" style="${bgColor}padding:${padding};Margin:0;${borderStyle}${radiusStyle}">
                                <${block.tag || 'div'} style="font-family:${fontFamily};font-size:${fontSize};color:${textColor};line-height:${lineHeight};text-align:${align};Margin:0;">
                                  ${content}
                                </${block.tag || 'div'}>
                              </td>`;

    if (block.margin && block.margin !== '0') {
      contentTd = `
                              <td class="es-m-td" align="${align}" style="padding:${block.margin};Margin:0;">
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                  <tr>${contentTd}</tr>
                                </table>
                              </td>`;
    }

    return `
                            <tr class="${mc}">
${contentTd}
                            </tr>`;
  },

  /**
   * Image block
   */
  renderImageEmail(block, gs) {
    if (!block.src) return '';

    const width = block.width === '100%' ? (gs.contentWidth - 40) : parseInt(block.width) || 560;
    const linkStart = block.link ? `<a href="${block.link}" target="_blank" style="mso-line-height-rule:exactly;text-decoration:underline;color:${gs.linkColor};font-size:14px">` : '';
    const linkEnd = block.link ? '</a>' : '';
    const mc = this.getMobileClasses(block);
    const bgColor = block.bgColor && block.bgColor !== 'transparent' ? `background-color:${block.bgColor};` : '';
    const borderStyle = Utils.getBorderStyle(block);
    const radiusStyle = block.borderRadius && block.borderRadius !== '0px' ? `border-radius:${block.borderRadius};` : '';
    const adaptClass = block.responsive !== false ? 'adapt-img' : '';

    const padding = block.padding !== undefined ? block.padding : '10px 20px';
    let contentTd = `
                              <td class="es-p-td" align="${block.align || 'center'}" style="${bgColor}padding:${padding};Margin:0;font-size:0px">
                                ${linkStart}<img width="${width}" src="${block.src}" alt="${Utils.escapeHTML(block.alt || '')}" class="${adaptClass}" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;Margin:0;max-width:100%;width:${width}px;${borderStyle}${radiusStyle}">${linkEnd}
                              </td>`;

    if (block.margin && block.margin !== '0') {
      contentTd = `
                              <td class="es-m-td" align="${block.align || 'center'}" style="padding:${block.margin};Margin:0;">
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                  <tr>${contentTd}</tr>
                                </table>
                              </td>`;
    }

    return `
                            <tr class="${mc}">
${contentTd}
                            </tr>`;
  },

  /**
   * Button block — unified table approach for all clients
   */
  renderButtonEmail(block, gs) {
    const btnText = Utils.escapeHTML(block.text || 'Button');
    const href = block.link || '#';
    const bg = block.bgColor || gs.buttonBgColor;
    const color = block.textColor || gs.buttonTextColor;
    const fontSize = block.fontSize || gs.buttonFontSize;
    const radius = block.borderRadius || gs.buttonBorderRadius || '4px';
    const fontWeight = block.fontWeight || 'bold';
    
    const tableWidth = block.fullWidth ? 'width="100%"' : '';
    const aWidth = block.fullWidth ? 'display:block;width:auto;box-sizing:border-box;' : 'display:inline-block;';
    const mc = this.getMobileClasses(block);
    const borderStyle = Utils.getBorderStyle(block);

    const padding = block.padding !== undefined ? block.padding : '10px 20px';
    const btnPadding = '12px 30px';

    let contentTd = `
                              <td class="es-p-td" align="${block.align || 'center'}" style="padding:${padding};Margin:0;text-align:${block.align || 'center'}">
                                <!--[if mso]>
                                <table ${tableWidth} align="${block.align || 'center'}" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;mso-table-lspace:0pt;mso-table-rspace:0pt;">
                                  <tr>
                                    <td align="center" bgcolor="${bg === 'transparent' ? '' : bg}" style="padding:${btnPadding};border-radius:${radius};${borderStyle}">
                                      <a href="${href}" target="_blank" style="color:${color};font-family:${gs.fontFamily};font-size:${fontSize};font-weight:${fontWeight};text-decoration:none;">
                                        ${btnText}
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                                <![endif]-->
                                <!--[if !mso]><!-- -->
                                <table ${tableWidth} align="${block.align || 'center'}" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;">
                                  <tr>
                                    <td align="center" bgcolor="${bg === 'transparent' ? '' : bg}" role="presentation" style="border:none;border-radius:${radius};cursor:auto;background:${bg};${borderStyle}">
                                      <a href="${href}" target="_blank" style="${aWidth} background:${bg};color:${color};font-family:${gs.fontFamily};font-size:${fontSize};font-weight:${fontWeight};line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:${btnPadding};border-radius:${radius};">
                                        ${btnText}
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                                <!--<![endif]-->
                              </td>`;

    if (block.margin && block.margin !== '0') {
      contentTd = `
                              <td class="es-m-td" align="${block.align || 'center'}" style="padding:${block.margin};Margin:0;">
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                  <tr>${contentTd}</tr>
                                </table>
                              </td>`;
    }

    return `
                            <tr class="${mc}">
${contentTd}
                            </tr>`;
  },

  /**
   * Divider block
   */
  renderDividerEmail(block) {
    const mc = this.getMobileClasses(block);
    return `
                            <tr class="${mc}">
                              <td class="es-p-td" align="center" style="padding:${block.padding || '10px 20px'};Margin:0;font-size:0">
                                <table width="${block.width || '100%'}" height="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                                  <tr>
                                    <td style="padding:0;Margin:0;width:100%;border-bottom:${block.thickness || '1px'} ${block.style || 'solid'} ${block.color || '#cccccc'};height:0px"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>`;
  },

  /**
   * Spacer block
   */
  renderSpacerEmail(block) {
    const mc = this.getMobileClasses(block);
    return `
                            <tr class="${mc}">
                              <td style="padding:0;Margin:0;height:${block.height || '30px'};line-height:${block.height || '30px'};font-size:1px">&nbsp;</td>
                            </tr>`;
  },

  /**
   * Social icons block
   */
  renderSocialEmail(block, gs) {
    const socialSvgs = {
      facebook: 'https://cdn-icons-png.flaticon.com/512/733/733547.png',
      twitter: 'https://cdn-icons-png.flaticon.com/512/5968/5968830.png',
      instagram: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
      youtube: 'https://cdn-icons-png.flaticon.com/512/174/174883.png',
      linkedin: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
    };

    const size = parseInt(block.iconSize) || 24;
    let icons = '';
    (block.icons || []).forEach(icon => {
      if (!icon.show) return;
      const imgSrc = icon.imageUrl || socialSvgs[icon.platform] || '';
      if (!imgSrc) return;
      icons += `
                                <td class="es-p-td" align="center" valign="top" style="padding:0 8px;Margin:0">
                                  <a target="_blank" href="${icon.url || '#'}" style="mso-line-height-rule:exactly;text-decoration:underline;color:${gs.linkColor};font-size:14px">
                                    <img width="${size}" height="${size}" src="${imgSrc}" alt="${icon.platform}" title="${icon.platform}" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;Margin:0">
                                  </a>
                                </td>`;
    });
    const mc = this.getMobileClasses(block);

    return `
                            <tr class="${mc}">
                              <td class="es-p-td" align="${block.align || 'center'}" style="padding:${block.padding || '15px 20px'};Margin:0;font-size:0px">
                                <table align="${block.align || 'center'}" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                                  <tr>${icons}
                                  </tr>
                                </table>
                              </td>
                            </tr>`;
  },

  /**
   * Menu/nav block
   */
  renderMenuEmail(block, gs) {
    let items = '';
    const itemCount = (block.items || []).length;
    const tdWidth = block.fullWidth && itemCount > 0 ? ` width="${Math.floor(100 / itemCount)}%"` : '';
    
    (block.items || []).forEach((item, i) => {
      items += `
                                <td${tdWidth} valign="top" align="center" style="Margin:0;border:0;padding:${block.padding || '10px 5px'}">
                                  <a href="${item.link || '#'}" target="_blank" style="mso-line-height-rule:exactly;text-decoration:none;font-family:${block.fontFamily || gs.fontFamily};display:block;color:${block.color || '#232429'};font-size:${block.fontSize || '14px'};font-weight:${block.fontWeight || '600'};letter-spacing:0.5px">${Utils.escapeHTML(item.text)}</a>
                                </td>`;
    });
    const mc = this.getMobileClasses(block);

    let justify = 'center';
    if (block.fullWidth) justify = 'space-between';
    else if (block.align === 'left') justify = 'flex-start';
    else if (block.align === 'right') justify = 'flex-end';

    const blockWidth = block.width || '100%';

    return `
                            <tr class="${mc}">
                              <td style="padding:0;Margin:0" align="${block.align || 'center'}">
                                <table cellpadding="0" cellspacing="0" width="${blockWidth}" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;margin:0 auto;">
                                  <tr style="display:flex;justify-content:${justify}">${items}
                                  </tr>
                                </table>
                              </td>
                            </tr>`;
  },

  /**
   * Raw HTML block
   */
  renderHtmlEmail(block) {
    const mc = this.getMobileClasses(block);
    return `
                            <tr class="${mc}">
                              <td style="padding:${block.padding || '0'};Margin:0">
                                ${block.code || ''}
                              </td>
                            </tr>`;
  },

  // ---- Export actions ----

  /**
   * Copy HTML to clipboard
   */
  async copyToClipboard() {
    const html = this.generate();
    try {
      await navigator.clipboard.writeText(html);
      Utils.showToast('HTML copied to clipboard!', 'success');
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = html;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      Utils.showToast('HTML copied to clipboard!', 'success');
    }
  },

  /**
   * Download as .html file
   */
  downloadFile() {
    const html = this.generate();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${EmailState.data.templateName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    Utils.showToast('Email downloaded!', 'success');
  },

  /**
   * Preview in new tab
   */
  previewInTab() {
    const html = this.generate();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  },

  /**
   * Download template as JSON
   */
  downloadJson() {
    const data = JSON.stringify(EmailState.data, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${EmailState.data.templateName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_template.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    Utils.showToast('Template JSON downloaded!', 'success');
  },

  /**
   * Import template from JSON file
   */
  importJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json && typeof json === 'object') {
          EmailState.data = { ...EmailState.data, ...json };
          EmailState.data.selectedBlockId = null;
          EmailState.saveSnapshot();
          EmailState.save();
          
          if (window.Canvas) Canvas.render();
          const nameInput = document.getElementById('template-name-input');
          if (nameInput) nameInput.value = EmailState.data.templateName;
          
          Utils.showToast('Template loaded successfully!', 'success');
        }
      } catch (err) {
        Utils.showToast('Invalid template file', 'error');
      }
    };
    reader.readAsText(file);
  },

  /**
   * Show code view modal
   */
  showCodeView() {
    const html = this.generate();
    const modal = document.getElementById('code-modal');
    const codeEl = document.getElementById('code-preview-content');
    if (modal && codeEl) {
      codeEl.textContent = html;
      modal.classList.add('modal-overlay--visible');
    }
  },

  /**
   * Close code modal
   */
  closeCodeView() {
    const modal = document.getElementById('code-modal');
    if (modal) {
      modal.classList.remove('modal-overlay--visible');
    }
  }
};

window.ExportEngine = ExportEngine;
