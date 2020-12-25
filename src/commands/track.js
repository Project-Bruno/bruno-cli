const {Command, flags} = require('@oclif/command');
const yaml = require('js-yaml');
const fs = require('fs');
const os = require('os');

class TrackCommand extends Command {
  async run() {
    const {flags} = this.parse(TrackCommand);
    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/justin/School/SeniorDesign/Bruno-CLI/bruno-cli/src/commands/track.js`)
  }
}

TrackCommand.description = `Describe the command here
...
Extra documentation goes here
`

TrackCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = TrackCommand
