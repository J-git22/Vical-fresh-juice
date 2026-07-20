const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const dir = './images';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

async function processImages() {
    for (const file of files) {
        const filePath = path.join(dir, file);
        try {
            const image = await Jimp.read(filePath);
            const w = image.bitmap.width;
            const h = image.bitmap.height;
            if (w > 800 || h > 800) {
                if (w > h) {
                    image.resize(800, Jimp.AUTO);
                } else {
                    image.resize(Jimp.AUTO, 800);
                }
                image.quality(80); // set JPEG quality
                await image.writeAsync(filePath);
                console.log(`Compressed ${file}`);
            } else {
                console.log(`Skipped ${file} (already small)`);
            }
        } catch (e) {
            console.error(`Failed on ${file}:`, e.message);
        }
    }
}

processImages();
