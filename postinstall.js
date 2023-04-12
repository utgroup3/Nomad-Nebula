const { execSync } = require('child_process');

console.log('Running schema.sql');
execSync('psql -f db/schema.sql');

console.log('Running seeds');
execSync('node seeds/index.js');
