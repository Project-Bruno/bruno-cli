const {Command, flags} = require('@oclif/command');
const fs = require('fs');

class ConfigCommand extends Command {
  async run() {
    const {flags} = this.parse(ConfigCommand);
    if (!flags.edit && !flags.name) {
      const {args} = this.parse(ConfigCommand);

      var body = JSON.parse(fs.readFileSync('config.json').toString());
      if (body[args.arg1] === null) {
        this.log('Configuration setting ' + args.arg1 + ' not found\n');
        return;
      }

      body[args.arg1] = args.arg2;
      this.log('Configuration setting ' + args.arg1 + ' updated to ' + args.arg2);
      fs.writeFileSync('config.json', JSON.stringify(body));
    } else if (flags.name) {
      const name = flags.name || 'world';
      this.log(`hello ${name} from /config`);
    }
  }
}

ConfigCommand.description = 'Alter configuration of Bruno';

ConfigCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
  edit: flags.string({char: 'e', description: 'edit config file'}),
};

ConfigCommand.args = [
  {name: 'arg1', required: true},
  {name: 'arg2', required: true},
];

module.exports = ConfigCommand;
