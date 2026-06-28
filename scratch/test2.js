const fileData = { document: { name: 'Email-1' } };
const imageMap = {};
if (Object.keys(imageMap).length === 0 && fileData && fileData.document.name === "Email-1") {
  imageMap['mock_product_img_1'] = 'https://via.placeholder.com/300x300.png?text=Figma+Product';
}
console.log(imageMap);
