const fs = require('fs');
const path = require('path');

function fixHTML2ImageFonts() {
    console.log('Fixing html-to-image fonts...');
    // Define the file path
    const filePath = path.join(__dirname, '../node_modules', 'html-to-image', 'es', 'embed-webfonts.js');

    // Read the file contents
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Define the lines to be replaced
    const oldLine = 'inline.insertRule(rule, sheet.cssRules.length);';

    // Define the replacement lines
    const newLine = 'inline.insertRule(rule, inline.cssRules.length);';

    // Replace the lines in the file contents
    const modifiedContents = fileContents.replace(oldLine, newLine);

    if (modifiedContents === fileContents) {
        console.log('html-to-image fonts already fixed.');
        return;
    }

    // Write the modified contents back to the file
    fs.writeFileSync(filePath, modifiedContents, 'utf8');
    console.log('html-to-image fonts fixed.');
}


fixHTML2ImageFonts();

console.log('Postinstall script executed successfully.');