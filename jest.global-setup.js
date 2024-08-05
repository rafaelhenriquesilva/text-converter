const { execSync } = require('child_process');

module.exports = async () => {
  console.log('Running migrations up...');
  execSync('npm run migration:up');
};