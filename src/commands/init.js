const { Command } = require('@oclif/command');
const yaml = require('js-yaml');
const fs = require('fs');
const os = require('os');
const prompt = require('prompt');
const colors = require("colors/safe");
const endOfLine = require('os').EOL;


class InitCommand extends Command {
  async run() {
    const path = './bruno.yml';

    // See if this is already a Bruno tracked project
    try {
      if (fs.existsSync(path)) {
        // bruno.yml file exists
        console.log("Error: This is already a bruno tracked repository");
        return;
      }
    } catch(err) {
      console.error(err);
    }

    // Set up a new project
    let newProject = {
      project_name: 'my-bruno-project',
      compiler: '',
      build_system: 'make',
      language_standard: 'latest',
      exec_format: '',
      is_lib: {
        static: false,
        shared_objects: false,
        dll: false
      },
      tracked_files: [],
      project_dependancies: {},
      binaries: {}
    };

    switch (os.platform()) {
      case 'linux':
        newProject['compiler'] = 'gcc';
        newProject['build_system'] = 'make';
        break;
      case 'darwin':
        newProject['compiler'] = 'clang';
        newProject['build_system'] = 'make';
        break;
      case 'win32':
        newProject['compiler'] = 'gcc';
        newProject['build_system'] = 'make';
        break;
      default:
        newProject['compiler'] = 'gcc';
        newProject['build_system'] = 'make';
        break;
    }

    // Prompt the user for inputs
    const promptParams = [
      {
        name: 'project_name',
        description: 'project name: ',
        type: 'string',
        required: true,
        validator: /^[a-zA-Z\s\-]+$/, // TODO: Change validator
        warning: 'Project name must be only letters, spaces, or dashes.',
        default: `${newProject['project_name']}`
      },
      {
        name: 'compiler',
        description: 'compiler: ',
        type: 'string',
        required: true,
        default: `${newProject['compiler']}`
      },
      {
        name: 'build_system',
        description: 'build system: ',
        type: 'string',
        required: true,
        default: `${newProject['build_system']}`
      },
      {
        name: 'language_standard',
        description: 'language standard: ',
        type: 'string',
        required: true,
        default: `${newProject['language_standard']}`
      },
      {
        name: 'isOk',
        description: (endOfLine + `${newProject.toString()}` +  endOfLine + "Is this ok?:"), //TODO: Doesnt actually print obj
        type: 'string',
        required: true,
        validator: /^[a-zA-Z\s\-]+$/, // TODO: Change validator
        warning: 'Only yes or no answers will be accepted.',
        default: 'yes'
      }
    ];

    prompt.message = colors.green("> ");
    prompt.delimiter = "";
    prompt.start();

    prompt.get(promptParams, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }

        // TODO: Shorten if possible
        if (result.isOk === 'n' || result.isOk === 'no' || result.isOk === 'N' || result.isOk === 'No') {
          console.log(colors.red("Aborted"));
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

InitCommand.description = "Initialize a new Bruno project.";

module.exports = InitCommand;
