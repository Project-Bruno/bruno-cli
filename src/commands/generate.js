const {Command, flags} = require('@oclif/command')

class GenerateCommand extends Command {
  async run() {
    const {flags} = this.parse(GenerateCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/justin/School/SeniorDesign/Bruno-CLI/bruno-cli/src/commands/generate.js`)
  }
}

GenerateCommand.description = "Generate a build file";

GenerateCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = GenerateCommand
