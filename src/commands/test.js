const {Command} = require('@oclif/command')
const brunoUtils = require('./../common/utils');
const fs = require('fs');
const yaml = require('js-yaml');
const exec  = require('child_process').exec, child;

class TestCommand extends Command {
  async run() {
    // Test for Bruno repo
    if (!(brunoUtils.is_bruno_repo())) {
      console.log("Error: This is not a bruno tracked repository");
      return;
    }

    let bruno_path = brunoUtils.is_bruno_repo(true);

    console.log("Path for bruno file found at ", bruno_path);

    try {
      let fileContents = fs.readFileSync(bruno_path, 'utf8');
      let data = yaml.safeLoad(fileContents);
      
      // Check for build path
      if (Object.keys(data.binaries).length == 0)
      {
        console.log("Error: No build file found. See Bruno help for more details.")
        return;
      }

      // Pull build file path from bruno.yml
      buildPath = data.binaries[Object.keys(data.binaries)[0]];
      
      // Use binary path to execute build file
      child = exec(buildPath,
        function (error, stdout, stderr) {
          console.log('stdout:', stdout);
          console.log('stderr:', stderr);
          if (error !== null) {
          console.log('exec error:', error);
          }
      });

    } catch (error) {
        console.log(error);
    }
  }
}

TestCommand.description = `Test the current Bruno project build file
The test command is used to test the build file for the current Bruno project. First, it checks
if the current project is a Bruno project or not. Then, test will attempt to locate the path to
the current project's build file. If it is found, then test will attempt to exectute the 
makefile. Finally, test will return any error messages or console messages that occured from
running the build file.
`;

module.exports = TestCommand;
