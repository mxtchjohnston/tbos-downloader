const fs = require('fs');
const path = require('path');
const imagesToPdf = require('images-to-pdf');

async function imagesToPdfConverter(folderPath, outputPdfPath) {
  // Read the files in the directory
  const files = fs.readdirSync(folderPath);

  // Filter only JPG files and sort them numerically
  const jpgFiles = files
    .filter(file => file.endsWith('.jpg'))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(file => path.join(folderPath, file));

  // Convert the images to PDF
  try {
    await imagesToPdf(jpgFiles, outputPdfPath);
    console.log(`PDF successfully created at ${outputPdfPath}`);
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
}

// Example usage
const folderPath = 'images'; // Change this to your folder path containing the images
const outputPdfPath = 'tbos.pdf'; // Change this to your desired output PDF file path

imagesToPdfConverter(folderPath, outputPdfPath);
