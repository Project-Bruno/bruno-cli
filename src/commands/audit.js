const {Command, flags} = require('@oclif/command')

class AuditCommand extends Command {
  async run() {
    const {flags} = this.parse(AuditCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name}`)
    const fs = require('fs');
    const yaml = require('js-yaml');
    var ymlfiles = new Array();
    var data;
    var dependencies;

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

      console.log(data);
    } catch (e) {
      console.log(e);
    }
    
    dependencies = data.dependencies;
    console.log(dependencies);
  }
}

AuditCommand.description = `Run vulnerability check on dependencies specified in yml file created by init command.`

AuditCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = AuditCommand
