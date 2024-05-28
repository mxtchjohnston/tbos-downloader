const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadImage(url, folderPath, imageNumber) {
  const filePath = path.join(folderPath, `${imageNumber}.jpg`);

  try {
    const response = await axios({
      method: 'GET',
      url: `${url}_${imageNumber}.jpg`,
      responseType: 'stream'
    });
    
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Failed to download image ${imageNumber}`);
  }
}

async function downloadImages(baseUrl, folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  let number = 1;
  while (true) {
    try {
      await downloadImage(baseUrl, folderPath, number);
      number++;
    } catch (error) {
      console.error(error.message);
      console.log('Finished downloading images');
      break;
    }
  }
}

const baseUrl = 'https://shenlanguage.org/TBoS/The%20Book%20of%20Shen%20August%20corrected10241024';
const folderPath = 'images';

downloadImages(baseUrl, folderPath)
  .then(() => console.log('Images downloaded successfully'))
  .catch(error => console.error(error.message));
