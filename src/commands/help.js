const {Command} = require('@oclif/command')


// Skeleton class, most Help class implementation is implemented in base oclif help class
class HelpCommand extends Command {
  async run() {
      console.log("Bruno integrates help documentation for every command.")
      console.log("Use the --help flag on any Bruo command to display usage\nand configurations for that command.")
  }
}

HelpCommand.description = `Provides documentation for Bruno
Use --help flag on any bruno command for more details.
`
module.exports = HelpCommand
