const {Command} = require('@oclif/command');
const yaml = require('js-yaml');
const fs = require('fs');
const os = require('os');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
// const endOfLine = require('os').EOL;
const brunoUtils = require('./../common/utils');

class InitCommand extends Command {
  async run() {
    // Verify this is not an existing Bruno project
    if (brunoUtils.is_bruno_repo()) {
      console.log(chalk.redBright('Error: This is already a bruno tracked repository'));
      return;
    }

    // Display the welcome banner
    console.log(
      chalk.cyanBright.bold(
        figlet.textSync('BRUNO', {horizontalLayout: 'full'})
      )
    );

    const BRUNO_PATH = './bruno.yml';

    /*
      Create a new project using The Pitchfork Layout (PFL) for file structure. 
      Reference: https://api.csswg.org/bikeshed/?force=1&url=https://raw.githubusercontent.com/vector-of-bool/pitchfork/develop/data/spec.bs
    */
    let BRUNO_PROJ = {
      project_name: 'my-bruno-project',
      compiler: '',
      build_system: 'make',
      language_standard: 'latest',
      project_structure: {
        build_dir: 'build',
        include_dir: 'include',
        source_dir: 'src',
        test_dir: 'tests',
        examples_dir: 'examples',
        external_dir: 'external',
        data_dir: 'data',
        tools_dir: 'tools',
        documentation_dir: 'docs',
        libs_dir: 'libs',
        extras_dir: 'extras',
      }
    };

    switch (os.platform()) {
    case 'linux':
      BRUNO_PROJ.compiler = 'gcc';
      BRUNO_PROJ.buildSystem = 'make';
      break;
    case 'darwin':
      BRUNO_PROJ.compiler = 'clang';
      BRUNO_PROJ.buildSystem = 'make';
      break;
    case 'win32':
      BRUNO_PROJ.compiler = 'gcc';
      BRUNO_PROJ.buildSystem = 'make';
      break;
    default:
      BRUNO_PROJ.compiler = 'gcc';
      BRUNO_PROJ.buildSystem = 'make';
      break;
    }

    const questions = [
      {
        name: 'project-name',
        type: 'input',
        default: BRUNO_PROJ.project_name,
        message: 'Name of new Bruno project: ',
      },
      {
        name: 'compiler',
        type: 'input',
        default: BRUNO_PROJ.compiler,
        message: 'Compiler: ',
      },
      {
        name: 'build-system',
        type: 'input',
        default: BRUNO_PROJ.build_system,
        message: 'Build System: ',
      },
      {
        name: 'lang-std',
        type: 'list',
        choices: [
          'Latest',
          'C++20/C++2a',
          'C++17/C++1z',
          'C++14/C++1y',
          'C++11/C++0x',
          'C++03',
          'C++98',
        ],
        default: BRUNO_PROJ.language_standard,
        message: 'Language Standard: ',
      },
      {
        name: 'pitchfork',
        type: 'confirm',
        message: `Use The Pitchfork Layout (PFL) project structure? ${chalk.yellow('Recomended for larger projects.')}`,
      },
    ];

    inquirer.prompt(questions)
    .then(answers => {
      if (answers.p)
    })
    .catch(error => {
      if(error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
    .finally(answers => {
      let yamlStr = yaml.safeDump(BRUNO_PROJ);
      fs.writeFileSync('./bruno.yml', yamlStr, 'utf8');
      console.log(chalk.magenta(`Initialize new Bruno project at ${BRUNO_PATH}`));
    });
  }
}

InitCommand.description = 'Initialize a new Bruno project.';

module.exports = InitCommand;
