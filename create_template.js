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

fs.writeFileSync('d:/Quake/Projects/email/reference_template.json', JSON.stringify(template, null, 2));
console.log('Template created successfully at reference_template.json');
