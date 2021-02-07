const {Command, flags} = require('@oclif/command')

class AuditCommand extends Command {
  async run() {
    const {flags} = this.parse(AuditCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/justin/School/SeniorDesign/Bruno-CLI/bruno-cli/src/commands/audit.js`)
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
