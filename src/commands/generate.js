const {Command} = require('@oclif/command');
const yaml = require('js-yaml');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
// const os = require('os');
// const endOfLine = require('os').EOL;
const brunoUtils = require('./../common/utils');
const brunoTemplates = require('./../common/templates');
const EXIT_CODES = require('./../common/exit-codes');
class GenerateCommand extends Command {
  async run() {
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
    ];

    let needs_exit = false;

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
        needs_exit = true;
        break;
      }

      if (needs_exit) {
        return EXIT_CODES.UNSPECIFIED_BAD_EXIT;
      }

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

      // Create the files and any containing directories
      for (var i = 0; i < new_files.length; i++) {
        let file = new_files[i];

        if (file.includes('.h')) {
          let header_dir = brunoFile.project_structure.root_dir +
              path.sep + brunoFile.project_structure.include_dir;

          // Check that bruno header file directory exists, otherwise create it
          if (!brunoUtils.project_dir_exists(brunoFile, brunoFile.project_structure.include_dir)) {
            fs.mkdirSync(header_dir);
          }

          // Write the header file template to the new file
          let header_file = header_dir + path.sep + file;
          let header_contents = brunoTemplates.get_header_file(file);

          fs.writeFile(header_file, header_contents, error => {
            if (error) {
              return console.log(error);
            }
          });
        }

        if (file.includes('.cpp')) {
          let source_dir = brunoFile.project_structure.root_dir +
              path.sep + brunoFile.project_structure.source_dir;

          // Check that bruno src file directory exists, otherwise create it
          if (!brunoUtils.project_dir_exists(brunoFile, brunoFile.project_structure.source_dir)) {
            fs.mkdirSync(source_dir);
          }

          // Write the header file template to the new file
          let header_file = source_dir + path.sep + file;
          let header_contents = brunoTemplates.get_header_file(file);

          fs.writeFile(header_file, header_contents, error => {
            if (error) {
              return console.log(error);
            }
          });
        }
      }
    });

    return EXIT_CODES.GOOD_EXIT;
  }
}

GenerateCommand.description = 'generates project files based on a schematic';

module.exports = GenerateCommand;
