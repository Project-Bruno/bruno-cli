const fs = require('fs');
const path = require('path');
const os = require('os');
const yaml = require('js-yaml');


exports.is_bruno_repo = function(return_path=false) {
  let cwd = __dirname;
  let bruno_file_found = false;
  let root = path.parse(cwd).root;
  let brunoFile = '';

  while (cwd != root) {
    brunoFile = cwd + path.sep + 'bruno.yml';

    try {
      if (fs.existsSync(brunoFile)) {
        bruno_file_found  = true;
        break;
      } else {
        cwd = path.dirname(cwd);
      }
    } catch(err) {
      console.error(err);
    }
  }

  return return_path ? brunoFile : bruno_file_found;
}


exports.read_bruno_file = function() {

  let bruno_path = this.is_bruno_repo(return_path=true);

  console.log("Path for bruno file found at ", bruno_path);

  try {
    let fileContents = fs.readFileSync(bruno_path, 'utf8');
    let data = yaml.safeLoad(fileContents);
    console.log(data);
  } catch (e) {
      console.log(e);
  }
}
