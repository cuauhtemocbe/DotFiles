#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const settingsPath = resolve(__dirname, 'settings.json');

const FOLDERS = [
  '**/.codegraph',
  '**/.husky',
  '**/.claudeignore',
  '**/.dockerignore',
  '**/.gitignore',
  '**/.mcp.json',
  '**/.nvmrc',
  '**/coverage',
  '**/dist',
  '**/jest.stryker.config.ts',
  '**/node_modules',
  '**/pnpm-lock.yaml',
  '**/result',
  '**/sonar-project.properties',
  '**/stryker.config.json',
  '**/tsconfig.build.json',
];

let content = readFileSync(settingsPath, 'utf-8');
const isHidden = content.includes(`"${FOLDERS[0]}": true`);

for (const folder of FOLDERS) {
  const from = isHidden ? `"${folder}": true` : `"${folder}": false`;
  const to = isHidden ? `"${folder}": false` : `"${folder}": true`;
  content = content.replace(from, to);
}

writeFileSync(settingsPath, content, 'utf-8');
