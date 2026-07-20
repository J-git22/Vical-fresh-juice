const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add back the Phosphor script tag if not exists
if (!html.includes('unpkg.com/@phosphor-icons/web')) {
    html = html.replace('</head>', '    <!-- Phosphor Icons -->\n    <script src="https://unpkg.com/@phosphor-icons/web"></script>\n</head>');
}

// Regex to find all SVGs with ph-fill class
const svgRegex = /<svg class="([^"]*ph-fill[^"]*)"[^>]*>.*?<\/svg>/gs;

html = html.replace(svgRegex, (match, classes) => {
    // Check if this SVG belongs to the 5 allowed offline icons.
    // We can identify them by their classes, or by the container.
    // The 5 icons have these classes:
    // ph-drop, ph-orange-slice, ph-shield-check, ph-truck
    // and there is a ph-whatsapp-logo inside .features
    
    // If it's one of the 5 icons AND it is inside the features section...
    // Actually, it's easier to check the class.
    const isOfflineIcon = classes.includes('ph-drop') || 
                          classes.includes('ph-orange-slice') || 
                          classes.includes('ph-shield-check') || 
                          classes.includes('ph-truck') || 
                          (classes.includes('ph-whatsapp-logo') && !classes.includes('text-green')); // The footer whatsapp has "text-green", the features one has "bg-green" on its parent, so the icon itself just has "ph-fill ph-whatsapp-logo"

    if (isOfflineIcon) {
        return match; // Keep as SVG
    } else {
        return `<i class="${classes}"></i>`; // Revert to <i>
    }
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Reverted all icons except the 5 specific ones!');
