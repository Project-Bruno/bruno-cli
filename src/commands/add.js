const {Command, flags} = require('@oclif/command');
const yaml = require('js-yaml');
const fs = require('fs');
const os = require('os');

class AddCommand extends Command {
  async run() {
    const {flags} = this.parse(AddCommand);

    try {
      if (!(fs.existsSync(path))) {
        console.log("Error: This is not a Bruno tracked project.");
        return;
      }
    } catch(err) {
      console.error(err);
    }

  }
}

AddCommand.description = "Add a new binary to project."

AddCommand.flags = {
  name: flags.string({char: 'n', description: 'Name of new binary'}),
  type: flags.string({char: 't', description: 'Type of binary. One of [ e - executable, s - static lib, d - dynamic lib]'}),
}

module.exports = AddCommand
