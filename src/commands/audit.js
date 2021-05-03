const {Command, flags} = require('@oclif/command')

class AuditCommand extends Command {
  async run() {
    const {flags} = this.parse(AuditCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name}`)
    const fs = require('fs');
    const yaml = require('js-yaml');
    var ymlfiles = new Array();

    let dirname = '../bin';
    console.log("Going to get file info!");
    let filenames = fs.readdirSync(dirname);
    
    console.log("\nFilenames in directory:");
    filenames.forEach((file) => {
      if (file.split('.').pop() == 'yml') {
        ymlfiles.push(file);
      }
    });
    
    try {
      let fullpath = '../bin/' + ymlfiles[0];
      let fileContents = fs.readFileSync(fullpath, 'utf8');
      data = yaml.safeLoad(fileContents);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}

AuditCommand.description = `Describe the command here
...
Extra documentation goes here
`

AuditCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = AuditCommand
