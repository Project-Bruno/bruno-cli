const {Command, flags} = require('@oclif/command');
const yaml = require('js-yaml');
const fs = require('fs');
const os = require('os');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const brunoUtils = require('./../common/utils');
const EXIT_CODES = require('./../common/exit-codes');

class InitCommand extends Command {
  async run() {
    const {flags} = this.parse(InitCommand);

    // Verify this is not an existing Bruno project
    if (!flags.force) {
      if (brunoUtils.is_bruno_repo()) {
        console.log(chalk.redBright('Error: This is already a bruno tracked repository'));
        return EXIT_CODES.BRUNO_DUPLICATE_INIT_ERROR;
      }
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
        root_dir: '.',
        main: '',
        build_dir: 'build',
        include_dir: 'include',
        source_dir: 'source',
        test_dir: 'tests',
        examples_dir: 'examples',
        external_dir: 'external',
        data_dir: 'data',
        tools_dir: 'tools',
        documentation_dir: 'docs',
        libs_dir: 'libs',
        extras_dir: 'extras',
      },
      compiler_flags: {
        debug: [],
        production: [],
      },
    };

    // Determine platform specific defaults
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

    // Declare questions for prompting
    const questions = [
      {
        name: 'project_name',
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
        name: 'build_system',
        type: 'input',
        default: BRUNO_PROJ.build_system,
        message: 'Build System: ',
      },
      {
        name: 'language_standard',
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
        default: 'Y',
        message: `Use The Pitchfork Layout (PFL) project structure? ${chalk.yellow('Recomended for larger projects.')}`,
      },
    ];

    inquirer.prompt(questions)
    .then((answers, inquirer) => {
      if (!answers.pitchfork) {
        // TODO: Find a more elegant way to do this
        delete BRUNO_PROJ.project_structure.build_dir;
        delete BRUNO_PROJ.project_structure.data_dir;
        delete BRUNO_PROJ.project_structure.documentation_dir;
        delete BRUNO_PROJ.project_structure.examples_dir;
        delete BRUNO_PROJ.project_structure.external_dir;
        delete BRUNO_PROJ.project_structure.extras_dir;
        delete BRUNO_PROJ.project_structure.libs_dir;
        delete BRUNO_PROJ.project_structure.test_dir;
        delete BRUNO_PROJ.project_structure.tools_dir;

        const structure_options = [
          {
            name: 'src-dir',
            type: 'input',
            default: '.',
            message: 'Source file(s) directory: ',
          },
          {
            name: 'include-dir',
            type: 'input',
            default: '.',
            message: 'Include file(s) directory: ',
          },
        ];

        inquirer.prompt(structure_options)
        .then(answers => {
          BRUNO_PROJ.project_structure.source_dir = answers['src-dir'];
          BRUNO_PROJ.project_structure.include_dir = answers['include-dir'];
        });
      }

      return answers;
    })
    .then(answers => {
      for (const key in answers) {
        if (key === 'pitchfork') {
          continue;
        } else {
          BRUNO_PROJ[key] = answers[key];
        }
      }

      // Specify the entrypoint file name NOTE: This is kinda hacky
      BRUNO_PROJ.project_structure.main = `${BRUNO_PROJ.project_name}.cpp`;
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }

      return EXIT_CODES.UNSPECIFIED_BAD_EXIT;
    })
    .finally(() => {
      fs.writeFileSync('./bruno.yml', yaml.safeDump(BRUNO_PROJ), 'utf8');
      console.log(chalk.magenta(`Initialized new Bruno project at ${BRUNO_PATH}`));
    });

    return EXIT_CODES.GOOD_EXIT;
  }
}

InitCommand.description = 'initialize a new Bruno project';

InitCommand.flags = {
  force: flags.boolean({char: 'f', description: 'Overwrite existing bruno file.'}),
};

module.exports = InitCommand;
