const {Command} = require('@oclif/command');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const chalk = require('chalk');
const EXIT_CODES = require('./../common/exit-codes');

class TrackCommand extends Command {
  async run() {
    // Read in the bruno yaml file
    let brunoFile = null;

    try {
      let fileContents = fs.readFileSync('./bruno.yml', 'utf8');
      brunoFile = yaml.safeLoad(fileContents);
    } catch (error) {
      console.log(error);
      return EXIT_CODES.UNSPECIFIED_BAD_EXIT;
    }

    if (brunoFile === null) {
      return EXIT_CODES.COULD_NOT_LOAD_BRUNO_PROJ;
    }

    // Declare questions for prompting
    const questions = [
      {
        name: 'file_name',
        type: 'input',
        message: 'Name of file to add: ',
      },
      {
        name: 'type',
        type: 'list',
        choices: [
          'Header',
          'Source',
        ],
        message: 'Select type of file: ',
      },
    ];

    inquirer.prompt(questions)
    .then(answers => {
      // Check that the file exist
      if (!fs.existsSync(path.resolve(answers.file_name))) {
        console.log(chalk.red(`Runtime Error: Could not find file ${answers.file_name}`));
        return EXIT_CODES.FILE_NOT_FOUND_ERROR;
      }

      // Add file to project tracked files
      if (answers.type === 'Header') {
        brunoFile.project_files.header.push(answers.file_name);
      } else {
        brunoFile.project_files.source.push(answers.file_name);
      }

      // Update the bruno project file with the changes
      fs.writeFileSync('./bruno.yml', yaml.safeDump(brunoFile), 'utf8');
      console.log(chalk.magenta('Bruno project has been updated!'));
    });

    return EXIT_CODES.GOOD_EXIT;
  }
}

TrackCommand.description = 'Add file to Bruno project tracking';

module.exports = TrackCommand;
