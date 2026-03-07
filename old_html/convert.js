import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'categories.html',
    'cities.html',
    'details.html',
    'explore.html',
    'home.html',
    'index.html',
    'profile-favorites.html',
    'profile-history.html',
    'profile-info.html',
    'profile-notifications.html',
    'profile-settings.html'
];

function camelCase(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

function processHtml(html) {
    // Extract body content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) return '';
    let bodyInfo = bodyMatch[1];

    // Remove script tags
    bodyInfo = bodyInfo.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Replace class= with className=
    bodyInfo = bodyInfo.replace(/class=/g, 'className=');

    // Replace inline styles to be valid jsx objects (best effort regex for basic cases)
    // Actually, handling inline styles via regex is hard. Let's just remove simple ones or do basic transform if any
    // Fortunately, most styles are in style.css or simple `background-image` strings
    // E.g., style="background-image: url('...')"
    bodyInfo = bodyInfo.replace(/style="background-image:\s*url\('([^']+)'\)"/g, 'style={{ backgroundImage: `url($1)` }}');

    // Make self closing tags valid JSX
    // img, input, hr, br
    bodyInfo = bodyInfo.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
    bodyInfo = bodyInfo.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
    bodyInfo = bodyInfo.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
    bodyInfo = bodyInfo.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');

    // Path attributes
    bodyInfo = bodyInfo.replace(/stroke-width=/g, 'strokeWidth=');
    bodyInfo = bodyInfo.replace(/stroke-linecap=/g, 'strokeLinecap=');
    bodyInfo = bodyInfo.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    bodyInfo = bodyInfo.replace(/xmlns:xlink=/g, 'xmlnsXlink=');

    // a href => Link to using react-router-dom
    // Just a basic replacement of a tags to Link tags
    // Or just leave them as <a> tags and let react handle it (valid JSX anyway)

    // Remove comments
    bodyInfo = bodyInfo.replace(/<!--[\s\S]*?-->/g, '');

    // React special attributes
    bodyInfo = bodyInfo.replace(/for=/g, 'htmlFor=');

    // Check for inline event handlers like onerror
    bodyInfo = bodyInfo.replace(/onerror="this.src='([^']+)'"/g, 'onError={(e) => { e.target.src = \'$1\'; }}');

    return bodyInfo;
}

files.forEach(file => {
    const html = fs.readFileSync(path.join(__dirname, file), 'utf8');
    let compName = path.basename(file, '.html');

    if (compName === 'index') compName = 'Login';
    else compName = compName.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');

    const jsx = processHtml(html);

    const componentStr = `import React from 'react';
import { Link } from 'react-router-dom';

const ${compName} = () => {
    return (
        <>
            ${jsx}
        </>
    );
};

export default ${compName};
`;
    // Create src/pages directory if not exists
    if (!fs.existsSync(path.join(__dirname, 'src/pages'))) {
        fs.mkdirSync(path.join(__dirname, 'src/pages'));
    }
    fs.writeFileSync(path.join(__dirname, 'src/pages', compName + '.jsx'), componentStr);
});
console.log('Conversion complete.');
