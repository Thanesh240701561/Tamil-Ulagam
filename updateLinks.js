import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');

    // Replace <a href="page.html"> with <Link to="/page.html">
    // Wait, let's replace <a href="..."> with <Link to="..."> except for external links or #
    content = content.replace(/<a([^>]*)href="((?!#|http)[^"]+)"([^>]*)>/g, '<Link$1to="/$2"$3>');
    content = content.replace(/<\/a>/g, '</Link>');

    // Optional: make it cleaner by dropping .html in paths if you want, but the App.jsx already mapped them.
    // Replace <Link ... to="/home.html"> to <Link to="/home.html"> is fine.

    // Also replace class= with className= if not already (safeguard)
    content = content.replace(/class=/g, 'className=');

    fs.writeFileSync(path.join(pagesDir, file), content, 'utf8');
});

console.log('JSX files updated with Link tags');
