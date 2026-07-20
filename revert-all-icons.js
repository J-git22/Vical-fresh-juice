const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Regex to find all SVGs with ph-* class
const svgRegex = /<svg class="([^"]*ph-[^"]*)"[^>]*>.*?<\/svg>/gs;

html = html.replace(svgRegex, (match, classes) => {
    // Keep only the 5 specific icons from the features section
    const keepClasses = [
        'ph-fill ph-drop',
        'ph-fill ph-orange-slice',
        'ph-fill ph-shield-check',
        'ph-fill ph-truck',
        'ph-fill ph-whatsapp-logo'
    ];

    // If the classes exactly match one of the keep classes, keep it as SVG
    // Note: The features icons only have "ph-fill ph-iconName" as their class.
    if (keepClasses.includes(classes.trim())) {
        return match;
    } else {
        // Revert to <i> tag
        return `<i class="${classes}"></i>`;
    }
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Reverted all remaining SVGs except the 5 specific ones!');
