#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path"
// Проверяем тупой ли я
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
console.log(content)
// END