const {Command} = require('@oclif/command');
const {spawn} = require('child_process');
const yaml = require('js-yaml');
const chalk = require('chalk');
const fs = require('fs');
const brunoUtils = require('./../common/utils');
const EXIT_CODES = require('./../common/exit-codes');

class CleanCommand extends Command {
  async run() {
    // Verify this is an existing Bruno project
    if (!brunoUtils.is_bruno_repo()) {
      console.log(chalk.redBright('Error: This is not a bruno tracked repository'));
      return EXIT_CODES.NON_BRUNO_REPOSITORY_ERROR;
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

    // NOTE: Project currently only supports clean command for make
    if (brunoFile.buildSystem !== 'make') {
      console.log(chalk.redBright('Runtime Error: Bruno currently only supports clean for projects using Make.'));
      console.log(chalk.cyanBright('To contribute to bruno, follow directions at: https://github.com/Project-Bruno/bruno-cli'));
      return EXIT_CODES.UNSPECIFIED_BAD_EXIT;
    }

    // Launch make clean as a child process
    const clean_proc = spawn('make');

    clean_proc.stdout.on('data', data => {
      console.log('\n\n\nI am here\n\n');
      console.log(`child stdout:\n${data.toString('utf8')}`);
    });
  }
}

CleanCommand.description = 'Run the cleanup script';

module.exports = CleanCommand;
