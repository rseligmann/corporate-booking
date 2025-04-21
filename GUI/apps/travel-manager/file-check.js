// file-check.js
// Run with: node file-check.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory - adjust this to the root of your project
const baseDir = path.resolve(__dirname, '../..');

// Paths to check 
const pathsToCheck = [
  // API services
  path.join(baseDir, 'packages/api/src/services/authServices.ts'),
  path.join(baseDir, 'packages/api/src/services/index.ts'),
  
  // API hooks
  path.join(baseDir, 'packages/api/src/hooks/index.ts'),
  path.join(baseDir, 'packages/api/src/hooks/useGuestPreferences.ts'),
  
  // Utils
  path.join(baseDir, 'packages/api/src/utils/tokenStorage.ts'),
  
  // Main index
  path.join(baseDir, 'packages/api/src/index.ts'),
];

console.log('Checking file paths:');
pathsToCheck.forEach(filePath => {
  const exists = fs.existsSync(filePath);
  console.log(`${filePath}: ${exists ? 'EXISTS ✅' : 'MISSING ❌'}`);
});