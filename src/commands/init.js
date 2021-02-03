const {Command} = require('@oclif/command');
const yaml = require('js-yaml');
const fs = require('fs');
const os = require('os');
const prompt = require('prompt');
const figlet = require('figlet');
const chalk = require('chalk');
const colors = require('colors/safe');
const endOfLine = require('os').EOL;
const brunoUtils = require('./../common/utils');

class InitCommand extends Command {
  async run() {
    // Display the welcome banner
    console.log(
      chalk.cyanBright.bold(
        figlet.textSync('BRUNO', {horizontalLayout: 'full'})
      )
    );

    const path = './bruno.yml';

    if (brunoUtils.is_bruno_repo()) {
      console.log('Error: This is already a bruno tracked repository');
      return;
    }

    let newProject = {
      projectName: 'my-bruno-project',
      compiler: '',
      buildSystem: 'make',
      languageStandard: 'latest',
      trackedFiles: [],
      projectDependancies: {},
      binaries: {},
    };

    switch (os.platform()) {
    case 'linux':
      newProject.compiler = 'gcc';
      newProject.buildSystem = 'make';
      break;
    case 'darwin':
      newProject.compiler = 'clang';
      newProject.buildSystem = 'make';
      break;
    case 'win32':
      newProject.compiler = 'gcc';
      newProject.buildSystem = 'make';
      break;
    default:
      newProject.compiler = 'gcc';
      newProject.buildSystem = 'make';
      break;
    }

    const promptParams = [
      {
        name: 'project_name',
        description: 'project name: ',
        type: 'string',
        required: true,
        validator: /^[a-zA-Z\s\-]+$/, // TODO: Change validator
        warning: 'Project name must be only letters, spaces, or dashes.',
        default: `${newProject.projectName}`,
      },
      {
        name: 'compiler',
        description: 'compiler: ',
        type: 'string',
        required: true,
        default: `${newProject.compiler}`,
      },
      {
        name: 'build_system',
        description: 'build system: ',
        type: 'string',
        required: true,
        default: `${newProject.buildSystem}`,
      },
      {
        name: 'language_standard',
        description: 'language standard: ',
        type: 'string',
        required: true,
        default: `${newProject.languageStandard}`,
      },
      {
        name: 'isOk',
        description: (endOfLine + `${newProject.toString()}` +  endOfLine + 'Is this ok?:'), //TODO: Doesnt actually print obj
        type: 'string',
        required: true,
        validator: /^[a-zA-Z\s\-]+$/, // TODO: Change validator
        warning: 'Only yes or no answers will be accepted.',
        default: 'yes',
      }
    ];

    prompt.message = colors.green('> ');
    prompt.delimiter = '';
    prompt.start();

    prompt.get(promptParams, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

      // TODO: Shorten if possible
      if (result.isOk === 'n' || result.isOk === 'no' || result.isOk === 'N' || result.isOk === 'No') {
        console.log(colors.red('Aborted'));
        return;
      }

      for (const [key, value] of Object.entries(result)) {
        if (key === 'isOk') {
          continue;
        }

        newProject[key] = value;
      }

      let yamlStr = yaml.safeDump(newProject);
      fs.writeFileSync('./bruno.yml', yamlStr, 'utf8');
      console.log(colors.green(`Initialized new Bruno repository in ${path}`));
    });
  }
}

InitCommand.description = 'Initialize a new Bruno project.';

module.exports = InitCommand;
