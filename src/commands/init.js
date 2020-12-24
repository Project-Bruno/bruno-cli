const { Command, flags } = require('@oclif/command');
const yaml = require('js-yaml');
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

class InitCommand extends Command {
  async run() {
    const { flags } = this.parse(InitCommand);
    const path = './bruno.yaml'

    try {
      if (fs.existsSync(path)) {
        // bruno.yaml file exists
        console.log("Error: This is already a bruno tracked repository");
      } else {
        // create a new bruno.yaml file for the project
        fs.open('./bruno.yaml', 'w', function (err, file) {
          if (err) {
            throw err;
          }

          let newProject = {
            name: '',
            author: '',
            compiler: '',
            build_system: ''
          };

          if (flags.name) {
            newProject['name'] = flags.name;
          }
          else {
            const defaultName = "my-bruno-project";

            readline.question(`Name of new Bruno project (${defaultName}) :  `, name => {
              newProject['name'] = name;
              readline.close();
            });
          }


          let yamlStr = yaml.safeDump(newProject);
          fs.writeFileSync('./bruno.yaml', yamlStr, 'utf8');

          console.log('Initialized new Bruno repository in ${path}');
        });
      }
    } catch(err) {
      console.error(err)
    }
  }
}

InitCommand.description = "Initializes a Bruno project.";

InitCommand.flags = {
  name: flags.string({char: 'n', description: 'Name of new project'}),
}

module.exports = InitCommand
