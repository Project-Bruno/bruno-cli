const {Command, flags} = require('@oclif/command')

class AddCommand extends Command {
  async run() {
    const {flags} = this.parse(AddCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/justin/School/SeniorDesign/Bruno-CLI/bruno-cli/src/commands/add.js`)
  }
}

AddCommand.description = `Describe the command here
...
Extra documentation goes here
`

AddCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = AddCommand
