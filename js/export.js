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
      bodyContent += this.renderBlockToEmail(block, gs);
    });

    // Build preheader (hidden preview text)
    const preheaderHtml = previewText
      ? `\n    <span style="display:none !important;font-size:0px;line-height:0;max-height:0px;max-width:0px;opacity:0;overflow:hidden;visibility:hidden;mso-hide:all">${Utils.escapeHTML(previewText)}</span>`
      : '';

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>${Utils.escapeHTML(subjectLine)}</title>
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
    #outlook a { padding: 0; }
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    p { display: block; margin: 0; }
    a[x-apple-data-detectors], #MessageViewBody a { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    .es-desktop-only { display: table-row !important; }
    .es-mobile-only { display: none !important; mso-hide: all; }
    @media only screen and (max-width: ${width}px) {
      .es-wrapper { width: 100% !important; }
      .es-content-body { width: 100% !important; }
      .adapt-img { max-width: 100% !important; height: auto !important; }
      .es-m-p10 { padding: 10px !important; }
      .es-m-p15 { padding: 15px !important; }
      h1 { font-size: 28px !important; line-height: 120% !important; }
      h2 { font-size: 22px !important; line-height: 120% !important; }
      h3 { font-size: 18px !important; line-height: 120% !important; }
      .es-button { display: block !important; width: 100% !important; }
      .es-desktop-only { display: none !important; }
      .es-mobile-only { display: table-row !important; }
      .es-m-hide { display: none !important; max-height: 0 !important; overflow: hidden !important; mso-hide: all !important; }
      .es-m-stack .es-m-stack-col { display: block !important; width: 100% !important; max-width: 100% !important; }
      .es-m-stack .es-m-col-inner { width: 100% !important; max-width: 100% !important; }
      .es-m-col-pad { padding-left: 0 !important; padding-right: 0 !important; }
${this.generatePerBlockMobileCss(blocks, width)}
    }
    /* Width containment */
    .es-content-body { max-width: ${width}px !important; }
    .es-content-body table { max-width: 100%; }
    .es-content-body img { max-width: 100%; height: auto; }
    .es-content-body td { word-break: break-word; }
  </style>
</head>
<body class="body" style="width:100%;height:100%;font-family:${gs.fontFamily};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">${preheaderHtml}
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:${gs.backgroundColor}">
    <table cellpadding="0" width="100%" cellspacing="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:${gs.backgroundColor}">
      <tr>
        <td valign="top" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
            <tr>
              <td class="es-p-td" align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body" width="${width}" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:#ffffff;width:${width}px;max-width:${width}px;table-layout:fixed" role="none">
${bodyContent}
                </table>
              </td>
            </tr>
          </table>
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
  generatePerBlockMobileCss(blocks, width) {
    let css = '';
    const processBlock = (block) => {
      // Mobile font size override for text blocks
      if (block.type === 'text' && block.mobileFontSize) {
        css += `      .es-b-${block.id} p, .es-b-${block.id} a, .es-b-${block.id} span, .es-b-${block.id} h1, .es-b-${block.id} h2, .es-b-${block.id} h3 { font-size: ${block.mobileFontSize} !important; }\n`;
      }
      if (block.type === 'button' && block.mobileFontSize) {
        css += `      .es-b-${block.id} a, .es-b-${block.id} span { font-size: ${block.mobileFontSize} !important; }\n`;
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
          css += `      .es-b-${block.id} .es-col-${i} { display: table-cell !important; width: ${wPct}% !important; max-width: ${wPct}% !important; }\n`;
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
    const innerWidth = width - 40;

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
      let colPadStr = `padding:0 ${hPadRight}px 0 ${hPadLeft}px;`;
      if (block[`colPadding_${colIdx}`]) colPadStr = `padding:${block[`colPadding_${colIdx}`]};`;

      const colStyles = `Margin:0;width:${colWidth}px;max-width:${colWidth}px;box-sizing:border-box;`;

      cols += `
                        <td valign="top" align="left" width="${colWidth}" class="es-m-stack-col es-col-${colIdx}${vPadClass}" style="${colStyles}">
                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;">
                            <tr>
                              <td class="es-m-col-pad" style="${colPadStr}${colBg}${colBorder}">
                                <table class="es-m-col-inner" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;max-width:${colWidth}px;table-layout:fixed">
${cellContent || '                                  <tr><td style="padding:0;Margin:0">&nbsp;</td></tr>'}
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>`;
    });

    const mobileClasses = this.getMobileClasses(block);

    const bgImageStyle = block.bgImage ? `background-image:url(${block.bgImage});background-size:cover;background-position:center;` : '';
    const borderStyle = Utils.getBorderStyle(block);
    const radiusStyle = block.borderRadius && block.borderRadius !== '0px' ? `border-radius:${block.borderRadius};overflow:hidden;` : '';
    const wrapperStyle = `background-color:${block.bgColor || '#ffffff'};${bgImageStyle}${borderStyle}${radiusStyle}padding:${block.padding || '0'};`;

    // Use MSO table for multi-column
    if (block.layout.length > 1) {
      return `
                  <tr class="${mobileClasses}">
                    <td class="es-p-td" align="left" style="Margin:0;${wrapperStyle}">
                      <!--[if mso]><table style="width:${innerWidth}px" cellpadding="0" cellspacing="0"><tr>${block.layout.map((w, i) => `<td style="width:${Math.floor(innerWidth * w / 100)}px" valign="top">`).join('')}<!--<![endif]-->
                      <table cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;max-width:${innerWidth}px;table-layout:fixed">
                        <tr>${cols}
                        </tr>
                      </table>
                      <!--[if mso]>${block.layout.map(() => '</td>').join('')}</tr></table><![endif]-->
                    </td>
                  </tr>`;
    }

    return `
                  <tr class="${mobileClasses}">
                    <td class="es-p-td" align="left" style="Margin:0;${wrapperStyle}">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;max-width:${innerWidth}px;table-layout:fixed">
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
                                <div style="font-family:${fontFamily};font-size:${fontSize};color:${textColor};line-height:${lineHeight};text-align:${align}">
                                  ${content}
                                </div>
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

    const padding = block.padding !== undefined ? block.padding : '10px 20px';
    let contentTd = `
                              <td class="es-p-td" align="${block.align || 'center'}" style="${bgColor}padding:${padding};Margin:0;font-size:0px">
                                ${linkStart}<img width="${width}" src="${block.src}" alt="${Utils.escapeHTML(block.alt || '')}" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;Margin:0;max-width:100%;width:${width}px;${borderStyle}${radiusStyle}">${linkEnd}
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
   * Button block — with VML fallback for Outlook
   */
  renderButtonEmail(block, gs) {
    const btnText = Utils.escapeHTML(block.text || 'Button');
    const href = block.link || '#';
    const bg = block.bgColor || gs.buttonBgColor;
    const color = block.textColor || gs.buttonTextColor;
    const fontSize = block.fontSize || gs.buttonFontSize;
    const radius = block.borderRadius || gs.buttonBorderRadius;
    const radiusArc = parseInt(radius) > 0 ? Math.round((parseInt(radius) / 40) * 50) : 0;
    const spanWidth = block.fullWidth ? `display:block;width:100%;` : 'display:inline-block;';
    const aWidth = block.fullWidth ? `display:block;width:auto;` : 'display:inline-block;';
    const vmlWidth = block.fullWidth ? '100%' : '200px';
    const tableWidth = block.fullWidth ? 'width="100%"' : '';
    const mc = this.getMobileClasses(block);
    const fontWeight = block.fontWeight || 'bold';
    const fwNum = fontWeight === 'normal' ? '400' : '700';
    const borderStyle = Utils.getBorderStyle(block);

    const padding = block.padding !== undefined ? block.padding : '10px 20px';
    let contentTd = `
                              <td class="es-p-td" align="${block.align || 'center'}" style="padding:${padding};Margin:0;text-align:${block.align || 'center'}">
                                <table ${tableWidth} align="${block.align || 'center'}" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;">
                                  <tr>
                                    <td class="es-p-td" align="center" style="Margin:0;padding:0;">
                                      <!--[if mso]><a href="${href}" target="_blank" hidden>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="${href}" style="height:40px; v-text-anchor:middle; width:${vmlWidth}" arcsize="${radiusArc}%" stroke="f" fillcolor="${bg}">
                                          <w:anchorlock></w:anchorlock>
                                          <center style='color:${color}; font-family:${gs.fontFamily}; font-size:${parseInt(fontSize) - 2}px; font-weight:${fwNum}; line-height:${parseInt(fontSize) - 2}px; mso-text-raise:1px'>${btnText}</center>
                                        </v:roundrect></a>
                                      <![endif]-->
                                      <!--[if !mso]><!-- --><span style="border-style:solid;border-color:${bg};background:${bg};border-width:0px;${spanWidth}border-radius:${radius};mso-hide:all;${borderStyle}">
                                        <a href="${href}" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:${color};font-size:${fontSize};padding:12px 30px;${aWidth}background:${bg};border-radius:${radius};font-family:${gs.fontFamily};font-weight:${fontWeight};font-style:normal;line-height:120%;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid ${bg};${borderStyle}">${btnText}</a>
                                      </span><!--<![endif]-->
                                    </td>
                                  </tr>
                                </table>
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

    return `
                            <tr class="${mc}">
                              <td style="padding:0;Margin:0">
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
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
