const { execSync } = require('child_process');

module.exports = async () => {
  console.log('Running migrations down...');
  execSync('npm run migration:down');
};
