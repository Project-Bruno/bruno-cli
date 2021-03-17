/*
  IDEA: COnsider creating a utils directory where each function in this file
  is split off into its own file. Could be better for maintainability.
*/

const fs = require('fs');
const path = require('path');
// const os = require('os');
const yaml = require('js-yaml');

/*
  Searches up the directory tree, up to root, to check
  if a bruno.yml file is present.

  NOTE: Consider allowing nested bruno projects which
  'export' their interface to higher-nested modules.
*/
exports.is_bruno_repo = (return_path = false) => {
  let cwd = __dirname;
  let bruno_file_found = false;
  let root = path.parse(cwd).root;
  let brunoFile = '';

  while (cwd !== root) {
    brunoFile = cwd + path.sep + 'bruno.yml';

    try {
      if (fs.existsSync(brunoFile)) {
        bruno_file_found  = true;
        break;
      } else {
        cwd = path.dirname(cwd);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return return_path ? brunoFile : bruno_file_found;
};

exports.read_bruno_file = () => {
  /*
    TODO: Better error handiling for file IO
  */
  const bruno_path = this.is_bruno_repo(true);

  console.log('Path for bruno file found at ', bruno_path);

  let data = null;

  try {
    data = yaml.safeLoad(fs.readFileSync(bruno_path, 'utf8'));
  } catch (error) {
    console.log(error);
  }

  return data;
};

exports.project_dir_exists = (BRUNO_FILE, dir_name) => {
  let check_dir = BRUNO_FILE.root + path.sep + dir_name;

  try {
    if (fs.existsSync(check_dir)) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};
