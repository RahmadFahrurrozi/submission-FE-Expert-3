const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
 
const target = path.resolve(__dirname, './src/public/images/heros/hero-image_2.jpg');
const destination = path.resolve(__dirname, './dist/images/');
 
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}
 
const processImages = (imagePath) => {
  const images = fs.lstatSync(imagePath).isDirectory() 
    ? fs.readdirSync(imagePath).filter(image => /\.(jpg|jpeg|png)$/i.test(image))
    : [path.basename(imagePath)];

  images.forEach(image => {
    const fullImagePath = path.join(
      fs.lstatSync(imagePath).isDirectory() ? imagePath : path.dirname(imagePath), 
      image
    );

    // Responsive image sizes
    const sizes = [
      { name: 'mobile', width: 480 },   // Small devices
      { name: 'tablet', width: 768 },   // Medium devices
      { name: 'desktop', width: 1200 }, // Large devices
      { name: 'large', width: 1920 }    // Extra large devices
    ];

    sizes.forEach(size => {
      sharp(fullImagePath)
        .resize(size.width)
        .toFile(path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-${size.name}.jpg`
        ));
    });
  });
};

processImages(target);
 
console.log('Responsive image processing complete.');