const fs = require('fs');
const genId = (type) => type + '_' + Math.random().toString(36).substr(2, 9);

const blocks = [
  // Header (Logo + Menu)
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#ffffff',
    padding: '20px',
    columns: [
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_fdf70e28c116db634c158d815ae94f4a5210d4df2b3b9a6ebc8c096c4ae88258/images/newhavenlogopng.png',
          width: '196',
          align: 'center',
          link: 'https://newhaven-usa.com'
        },
        {
          id: genId('menu'),
          type: 'menu',
          items: [
            { text: 'MOVING BOXES', link: 'https://newhaven-usa.com/collections/moving-boxes' },
            { text: 'RAMPS', link: 'https://newhaven-usa.com/collections/ramps' },
            { text: 'EQUIPMENT', link: 'https://newhaven-usa.com/collections/moving-equipment-real' },
            { text: 'DOLLIES', link: 'https://newhaven-usa.com/collections/dollies' },
            { text: 'CRATES', link: 'https://newhaven-usa.com/collections/crates' }
          ],
          color: '#232429',
          fontSize: '16px',
          fontWeight: 'normal',
          fontFamily: 'Oswald',
          align: 'center',
          padding: '20px 0 0 0'
        }
      ]
    ]
  },
  // Red Divider
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#ffffff',
    padding: '0',
    columns: [
      [
        {
          id: genId('divider'),
          type: 'divider',
          thickness: '7px',
          color: '#f4001e',
          style: 'solid',
          padding: '0'
        }
      ]
    ]
  },
  // Hero Features (3 cols, dark bg)
  {
    id: genId('structure'),
    type: 'structure',
    layout: [33.3, 33.3, 33.4],
    bgColor: '#111111',
    padding: '25px 15px',
    columns: [
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_13786e64475199c9e007d4d737ce8870b707b11cd5abde947b8528add94becac/images/cottage_25dp_f4001e_fill0_wght400_grad0_opsz24.png',
          width: '24',
          align: 'center'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>FAMILY OWNED</strong>',
          textColor: '#ffffff',
          fontSize: '14px',
          align: 'center',
          padding: '10px 0 5px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: 'Since 1911 — over 115 years of trusted service to movers nationwide',
          textColor: '#aaaaaa',
          fontSize: '14px',
          align: 'center',
          padding: '0'
        }
      ],
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_13786e64475199c9e007d4d737ce8870b707b11cd5abde947b8528add94becac/images/location_on.png',
          width: '24',
          align: 'center'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>20 LOCATIONS</strong>',
          textColor: '#ffffff',
          fontSize: '14px',
          align: 'center',
          padding: '10px 0 5px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: 'Nationwide depots mean fast fulfillment wherever your crews are working',
          textColor: '#aaaaaa',
          fontSize: '14px',
          align: 'center',
          padding: '0'
        }
      ],
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_13786e64475199c9e007d4d737ce8870b707b11cd5abde947b8528add94becac/images/bolt_25dp_f4001e_fill0_wght400_grad0_opsz24.png',
          width: '24',
          align: 'center'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>SAME-DAY SUPPORT</strong>',
          textColor: '#ffffff',
          fontSize: '14px',
          align: 'center',
          padding: '10px 0 5px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: 'Responds quickly no hold music no waiting just answers',
          textColor: '#aaaaaa',
          fontSize: '14px',
          align: 'center',
          padding: '0'
        }
      ]
    ]
  },
  // Section Title
  {
    id: genId('structure'),
    type: 'structure',
    layout: [75, 25],
    bgColor: '#ffffff',
    padding: '20px 20px 10px 20px',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>HAND-PICKED FOR MOVING SEASON</strong>',
          textColor: '#f4001e',
          fontSize: '14px',
          align: 'left',
          padding: '0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<h2 style="font-family:Oswald; font-size:30px; color:#232429; margin:5px 0 0 0;">RELIABLE DOLLIES FOR PROFESSIONAL MOVING NEEDS</h2>',
          align: 'left',
          padding: '0'
        }
      ],
      [
        {
          id: genId('button'),
          type: 'button',
          text: 'VIEW ALL ➔',
          link: 'https://newhaven-usa.com/',
          bgColor: 'transparent',
          textColor: '#f4001e',
          fontSize: '18px',
          fontWeight: 'bold',
          align: 'right',
          padding: '20px 0 0 0'
        }
      ]
    ]
  },
  // Products Row 1
  {
    id: genId('structure'),
    type: 'structure',
    layout: [50, 50],
    bgColor: '#ffffff',
    padding: '10px 20px',
    colGapH: 20,
    columns: [
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/group_1410091665.jpg',
          width: '266',
          align: 'center',
          padding: '0',
          link: 'https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-dolly-18-x-30'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>Slip-Pruf Deluxe Dolly 18" x 30"</strong>',
          fontSize: '22px',
          textColor: '#333333',
          align: 'left',
          padding: '10px 0'
        },
        {
          id: genId('button'),
          type: 'button',
          text: 'SHOP NOW',
          link: 'https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-dolly-18-x-30',
          bgColor: '#f4001e',
          textColor: '#ffffff',
          fullWidth: true,
          padding: '0'
        }
      ],
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/slippruf_deluxe_chicago_style_dolly_18_x_32_1.jpg',
          width: '266',
          align: 'center',
          padding: '0',
          link: 'https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-chicago-style-dolly'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>Slip-Pruf Deluxe Chicago Style Dolly 18" x 32"</strong>',
          fontSize: '22px',
          textColor: '#333333',
          align: 'left',
          padding: '10px 0'
        },
        {
          id: genId('button'),
          type: 'button',
          text: 'SHOP NOW',
          link: 'https://newhaven-usa.com/collections/4-wheel-dollies/products/slip-pruf-deluxe-chicago-style-dolly',
          bgColor: '#f4001e',
          textColor: '#ffffff',
          fullWidth: true,
          padding: '0'
        }
      ]
    ]
  },
  // Products Row 2
  {
    id: genId('structure'),
    type: 'structure',
    layout: [50, 50],
    bgColor: '#ffffff',
    padding: '20px 20px 40px 20px',
    colGapH: 20,
    columns: [
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/h_dolly_dual_rail_18__x_30_.jpg',
          width: '266',
          align: 'center',
          padding: '0',
          link: 'https://newhaven-usa.com/collections/4-wheel-dollies/products/dual-rail-h-dolly-18-x-30'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>\'H\' Dolly Dual Rail 18" x 30"</strong>',
          fontSize: '22px',
          textColor: '#333333',
          align: 'left',
          padding: '10px 0'
        },
        {
          id: genId('button'),
          type: 'button',
          text: 'SHOP NOW',
          link: 'https://newhaven-usa.com/collections/4-wheel-dollies/products/dual-rail-h-dolly-18-x-30',
          bgColor: '#f4001e',
          textColor: '#ffffff',
          fullWidth: true,
          padding: '0'
        }
      ],
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/furniture_dolly_carpeted_18_x_30.jpg',
          width: '266',
          align: 'center',
          padding: '0',
          link: 'https://newhaven-usa.com/collections/4-wheel-dollies/products/carpeted-furniture-dolly-18-x-30'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>Furniture Dolly Carpeted 18" x 30"</strong>',
          fontSize: '22px',
          textColor: '#333333',
          align: 'left',
          padding: '10px 0'
        },
        {
          id: genId('button'),
          type: 'button',
          text: 'SHOP NOW',
          link: 'https://newhaven-usa.com/collections/4-wheel-dollies/products/carpeted-furniture-dolly-18-x-30',
          bgColor: '#f4001e',
          textColor: '#ffffff',
          fullWidth: true,
          padding: '0'
        }
      ]
    ]
  },
  // View All Button Row
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#ffffff',
    padding: '0 20px 40px 20px',
    columns: [
      [
        {
          id: genId('button'),
          type: 'button',
          text: 'VIEW ALL PRODUCTS',
          link: 'https://newhaven-usa.com/',
          bgColor: 'transparent',
          textColor: '#f4001e',
          fontSize: '18px',
          align: 'center',
          padding: '10px 20px'
        }
      ]
    ]
  },
  // Video Section
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#282828',
    padding: '40px 20px 25px 20px',
    columns: [
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/dolly_converter_video.jpg',
          width: '560',
          align: 'center',
          padding: '0',
          link: 'https://youtu.be/lI7fEIbwVY0?si=bO6Q4JcLGSnmQczx'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<strong><a href="https://youtu.be/lI7fEIbwVY0" style="color:#ffffff; text-decoration:none;">Dolly Converter by New Haven Moving Equipment - converts your 4 wheel dollies into a panel cart</a></strong>',
          fontSize: '28px',
          textColor: '#ffffff',
          align: 'center',
          padding: '15px 0 0 0'
        }
      ]
    ]
  },
  // Browse Categories Title
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#f5f2ec',
    padding: '20px 20px 0 20px',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>BROWSE CATEGORIES</strong>',
          textColor: '#f4001e',
          fontSize: '14px',
          align: 'left',
          padding: '0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<h2 style="font-family:Oswald; font-size:30px; color:#232429; margin:5px 0 0 0;">EVERYTHING FOR THE MOVE</h2>',
          align: 'left',
          padding: '0'
        }
      ]
    ]
  },
  // Categories 
  {
    id: genId('structure'),
    type: 'structure',
    layout: [50, 50],
    bgColor: '#f5f2ec',
    padding: '20px 20px 30px 20px',
    colGapH: 20,
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<div style="background:#fff; border-left:3px solid #f4001e; padding:10px;"><a href="#" style="text-decoration:none; color:#232429;"><strong>MOVING BOXES</strong><br><span style="color:#6b6460; font-size:14px;">Residential and commercial cartons in every size, built to protect.</span></a></div>',
          padding: '0 0 10px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<div style="background:#fff; border-left:3px solid #f4001e; padding:10px;"><a href="#" style="text-decoration:none; color:#232429;"><strong>MOVING PADS</strong><br><span style="color:#6b6460; font-size:14px;">Heavy-duty furniture blankets for maximum, dependable protection.</span></a></div>',
          padding: '0 0 10px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<div style="background:#fff; border-left:3px solid #f4001e; padding:10px;"><a href="#" style="text-decoration:none; color:#232429;"><strong>DOLLIES</strong><br><span style="color:#6b6460; font-size:14px;">2-wheel, 4-wheel, and all-terrain options for any moving project.</span></a></div>',
          padding: '0'
        }
      ],
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<div style="background:#fff; border-left:3px solid #f4001e; padding:10px;"><a href="#" style="text-decoration:none; color:#232429;"><strong>RAMPS</strong><br><span style="color:#6b6460; font-size:14px;">Fiberglass, aluminum, split ramps, and dock boards for every truck.</span></a></div>',
          padding: '0 0 10px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<div style="background:#fff; border-left:3px solid #f4001e; padding:10px;"><a href="#" style="text-decoration:none; color:#232429;"><strong>PACKAGING</strong><br><span style="color:#6b6460; font-size:14px;">Tape, stretch wrap, bubble roll, and paper pads for a complete pack.</span></a></div>',
          padding: '0 0 10px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<div style="background:#fff; border-left:3px solid #f4001e; padding:10px;"><a href="#" style="text-decoration:none; color:#232429;"><strong>CARGO CONTROL</strong><br><span style="color:#6b6460; font-size:14px;">A century of precision cargo control for pros who demand more.</span></a></div>',
          padding: '0'
        }
      ]
    ]
  },
  // Pro Mover Tip
  {
    id: genId('structure'),
    type: 'structure',
    layout: [16.6, 83.4],
    bgColor: '#000000',
    padding: '20px',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="font-size:50px; margin:0;">💡</p>',
          align: 'center',
          padding: '0'
        }
      ],
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<strong style="color:#ffe066;">Pro Mover Tip of the Month</strong><br><span style="color:#a8b5c8;">Always pack heaviest items in SMALL boxes — you\'ll thank yourself (and your knees) later. Read more expert moving tips on our</span> <a href="#" style="color:#ffe066; text-decoration:none;"><strong>blog →</strong></a>',
          align: 'left',
          padding: '10px 0 0 0'
        }
      ]
    ]
  },
  // Customers Love Us
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#f5f2ec',
    padding: '40px 20px 20px 20px',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<strong>⭐ REAL TALK FROM REAL MOVERS</strong>',
          textColor: '#f4001e',
          fontSize: '14px',
          align: 'center',
          padding: '0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<h2 style="font-family:Oswald; font-size:30px; color:#232429; margin:5px 0 0 0;">CUSTOMERS LOVE US</h2>',
          align: 'center',
          padding: '0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<span style="color:#666666;">(We didn\'t pay them. We promise. We think.)</span>',
          align: 'center',
          padding: '5px 0 0 0'
        }
      ]
    ]
  },
  // Reviews 
  {
    id: genId('structure'),
    type: 'structure',
    layout: [50, 50],
    bgColor: '#f5f2ec',
    padding: '0 20px 40px 20px',
    colGapH: 20,
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<div style="background:#fff; border-left:3px solid #f4001e; border-radius:9px; padding:15px;"><strong style="color:#f39c12; font-size:18px;">★★★★★</strong><br><br><strong>Works perfectly</strong><br>"Works with standard four wheelers"<br><br><span style="color:#999999; font-size:12px;">— James F. <span style="color:#c0392b;">/ Verified Buyer</span></span></div>',
          padding: '0'
        }
      ],
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<div style="background:#fff; border-left:3px solid #f4001e; border-radius:9px; padding:15px;"><strong style="color:#f39c12; font-size:18px;">★★★★★</strong><br><br><strong>Life savers</strong><br>"I work solo alot. The better your equipped, the better you look and feel..."<br><br><span style="color:#999999; font-size:12px;">— James B. <span style="color:#c0392b;">/ Verified Buyer</span></span></div>',
          padding: '0'
        }
      ]
    ]
  },
  // 20 Locations Nationwide (Screenshot layout)
  {
    id: genId('structure'),
    type: 'structure',
    layout: [50, 50],
    bgColor: '#fdfbf7',
    padding: '30px 20px 30px 20px',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<h3 style="font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif; font-size:22px; font-weight:600; margin:0;"><span style="color:#232429;">Now Open in</span> <span style="color:#F4001E;">Pensacola</span></h3><h2 style="font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif; font-size:42px; font-weight:bold; color:#232429; margin:5px 0 10px 0; line-height:1.1; letter-spacing:-1px;"><span style="color:#F4001E;">20</span> Locations<br>Nationwide</h2><p style="font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif; font-size:18px; margin:0; color:#232429; line-height:1.4;">Our newest store offering the same trusted moving equipment, now in your neighborhood.</p>',
          align: 'left',
          mobileAlign: 'center',
          padding: '0'
        },
        {
          id: genId('button'),
          type: 'button',
          text: 'FIND NEARBY STORES',
          link: 'https://newhaven-usa.com/apps/store-locator/',
          bgColor: '#f4001e',
          textColor: '#ffffff',
          align: 'left',
          mobileAlign: 'center',
          padding: '25px 0 0 0',
          fontSize: '16px',
          fontFamily: 'lato, "helvetica neue", helvetica, arial, sans-serif'
        }
      ],
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/new_location_map.png',
          width: '100%',
          align: 'right',
          mobileAlign: 'center',
          padding: '10px 0 0 0'
        }
      ]
    ]
  },
  // Pensacola Open (Blue Angels)
  {
    id: genId('structure'),
    type: 'structure',
    layout: [44, 56],
    bgColor: '#fff6e1',
    padding: '20px 20px 20px 20px',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<h2 style="font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif; font-size:34px; line-height:1.2; margin:0;"><span style="color:#232429">Now Open in</span><br><span style="color:#F4001E">Pensacola!</span></h2>',
          align: 'left',
          mobileAlign: 'center',
          padding: '10px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif; font-size:18px; line-height:24px; margin:0; color:#232429;">Serving movers and professionals across the Florida Panhandle with the gear you trust!</p>',
          align: 'left',
          mobileAlign: 'center',
          padding: '10px 0 0 0'
        },
        {
          id: genId('button'),
          type: 'button',
          text: 'GET DIRECTIONS',
          link: 'https://maps.app.goo.gl/bZwoks6TAnrdYXBw9',
          bgColor: '#f4001e',
          textColor: '#ffffff',
          align: 'left',
          mobileAlign: 'center',
          padding: '30px 0 10px 0',
          fontSize: '16px',
          fontFamily: 'lato, "helvetica neue", helvetica, arial, sans-serif'
        }
      ],
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/pensacola.png',
          width: '313',
          align: 'center',
          mobileAlign: 'center',
          padding: '0'
        }
      ]
    ]
  },
  // Contact info
  {
    id: genId('structure'),
    type: 'structure',
    layout: [33, 33, 34],
    bgColor: '#fff6e1',
    padding: '15px 20px 20px 20px',
    columns: [
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/time_icon.png',
          width: '60',
          align: 'center',
          padding: '0 0 10px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="margin:0; text-align:center;">Mon to Fri:<br>8:00AM - 5:00PM</p>',
          align: 'center',
          padding: '0',
          fontSize: '16px',
          textColor: '#232429'
        }
      ],
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/callimage.png',
          width: '60',
          align: 'center',
          padding: '0 0 10px 0',
          link: 'tel:4482337378'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="margin:0; text-align:center;"><a href="tel:4482337378" style="color:#232429; text-decoration:none;">(448) 233-7378</a></p>',
          align: 'center',
          padding: '0',
          fontSize: '16px',
          textColor: '#232429'
        }
      ],
      [
        {
          id: genId('image'),
          type: 'image',
          src: 'https://jedtub.stripocdn.email/content/guids/CABINET_e7f320da8e738c8223e5154cf3f37d27eaf20d8b3429ffb9de566873236d5623/images/location_map_icon.png',
          width: '60',
          align: 'center',
          padding: '0 0 10px 0',
          link: 'https://maps.app.goo.gl/bZwoks6TAnrdYXBw9'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="margin:0; text-align:center;"><a href="https://maps.app.goo.gl/bZwoks6TAnrdYXBw9" style="color:#232429; text-decoration:none; font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;">9970 N. Palafox Street<br>Pensacola, FL 32534</a></p>',
          align: 'center',
          padding: '0',
          fontSize: '16px',
          textColor: '#232429'
        }
      ]
    ]
  },
  // Address block
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#000000',
    padding: '50px 0 0 0',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<h3 style="margin:0;"><a href="https://newhaven-usa.com/" style="color:#ffffff; text-decoration:none;">New Haven Moving Equipment</a></h3><p style="margin:0; color:#ffffff;">41 Washington Avenue,<br>East Haven, Connecticut 06512, USA</p>',
          align: 'center',
          padding: '0'
        }
      ]
    ]
  },
  // "20 locations to serve you better"
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#000000',
    padding: '20px 40px 25px 40px',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<h3 style="margin:0; color:#ffffff;"><strong>20 locations to serve you better - Family owned since 1911</strong></h3>',
          align: 'center',
          padding: '0'
        }
      ]
    ]
  },
  // Regions list (4 columns)
  {
    id: genId('structure'),
    type: 'structure',
    layout: [25, 25, 25, 25],
    bgColor: '#000000',
    padding: '5px 50px 20px 70px',
    columns: [
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="color:#ffffff; margin:0;"><strong>WEST</strong><br><br>Los Angeles<br>San Leandro<br>Phoenix<br>Denver<br>Salt Lake City</p>',
          align: 'left',
          padding: '0'
        }
      ],
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="color:#ffffff; margin:0;"><strong>SOUTHWEST</strong><br><br>Dallas<br>Houston<br>San Antonio</p>',
          align: 'left',
          padding: '0'
        }
      ],
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="color:#ffffff; margin:0;"><strong>MIDWEST</strong><br><br>Chicago<br>Minneapolis<br>Louisville<br>Detroit<br>Kansas City<br>St Louis</p>',
          align: 'left',
          padding: '0'
        }
      ],
      [
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="color:#ffffff; margin:0;"><strong>EAST</strong><br><br>New Haven<br>New Jersey<br>DC<br>Greenville<br>Miami<br>Pensacola</p>',
          align: 'left',
          padding: '0'
        }
      ]
    ]
  },
  // Footer Social & Unsubscribe
  {
    id: genId('structure'),
    type: 'structure',
    layout: [100],
    bgColor: '#000000',
    padding: '20px 0',
    columns: [
      [
        {
          id: genId('social'),
          type: 'social',
          icons: [
            { platform: 'facebook', url: 'https://www.facebook.com/NewHavenMovingEquipment', show: true },
            { platform: 'twitter', url: 'https://twitter.com/newhavenmoving', show: true },
            { platform: 'instagram', url: 'https://www.instagram.com/newhavenmovingequipment/', show: true },
            { platform: 'youtube', url: 'https://www.youtube.com/channel/UCVYJyHnmpMisJ3WfUs_4RtA', show: true },
            { platform: 'linkedin', url: '#', show: false },
            { platform: 'custom 1', url: '#', imageUrl: '', show: false },
            { platform: 'custom 2', url: '#', imageUrl: '', show: false }
          ],
          iconSize: '24',
          align: 'center',
          padding: '0 0 20px 0'
        },
        {
          id: genId('text'),
          type: 'text',
          content: '<p style="margin:0; color:#ffffff;">Want to change how you receive these emails?<br>You can <a href="{% manage_preferences_link %}" style="color:#ffffff; text-decoration:underline;">update your preferences</a> or <a href="{% unsubscribe_link %}" style="color:#ffffff; text-decoration:underline;">unsubscribe</a> from this list.</p>',
          align: 'center',
          padding: '0 0 40px 0'
        }
      ]
    ]
  }
];

const template = {
  templateName: 'New Haven Reference',
  subjectLine: 'Smarter Tools for Moving Season',
  previewText: 'Mattress carriers dollies ramps and essentials movers rely on.',
  globalStyles: {
    backgroundColor: '#F6F6F6',
    contentWidth: 600,
    fontFamily: 'arial, helvetica, sans-serif',
    fontSize: '14px',
    textColor: '#333333',
    linkColor: '#2CB543',
    buttonBgColor: '#f4001e',
    buttonTextColor: '#ffffff',
    buttonFontSize: '16px'
  },
  blocks: blocks
};

const templateStr = JSON.stringify(template, null, 2);

const jsCode = 
"const SeedData = { " +
"  run() { " +
"    let templates = JSON.parse(localStorage.getItem('emailBuilderTemplates') || '[]');" +
"    templates = templates.filter(t => t.id !== 'tpl_seed_ref_123');" +
"    const templateData = " + templateStr + ";" +
"    templateData.templateId = 'tpl_seed_ref_123';" +
"    templates.push({ id: 'tpl_seed_ref_123', name: 'New Haven Reference', date: new Date().getTime(), data: templateData });" +
"    localStorage.setItem('emailBuilderTemplates', JSON.stringify(templates));" +
"    localStorage.setItem('emailBuilderState', JSON.stringify(templateData));" +
"    console.log('Seeded COMPLETED reference template into gallery and canvas');" +
"  }" +
"};" +
"SeedData.run();";

fs.writeFileSync('js/seed.js', jsCode);
