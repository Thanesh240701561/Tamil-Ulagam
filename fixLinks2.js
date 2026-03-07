import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');

    // Replace <Link to="// to <Link to="/
    content = content.replace(/to="\/\//g, 'to="/');

    // Also just in case, replace <a href="// to <a href="/
    content = content.replace(/href="\/\//g, 'href="/');

    // Some routes might have .html, let's remove it for cleaner react routing
    // content = content.replace(/to="\/([^"]+)\.html([^"]*)"/g, 'to="/$1$2"'); // Optional

    fs.writeFileSync(path.join(pagesDir, file), content, 'utf8');
});
console.log('Fixed double slash links');
