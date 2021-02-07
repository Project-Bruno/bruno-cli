const {Command, flags} = require('@oclif/command')

class PruneCommand extends Command {
  async run() {
    const {flags} = this.parse(PruneCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/justin/School/SeniorDesign/Bruno-CLI/bruno-cli/src/commands/prune.js`)
  }
}

PruneCommand.description = `Describe the command here
...
Extra documentation goes here
`

PruneCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = PruneCommand
