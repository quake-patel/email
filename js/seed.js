const SeedData = {   run() {     let templates = JSON.parse(localStorage.getItem('emailBuilderTemplates') || '[]');    templates = templates.filter(t => t.id !== 'tpl_seed_ref_123');    const templateData = {
  "templateName": "New Haven Reference",
  "subjectLine": "Smarter Tools for Moving Season",
  "previewText": "Mattress carriers dollies ramps and essentials movers rely on.",
  "globalStyles": {
    "backgroundColor": "#F6F6F6",
    "contentWidth": 600,
    "fontFamily": "arial, helvetica, sans-serif",
    "fontSize": "14px",
    "textColor": "#333333",
    "linkColor": "#2CB543",
    "buttonBgColor": "#f4001e",
    "buttonTextColor": "#ffffff",
    "buttonFontSize": "16px"
  },
  "blocks": [
    {
      "id": "structure_f4btomz1l",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#ffffff",
      "padding": "20px",
      "columns": [
        [
          {
            "id": "image_7ozbuqvos",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_fdf70e28c116db634c158d815ae94f4a5210d4df2b3b9a6ebc8c096c4ae88258/images/newhavenlogopng.png",
            "width": "196",
            "align": "center",
            "link": "https://newhaven-usa.com"
          },
          {
            "id": "menu_aeg6rcv5h",
            "type": "menu",
            "items": [
              {
                "text": "MOVING BOXES",
                "link": "https://newhaven-usa.com/collections/moving-boxes"
              },
              {
                "text": "RAMPS",
                "link": "https://newhaven-usa.com/collections/ramps"
              },
              {
                "text": "EQUIPMENT",
                "link": "https://newhaven-usa.com/collections/moving-equipment-real"
              },
              {
                "text": "DOLLIES",
                "link": "https://newhaven-usa.com/collections/dollies"
              },
              {
                "text": "CRATES",
                "link": "https://newhaven-usa.com/collections/crates"
              }
            ],
            "color": "#232429",
            "fontSize": "16px",
            "fontWeight": "normal",
            "fontFamily": "Oswald",
            "align": "center",
            "padding": "20px 0 0 0"
          }
        ]
      ]
    },
    {
      "id": "structure_jgyg000i5",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#ffffff",
      "padding": "0",
      "columns": [
        [
          {
            "id": "divider_6tw8mem9j",
            "type": "divider",
            "thickness": "7px",
            "color": "#f4001e",
            "style": "solid",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_zv3dhdxa2",
      "type": "structure",
      "layout": [
        33.3,
        33.3,
        33.4
      ],
      "bgColor": "#111111",
      "padding": "25px 15px",
      "columns": [
        [
          {
            "id": "image_xkyj726sz",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_13786e64475199c9e007d4d737ce8870b707b11cd5abde947b8528add94becac/images/cottage_25dp_f4001e_fill0_wght400_grad0_opsz24.png",
            "width": "24",
            "align": "center"
          },
          {
            "id": "text_r5a0ofdy8",
            "type": "text",
            "content": "<strong>FAMILY OWNED</strong>",
            "textColor": "#ffffff",
            "fontSize": "14px",
            "align": "center",
            "padding": "10px 0 5px 0"
          },
          {
            "id": "text_74vyx8zet",
            "type": "text",
            "content": "Since 1911 — over 115 years of trusted service to movers nationwide",
            "textColor": "#aaaaaa",
            "fontSize": "14px",
            "align": "center",
            "padding": "0"
          }
        ],
        [
          {
            "id": "image_4car92fzy",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_13786e64475199c9e007d4d737ce8870b707b11cd5abde947b8528add94becac/images/location_on.png",
            "width": "24",
            "align": "center"
          },
          {
            "id": "text_uevtevvjh",
            "type": "text",
            "content": "<strong>20 LOCATIONS</strong>",
            "textColor": "#ffffff",
            "fontSize": "14px",
            "align": "center",
            "padding": "10px 0 5px 0"
          },
          {
            "id": "text_3vkbkt6bq",
            "type": "text",
            "content": "Nationwide depots mean fast fulfillment wherever your crews are working",
            "textColor": "#aaaaaa",
            "fontSize": "14px",
            "align": "center",
            "padding": "0"
          }
        ],
        [
          {
            "id": "image_3e6o68za5",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_13786e64475199c9e007d4d737ce8870b707b11cd5abde947b8528add94becac/images/bolt_25dp_f4001e_fill0_wght400_grad0_opsz24.png",
            "width": "24",
            "align": "center"
          },
          {
            "id": "text_omhg4uktw",
            "type": "text",
            "content": "<strong>SAME-DAY SUPPORT</strong>",
            "textColor": "#ffffff",
            "fontSize": "14px",
            "align": "center",
            "padding": "10px 0 5px 0"
          },
          {
            "id": "text_tzzs4uk16",
            "type": "text",
            "content": "Responds quickly no hold music no waiting just answers",
            "textColor": "#aaaaaa",
            "fontSize": "14px",
            "align": "center",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_5nt4s03py",
      "type": "structure",
      "layout": [
        75,
        25
      ],
      "bgColor": "#ffffff",
      "padding": "20px 20px 10px 20px",
      "columns": [
        [
          {
            "id": "text_72nilg8iy",
            "type": "text",
            "content": "<strong>HAND-PICKED FOR MOVING SEASON</strong>",
            "textColor": "#f4001e",
            "fontSize": "14px",
            "align": "left",
            "padding": "0"
          },
          {
            "id": "text_vnqfdlrzw",
            "type": "text",
            "content": "<h2 style=\"font-family:Oswald; font-size:30px; color:#232429; margin:5px 0 0 0;\">RELIABLE DOLLIES FOR PROFESSIONAL MOVING NEEDS</h2>",
            "align": "left",
            "padding": "0"
          }
        ],
        [
          {
            "id": "button_zae5eh56p",
            "type": "button",
            "text": "VIEW ALL ➔",
            "link": "https://newhaven-usa.com/",
            "bgColor": "transparent",
            "textColor": "#f4001e",
            "fontSize": "18px",
            "fontWeight": "bold",
            "align": "right",
            "padding": "20px 0 0 0"
          }
        ]
      ]
    },
    {
      "id": "structure_o2x4qnemp",
      "type": "structure",
      "layout": [
        50,
        50
      ],
      "bgColor": "#ffffff",
      "padding": "10px 20px",
      "colGapH": 20,
      "columns": [
        [
          {
            "id": "image_gzlzua65x",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/group_1410091665.jpg",
            "width": "266",
            "align": "center",
            "padding": "0",
            "link": "https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-dolly-18-x-30"
          },
          {
            "id": "text_e08bdx189",
            "type": "text",
            "content": "<strong>Slip-Pruf Deluxe Dolly 18\" x 30\"</strong>",
            "fontSize": "22px",
            "textColor": "#333333",
            "align": "left",
            "padding": "10px 0"
          },
          {
            "id": "button_129ok7ie3",
            "type": "button",
            "text": "SHOP NOW",
            "link": "https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-dolly-18-x-30",
            "bgColor": "#f4001e",
            "textColor": "#ffffff",
            "fullWidth": true,
            "padding": "0"
          }
        ],
        [
          {
            "id": "image_ua14gwo6h",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/slippruf_deluxe_chicago_style_dolly_18_x_32_1.jpg",
            "width": "266",
            "align": "center",
            "padding": "0",
            "link": "https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-chicago-style-dolly"
          },
          {
            "id": "text_rctp5sld1",
            "type": "text",
            "content": "<strong>Slip-Pruf Deluxe Chicago Style Dolly 18\" x 32\"</strong>",
            "fontSize": "22px",
            "textColor": "#333333",
            "align": "left",
            "padding": "10px 0"
          },
          {
            "id": "button_0jsv5u8qm",
            "type": "button",
            "text": "SHOP NOW",
            "link": "https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-chicago-style-dolly",
            "bgColor": "#f4001e",
            "textColor": "#ffffff",
            "fullWidth": true,
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_o3elle7x9",
      "type": "structure",
      "layout": [
        50,
        50
      ],
      "bgColor": "#ffffff",
      "padding": "20px 20px 40px 20px",
      "colGapH": 20,
      "columns": [
        [
          {
            "id": "image_nsv8ic56i",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/h_dolly_dual_rail_18__x_30_.jpg",
            "width": "266",
            "align": "center",
            "padding": "0",
            "link": "https://newhaven-usa.com/collections/4-wheel-dollies/products/dual-rail-h-dolly-18-x-30"
          },
          {
            "id": "text_hsbovlzy0",
            "type": "text",
            "content": "<strong>'H' Dolly Dual Rail 18\" x 30\"</strong>",
            "fontSize": "22px",
            "textColor": "#333333",
            "align": "left",
            "padding": "10px 0"
          },
          {
            "id": "button_o4d2ep436",
            "type": "button",
            "text": "SHOP NOW",
            "link": "https://newhaven-usa.com/collections/4-wheel-dollies/products/dual-rail-h-dolly-18-x-30",
            "bgColor": "#f4001e",
            "textColor": "#ffffff",
            "fullWidth": true,
            "padding": "0"
          }
        ],
        [
          {
            "id": "image_y8wczrg0t",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/furniture_dolly_carpeted_18_x_30.jpg",
            "width": "266",
            "align": "center",
            "padding": "0",
            "link": "https://newhaven-usa.com/collections/4-wheel-dollies/products/carpeted-furniture-dolly-18-x-30"
          },
          {
            "id": "text_mb5yrjv9j",
            "type": "text",
            "content": "<strong>Furniture Dolly Carpeted 18\" x 30\"</strong>",
            "fontSize": "22px",
            "textColor": "#333333",
            "align": "left",
            "padding": "10px 0"
          },
          {
            "id": "button_c7q77jeyx",
            "type": "button",
            "text": "SHOP NOW",
            "link": "https://newhaven-usa.com/collections/4-wheel-dollies/products/carpeted-furniture-dolly-18-x-30",
            "bgColor": "#f4001e",
            "textColor": "#ffffff",
            "fullWidth": true,
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_n9de3fxdz",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#ffffff",
      "padding": "0 20px 40px 20px",
      "columns": [
        [
          {
            "id": "button_r7g0isjuj",
            "type": "button",
            "text": "VIEW ALL PRODUCTS",
            "link": "https://newhaven-usa.com/",
            "bgColor": "transparent",
            "textColor": "#f4001e",
            "fontSize": "18px",
            "align": "center",
            "padding": "10px 20px"
          }
        ]
      ]
    },
    {
      "id": "structure_9cx2ba7m7",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#282828",
      "padding": "40px 20px 25px 20px",
      "columns": [
        [
          {
            "id": "image_wrt4fz908",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/dolly_converter_video.jpg",
            "width": "560",
            "align": "center",
            "padding": "0",
            "link": "https://youtu.be/lI7fEIbwVY0?si=bO6Q4JcLGSnmQczx"
          },
          {
            "id": "text_va28aede8",
            "type": "text",
            "content": "<strong><a href=\"https://youtu.be/lI7fEIbwVY0\" style=\"color:#ffffff; text-decoration:none;\">Dolly Converter by New Haven Moving Equipment - converts your 4 wheel dollies into a panel cart</a></strong>",
            "fontSize": "28px",
            "textColor": "#ffffff",
            "align": "center",
            "padding": "15px 0 0 0"
          }
        ]
      ]
    },
    {
      "id": "structure_trbejwrls",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#f5f2ec",
      "padding": "20px 20px 0 20px",
      "columns": [
        [
          {
            "id": "text_17x2lnd2y",
            "type": "text",
            "content": "<strong>BROWSE CATEGORIES</strong>",
            "textColor": "#f4001e",
            "fontSize": "14px",
            "align": "left",
            "padding": "0"
          },
          {
            "id": "text_8c8rulrzq",
            "type": "text",
            "content": "<h2 style=\"font-family:Oswald; font-size:30px; color:#232429; margin:5px 0 0 0;\">EVERYTHING FOR THE MOVE</h2>",
            "align": "left",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_qo04rxf5x",
      "type": "structure",
      "layout": [
        50,
        50
      ],
      "bgColor": "#f5f2ec",
      "padding": "20px 20px 30px 20px",
      "colGapH": 20,
      "columns": [
        [
          {
            "id": "text_gjqjso7rn",
            "type": "text",
            "content": "<div style=\"background:#fff; border-left:3px solid #f4001e; padding:10px;\"><a href=\"#\" style=\"text-decoration:none; color:#232429;\"><strong>MOVING BOXES</strong><br><span style=\"color:#6b6460; font-size:14px;\">Residential and commercial cartons in every size, built to protect.</span></a></div>",
            "padding": "0 0 10px 0"
          },
          {
            "id": "text_6ky2bxekt",
            "type": "text",
            "content": "<div style=\"background:#fff; border-left:3px solid #f4001e; padding:10px;\"><a href=\"#\" style=\"text-decoration:none; color:#232429;\"><strong>MOVING PADS</strong><br><span style=\"color:#6b6460; font-size:14px;\">Heavy-duty furniture blankets for maximum, dependable protection.</span></a></div>",
            "padding": "0 0 10px 0"
          },
          {
            "id": "text_tj6il7ltk",
            "type": "text",
            "content": "<div style=\"background:#fff; border-left:3px solid #f4001e; padding:10px;\"><a href=\"#\" style=\"text-decoration:none; color:#232429;\"><strong>DOLLIES</strong><br><span style=\"color:#6b6460; font-size:14px;\">2-wheel, 4-wheel, and all-terrain options for any moving project.</span></a></div>",
            "padding": "0"
          }
        ],
        [
          {
            "id": "text_p6fif1tch",
            "type": "text",
            "content": "<div style=\"background:#fff; border-left:3px solid #f4001e; padding:10px;\"><a href=\"#\" style=\"text-decoration:none; color:#232429;\"><strong>RAMPS</strong><br><span style=\"color:#6b6460; font-size:14px;\">Fiberglass, aluminum, split ramps, and dock boards for every truck.</span></a></div>",
            "padding": "0 0 10px 0"
          },
          {
            "id": "text_jecjz7roa",
            "type": "text",
            "content": "<div style=\"background:#fff; border-left:3px solid #f4001e; padding:10px;\"><a href=\"#\" style=\"text-decoration:none; color:#232429;\"><strong>PACKAGING</strong><br><span style=\"color:#6b6460; font-size:14px;\">Tape, stretch wrap, bubble roll, and paper pads for a complete pack.</span></a></div>",
            "padding": "0 0 10px 0"
          },
          {
            "id": "text_cjepbblbl",
            "type": "text",
            "content": "<div style=\"background:#fff; border-left:3px solid #f4001e; padding:10px;\"><a href=\"#\" style=\"text-decoration:none; color:#232429;\"><strong>CARGO CONTROL</strong><br><span style=\"color:#6b6460; font-size:14px;\">A century of precision cargo control for pros who demand more.</span></a></div>",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_km85dv58a",
      "type": "structure",
      "layout": [
        16.6,
        83.4
      ],
      "bgColor": "#000000",
      "padding": "20px",
      "columns": [
        [
          {
            "id": "text_bu000r79q",
            "type": "text",
            "content": "<p style=\"font-size:50px; margin:0;\">💡</p>",
            "align": "center",
            "padding": "0"
          }
        ],
        [
          {
            "id": "text_lgj3awr4k",
            "type": "text",
            "content": "<strong style=\"color:#ffe066;\">Pro Mover Tip of the Month</strong><br><span style=\"color:#a8b5c8;\">Always pack heaviest items in SMALL boxes — you'll thank yourself (and your knees) later. Read more expert moving tips on our</span> <a href=\"#\" style=\"color:#ffe066; text-decoration:none;\"><strong>blog →</strong></a>",
            "align": "left",
            "padding": "10px 0 0 0"
          }
        ]
      ]
    },
    {
      "id": "structure_zwls2t2fp",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#f5f2ec",
      "padding": "40px 20px 20px 20px",
      "columns": [
        [
          {
            "id": "text_gfi48cq6w",
            "type": "text",
            "content": "<strong>⭐ REAL TALK FROM REAL MOVERS</strong>",
            "textColor": "#f4001e",
            "fontSize": "14px",
            "align": "center",
            "padding": "0"
          },
          {
            "id": "text_xy4l447i3",
            "type": "text",
            "content": "<h2 style=\"font-family:Oswald; font-size:30px; color:#232429; margin:5px 0 0 0;\">CUSTOMERS LOVE US</h2>",
            "align": "center",
            "padding": "0"
          },
          {
            "id": "text_29fkck7sb",
            "type": "text",
            "content": "<span style=\"color:#666666;\">(We didn't pay them. We promise. We think.)</span>",
            "align": "center",
            "padding": "5px 0 0 0"
          }
        ]
      ]
    },
    {
      "id": "structure_7ey2rqge5",
      "type": "structure",
      "layout": [
        50,
        50
      ],
      "bgColor": "#f5f2ec",
      "padding": "0 20px 40px 20px",
      "colGapH": 20,
      "columns": [
        [
          {
            "id": "text_7kryxte9m",
            "type": "text",
            "content": "<div style=\"background:#fff; border-left:3px solid #f4001e; border-radius:9px; padding:15px;\"><strong style=\"color:#f39c12; font-size:18px;\">★★★★★</strong><br><br><strong>Works perfectly</strong><br>\"Works with standard four wheelers\"<br><br><span style=\"color:#999999; font-size:12px;\">— James F. <span style=\"color:#c0392b;\">/ Verified Buyer</span></span></div>",
            "padding": "0"
          }
        ],
        [
          {
            "id": "text_kqyayg817",
            "type": "text",
            "content": "<div style=\"background:#fff; border-left:3px solid #f4001e; border-radius:9px; padding:15px;\"><strong style=\"color:#f39c12; font-size:18px;\">★★★★★</strong><br><br><strong>Life savers</strong><br>\"I work solo alot. The better your equipped, the better you look and feel...\"<br><br><span style=\"color:#999999; font-size:12px;\">— James B. <span style=\"color:#c0392b;\">/ Verified Buyer</span></span></div>",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_h8w8jws6d",
      "type": "structure",
      "layout": [
        50,
        50
      ],
      "bgColor": "#fdfbf7",
      "padding": "30px 20px 30px 20px",
      "columns": [
        [
          {
            "id": "text_l9ctn3670",
            "type": "text",
            "content": "<h3 style=\"font-family:lato, 'helvetica neue', helvetica, arial, sans-serif; font-size:22px; font-weight:600; margin:0;\"><span style=\"color:#232429;\">Now Open in</span> <span style=\"color:#F4001E;\">Pensacola</span></h3><h2 style=\"font-family:lato, 'helvetica neue', helvetica, arial, sans-serif; font-size:42px; font-weight:bold; color:#232429; margin:5px 0 10px 0; line-height:1.1; letter-spacing:-1px;\"><span style=\"color:#F4001E;\">20</span> Locations<br>Nationwide</h2><p style=\"font-family:lato, 'helvetica neue', helvetica, arial, sans-serif; font-size:18px; margin:0; color:#232429; line-height:1.4;\">Our newest store offering the same trusted moving equipment, now in your neighborhood.</p>",
            "align": "left",
            "mobileAlign": "center",
            "padding": "0"
          },
          {
            "id": "button_fnt9fypv4",
            "type": "button",
            "text": "FIND NEARBY STORES",
            "link": "https://newhaven-usa.com/apps/store-locator/",
            "bgColor": "#f4001e",
            "textColor": "#ffffff",
            "align": "left",
            "mobileAlign": "center",
            "padding": "25px 0 0 0",
            "fontSize": "16px",
            "fontFamily": "lato, \"helvetica neue\", helvetica, arial, sans-serif"
          }
        ],
        [
          {
            "id": "image_504lvbhx5",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/new_location_map.png",
            "width": "100%",
            "align": "right",
            "mobileAlign": "center",
            "padding": "10px 0 0 0"
          }
        ]
      ]
    },
    {
      "id": "structure_ny8bq7lzv",
      "type": "structure",
      "layout": [
        44,
        56
      ],
      "bgColor": "#fff6e1",
      "padding": "20px 20px 20px 20px",
      "columns": [
        [
          {
            "id": "text_mue8jwoas",
            "type": "text",
            "content": "<h2 style=\"font-family:lato, 'helvetica neue', helvetica, arial, sans-serif; font-size:34px; line-height:1.2; margin:0;\"><span style=\"color:#232429\">Now Open in</span><br><span style=\"color:#F4001E\">Pensacola!</span></h2>",
            "align": "left",
            "mobileAlign": "center",
            "padding": "10px 0"
          },
          {
            "id": "text_ymazuj934",
            "type": "text",
            "content": "<p style=\"font-family:lato, 'helvetica neue', helvetica, arial, sans-serif; font-size:18px; line-height:24px; margin:0; color:#232429;\">Serving movers and professionals across the Florida Panhandle with the gear you trust!</p>",
            "align": "left",
            "mobileAlign": "center",
            "padding": "10px 0 0 0"
          },
          {
            "id": "button_xavftxiyw",
            "type": "button",
            "text": "GET DIRECTIONS",
            "link": "https://maps.app.goo.gl/bZwoks6TAnrdYXBw9",
            "bgColor": "#f4001e",
            "textColor": "#ffffff",
            "align": "left",
            "mobileAlign": "center",
            "padding": "30px 0 10px 0",
            "fontSize": "16px",
            "fontFamily": "lato, \"helvetica neue\", helvetica, arial, sans-serif"
          }
        ],
        [
          {
            "id": "image_60pytpnij",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/pensacola.png",
            "width": "313",
            "align": "center",
            "mobileAlign": "center",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_9wm6djg2k",
      "type": "structure",
      "layout": [
        33,
        33,
        34
      ],
      "bgColor": "#fff6e1",
      "padding": "15px 20px 20px 20px",
      "columns": [
        [
          {
            "id": "image_uwp507tkp",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/time_icon.png",
            "width": "60",
            "align": "center",
            "padding": "0 0 10px 0"
          },
          {
            "id": "text_h6owjg5cb",
            "type": "text",
            "content": "<p style=\"margin:0; text-align:center;\">Mon to Fri:<br>8:00AM - 5:00PM</p>",
            "align": "center",
            "padding": "0",
            "fontSize": "16px",
            "textColor": "#232429"
          }
        ],
        [
          {
            "id": "image_003ivb20u",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/callimage.png",
            "width": "60",
            "align": "center",
            "padding": "0 0 10px 0",
            "link": "tel:4482337378"
          },
          {
            "id": "text_6gvnvemlj",
            "type": "text",
            "content": "<p style=\"margin:0; text-align:center;\"><a href=\"tel:4482337378\" style=\"color:#232429; text-decoration:none;\">(448) 233-7378</a></p>",
            "align": "center",
            "padding": "0",
            "fontSize": "16px",
            "textColor": "#232429"
          }
        ],
        [
          {
            "id": "image_n98y500ml",
            "type": "image",
            "src": "https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/location_map_icon.png",
            "width": "60",
            "align": "center",
            "padding": "0 0 10px 0",
            "link": "https://maps.app.goo.gl/bZwoks6TAnrdYXBw9"
          },
          {
            "id": "text_exxw3lt0q",
            "type": "text",
            "content": "<p style=\"margin:0; text-align:center;\"><a href=\"https://maps.app.goo.gl/bZwoks6TAnrdYXBw9\" style=\"color:#232429; text-decoration:none; font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;\">9970 N. Palafox Street<br>Pensacola, FL 32534</a></p>",
            "align": "center",
            "padding": "0",
            "fontSize": "16px",
            "textColor": "#232429"
          }
        ]
      ]
    },
    {
      "id": "structure_ixn2fiphl",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#000000",
      "padding": "50px 0 0 0",
      "columns": [
        [
          {
            "id": "text_bdrtq1vxy",
            "type": "text",
            "content": "<h3 style=\"margin:0;\"><a href=\"https://newhaven-usa.com/\" style=\"color:#ffffff; text-decoration:none;\">New Haven Moving Equipment</a></h3><p style=\"margin:0; color:#ffffff;\">41 Washington Avenue,<br>East Haven, Connecticut 06512, USA</p>",
            "align": "center",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_g389058i6",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#000000",
      "padding": "20px 40px 25px 40px",
      "columns": [
        [
          {
            "id": "text_8qtjlrrm7",
            "type": "text",
            "content": "<h3 style=\"margin:0; color:#ffffff;\"><strong>20 locations to serve you better - Family owned since 1911</strong></h3>",
            "align": "center",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_5vcd7fmho",
      "type": "structure",
      "layout": [
        25,
        25,
        25,
        25
      ],
      "bgColor": "#000000",
      "padding": "5px 50px 20px 70px",
      "columns": [
        [
          {
            "id": "text_tvoh3rwe4",
            "type": "text",
            "content": "<p style=\"color:#ffffff; margin:0;\"><strong>WEST</strong><br><br>Los Angeles<br>San Leandro<br>Phoenix<br>Denver<br>Salt Lake City</p>",
            "align": "left",
            "padding": "0"
          }
        ],
        [
          {
            "id": "text_5h5lcx2q5",
            "type": "text",
            "content": "<p style=\"color:#ffffff; margin:0;\"><strong>SOUTHWEST</strong><br><br>Dallas<br>Houston<br>San Antonio</p>",
            "align": "left",
            "padding": "0"
          }
        ],
        [
          {
            "id": "text_1mkg7dy7f",
            "type": "text",
            "content": "<p style=\"color:#ffffff; margin:0;\"><strong>MIDWEST</strong><br><br>Chicago<br>Minneapolis<br>Louisville<br>Detroit<br>Kansas City<br>St Louis</p>",
            "align": "left",
            "padding": "0"
          }
        ],
        [
          {
            "id": "text_b60jpovkg",
            "type": "text",
            "content": "<p style=\"color:#ffffff; margin:0;\"><strong>EAST</strong><br><br>New Haven<br>New Jersey<br>DC<br>Greenville<br>Miami<br>Pensacola</p>",
            "align": "left",
            "padding": "0"
          }
        ]
      ]
    },
    {
      "id": "structure_jtrihhjhg",
      "type": "structure",
      "layout": [
        100
      ],
      "bgColor": "#000000",
      "padding": "20px 0",
      "columns": [
        [
          {
            "id": "social_p4q5r3xr3",
            "type": "social",
            "icons": [
              {
                "platform": "facebook",
                "url": "https://www.facebook.com/NewHavenMovingEquipment",
                "show": true
              },
              {
                "platform": "twitter",
                "url": "https://twitter.com/newhavenmoving",
                "show": true
              },
              {
                "platform": "instagram",
                "url": "https://www.instagram.com/newhavenmovingequipment/",
                "show": true
              },
              {
                "platform": "youtube",
                "url": "https://www.youtube.com/channel/UCVYJyHnmpMisJ3WfUs_4RtA",
                "show": true
              },
              {
                "platform": "linkedin",
                "url": "#",
                "show": false
              },
              {
                "platform": "custom 1",
                "url": "#",
                "imageUrl": "",
                "show": false
              },
              {
                "platform": "custom 2",
                "url": "#",
                "imageUrl": "",
                "show": false
              }
            ],
            "iconSize": "24",
            "align": "center",
            "padding": "0 0 20px 0"
          },
          {
            "id": "text_4rljnl2qk",
            "type": "text",
            "content": "<p style=\"margin:0; color:#ffffff;\">Want to change how you receive these emails?<br>You can <a href=\"{% manage_preferences_link %}\" style=\"color:#ffffff; text-decoration:underline;\">update your preferences</a> or <a href=\"{% unsubscribe_link %}\" style=\"color:#ffffff; text-decoration:underline;\">unsubscribe</a> from this list.</p>",
            "align": "center",
            "padding": "0 0 40px 0"
          }
        ]
      ]
    }
  ]
};    templateData.templateId = 'tpl_seed_ref_123';    templates.push({ id: 'tpl_seed_ref_123', name: 'New Haven Reference', date: new Date().getTime(), data: templateData });    localStorage.setItem('emailBuilderTemplates', JSON.stringify(templates));    localStorage.setItem('emailBuilderState', JSON.stringify(templateData));    console.log('Seeded COMPLETED reference template into gallery and canvas');  }};SeedData.run();