import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const path of ['index.html', 'assets', 'css', 'js', 'manifest.webmanifest', 'sw.js']) {
  cpSync(join(root, path), join(output, path), { recursive: true });
}
console.log('Arquivos públicos preparados em dist/.');
