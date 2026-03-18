// ESM wrapper for CJS server.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('./server.js');
