const {Command, flags} = require('@oclif/command')

class AuditCommand extends Command {
  async run() {
    const {flags} = this.parse(AuditCommand)
    var pathname = flags.pathname;
    //this.log(`hello ${name}`)
    const fs = require('fs');
    const yaml = require('js-yaml');
    const { exec } = require("child_process");
    var ymlfiles = new Array();
    var data;
    var dependencies;
    var depLength;
    var execStarter;

    if (pathname == null) {
      pathname = "./";
    }

    let dirname = '../bin';
    console.log("Searching bin for yaml files...");
    let filenames = fs.readdirSync(dirname);
    
    filenames.forEach((file) => {
      if (file.split('.').pop() == 'yml') {
        ymlfiles.push(file);
      }
    });
    
    if (ymlfiles.length == 0) {
      console.log("No yaml file found in bin.");
      return;
    }
    
    console.log("Getting contents of yaml file...");
    try {
      let fullpath = '../bin/' + ymlfiles[0];
      let fileContents = fs.readFileSync(fullpath, 'utf8');
      data = yaml.safeLoad(fileContents);

      //console.log(data);
    } catch (e) {
      console.log(e);
    }
    
    dependencies = data.projectDependencies;
    console.log('Dependencies found: ' + dependencies);
    depLength = dependencies.length;
    execStarter = "./flawfinder ";
    for (var i = 0; i < depLength; i++) {
      var execString = execStarter + pathname + dependencies[i];
      //var execString = execStarter + './test/test-cpp-digit-separator.cpp';
      exec(execString, (error, stdout, stderr) => {
	if (error) {
	  console.log('error: ' + error.message);
	  return;
	}
	if (stderr) {
	  console.log('stderr: ' + stderr);
	}
	console.log(stdout);
	if (i != depLength - 1) console.log("-------------------------------------------------------------------------");
      });
    }
  }
}

AuditCommand.description = `Run vulnerability check on dependencies specified in yml file created by init command.`

AuditCommand.flags = {
  pathname: flags.string({char: 'p', description: 'path to dependencies'}),
}

module.exports = AuditCommand
