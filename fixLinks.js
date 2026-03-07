import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));
let issues = [];

files.forEach(file => {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');

    // To fix the issue safely, let's reverse ALL <Link> and </Link> back to <a> and </a>
    content = content.replace(/<Link([^>]*?)to=/g, '<a$1href=');
    content = content.replace(/<\/Link>/g, '</a>');

    // Now accurately replace <a href="xxx"> with <Link to="xxx">
    // We only replace if href doesn't start with # and doesn't start with http
    const linkRegex = /<a([^>]*)href="((?!#|http)[^"]+)"([^>]*)>([\s\S]*?)<\/a>/gi;
    content = content.replace(linkRegex, '<Link$1to="/$2"$3>$4</Link>');

    // Some internal links may still be named .html instead of React route, but our App.jsx handles both

    fs.writeFileSync(path.join(pagesDir, file), content, 'utf8');
});
console.log('Fixed Links properly');
