import StyleDictionary from 'style-dictionary';
import fs from 'fs';
import path from 'path';

const tokensPath = './src/tokens';
const brands = fs.readdirSync(tokensPath).filter(file => file.endsWith('.json'));

for (const brandFile of brands) {
  const brandName = path.basename(brandFile, '.json');
  const filePath = `${tokensPath}/${brandFile}`;

  const sd = StyleDictionary.extend({
    source: [filePath],
    platforms: {
      scss: {
        transformGroup: 'scss',
        buildPath: `build/scss/`,
        files: [
          {
            destination: `${brandName}.scss`,
            format: 'scss/variables',
          },
        ],
      },
      css: {
        transformGroup: 'css',
        buildPath: `build/css/`,
        files: [
          {
            destination: `${brandName}.css`,
            format: 'css/variables',
          },
        ],
      },
    },
  });

  console.log(`📦 Building tokens for: ${brandName}`);
  
  sd.buildAllPlatforms();
}
