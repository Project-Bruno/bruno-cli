const {Command, flags} = require('@oclif/command');
const yaml = require('js-yaml');
const inquirer = require('inquirer');
const chalk = require('chalk');
// const fs = require('fs');
// const os = require('os');
// const endOfLine = require('os').EOL;
const brunoUtils = require('./../common/utils');
const EXIT_CODES = require('./../common/exit-codes');
class GenerateCommand extends Command {
  async run() {
    // const {flags} = this.parse(GenerateCommand);

    // Verify this is an existing Bruno project
    if (!brunoUtils.is_bruno_repo()) {
      console.log(chalk.redBright('Error: This is not a bruno tracked repository'));
      return EXIT_CODES.NON_BRUNO_REPOSITORY_ERROR;
    }

    // Declare questions for prompting
    const questions = [
      {
        name: 'item',
        type: 'list',
        choices: [
          'Class',
          'Header File',
          'Source File',
        ],
        message: 'Select an item to generate: ',
      },
      {
        name: 'name',
        type: 'input',
        message: 'Item name: ',
      },
      {
        name: 'add-namespace',
        type: 'confirm',
        message: 'Add to a namespace?',
      },
    ];

    inquirer.prompt(questions);
  }
}

GenerateCommand.description = 'generates project files based on a schematic';

GenerateCommand.flags = {
  class: flags.string({char: 'c', description: 'Generate a new class.'}),
  header: flags.string({char: 'h', description: 'Generate a new header file.'}),
  source: flags.string({char: 's', description: 'Generate a new source file.'}),
};

module.exports = GenerateCommand;
