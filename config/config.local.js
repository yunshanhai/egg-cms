const path = require('path');
module.exports = appInfo => {
  console.log('-----------rind local')
  return {
    logger: {
      dir: path.join(appInfo.baseDir, 'logs'),
    },
  };
};