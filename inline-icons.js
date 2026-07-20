const fs = require('fs');
const https = require('https');

const htmlFile = 'index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const regex = /<i class="([^"]*ph-([a-z0-z-]+)[^"]*)"><\/i>/g;
let match;
const matches = [];

while ((match = regex.exec(html)) !== null) {
    matches.push({
        fullTag: match[0],
        classes: match[1],
        iconName: match[2]
    });
}

// Remove duplicates
const uniqueIcons = [...new Set(matches.map(m => m.iconName))];

async function downloadSvg(iconName) {
    return new Promise((resolve, reject) => {
        const url = `https://raw.githubusercontent.com/phosphor-icons/core/main/raw/fill/${iconName}-fill.svg`;
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download ${iconName}, status: ${res.statusCode}`));
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function processIcons() {
    for (const iconName of uniqueIcons) {
        try {
            console.log(`Downloading ${iconName}...`);
            let svgContent = await downloadSvg(iconName);
            
            // For each match that uses this icon
            matches.filter(m => m.iconName === iconName).forEach(m => {
                // Insert classes into SVG
                let customSvg = svgContent.replace('<svg ', `<svg class="${m.classes}" `);
                html = html.replace(m.fullTag, customSvg);
            });
        } catch (e) {
            console.error(e.message);
        }
    }
    
    // Remove Phosphor script tag
    html = html.replace(/<script src="https:\/\/unpkg\.com\/@phosphor-icons\/web"><\/script>\s*/g, '');
    
    fs.writeFileSync(htmlFile, html, 'utf8');
    console.log('Replaced all icons with inline SVGs!');
}

processIcons();
