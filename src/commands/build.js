const {Command, flags} = require('@oclif/command')

class BuildCommand extends Command {
  async run() {
    const {flags} = this.parse(BuildCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/justin/School/SeniorDesign/Bruno-CLI/bruno-cli/src/commands/build.js`)
  }
}

BuildCommand.description = `Describe the command here
...
Extra documentation goes here
`

BuildCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = BuildCommand
