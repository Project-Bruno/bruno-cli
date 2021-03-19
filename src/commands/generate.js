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
        name: 'new-item',
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
      /*
        // TODO: impeliment the ability to add to a specific namespace
      {
        name: 'add-namespace',
        type: 'confirm',
        message: 'Add to a namespace?',
      },
      */
    ];

    inquirer.prompt(questions)
    .then(answers => {
      // Determine which new files need to be created
      let new_files = [];

      switch (answers['new-item']) {
      case 'Class':
        new_files.push(`${answers.name}.h`);
        new_files.push(`${answers.name}.cpp`);
        break;
      case 'Header File':
        new_files.push(`${answers.name}.h`);
        break;
      case 'Source File':
        new_files.push(`${answers.name}.cpp`);
        break;
      default:
        // This state should NEVER be reached under normal operation
        console.log(chalk.redBright('Internal Error: Unspecifiend selection given to bruno generate. Exiting....'));
        break;
      }

      // Test to see if the containing directory needs to be created
      
    });
  }
}

GenerateCommand.description = 'generates project files based on a schematic';

GenerateCommand.flags = {
  class: flags.string({char: 'c', description: 'Generate a new class.'}),
  header: flags.string({char: 'h', description: 'Generate a new header file.'}),
  source: flags.string({char: 's', description: 'Generate a new source file.'}),
};

module.exports = GenerateCommand;
