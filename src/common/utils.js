const fs = require('fs');
const path = require('path');
const os = require('os');


exports.is_bruno_repo = function() {
  let cwd = __dirname;
  let retval = false;
  let root = path.parse(cwd).root;
  let brunoFile = '';

  while (cwd != root) {
    brunoFile = cwd + path.sep + 'bruno.yml';

    try {
      if (fs.existsSync(brunoFile)) {
        retval = true;
        break;
      } else {
        cwd = path.dirname(cwd);
      }
    } catch(err) {
      console.error(err);
    }
  }

  return retval;
}
