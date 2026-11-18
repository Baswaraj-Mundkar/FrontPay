import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const localAssets = [...html.matchAll(/(?:src|href)="(src\/[^"]+)"/g)].map((match) => match[1]);

if (localAssets.length === 0) {
  throw new Error('No local assets were found in index.html.');
}

for (const asset of localAssets) {
  await access(resolve(root, asset));
}

console.log(`Validated ${localAssets.length} local asset reference(s).`);
