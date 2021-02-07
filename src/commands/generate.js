const {Command, flags} = require('@oclif/command');
const yaml = require('js-yaml');
const fs = require('fs');
const os = require('os');
const prompt = require('prompt');
const colors = require("colors/safe");
const endOfLine = require('os').EOL;
const brunoUtils = require('./../common/utils');
class GenerateCommand extends Command {
  async run() {
    const {flags} = this.parse(AddCommand);

    if (!(brunoUtils.is_bruno_repo())) {
      //TODO: Add better error message
      console.log("Error: This is not a bruno tracked repository");
      return;
    }

    let newBinary = {
      name: 'my-bruno-binary',
      entry_point: 'index.cpp',
      is_lib: {
        not_a_lib: true,
        static: false,
        dynamic: false
      },
      project_files: {},
      external_deps: {}
    };

    const promptParams = [
      {
        name: 'binary_name',
        description: 'binary name: ',
        type: 'string',
        required: true,
        validator: /^[a-zA-Z\s\-]+$/, // TODO: Change validator
        warning: 'Binary name must be only letters, spaces, or dashes.',
        default: `${newBinary['name']}`
      },
      {
        name: 'entry_point',
        description: 'File used as entry point: ',
        type: 'string',
        required: true,
        warning: 'Entry point file name must be only letters, spaces, or dashes.',
        default: `${newBinary['entry_point']}`
      },
      {
        name: 'is_lib',
        description: 'Is this binary a library: ',
        type: 'string',
        required: true,
        validator: /^[a-zA-Z\s\-]+$/, // TODO: Change validator
        warning: 'Answers can only be n - no, s - static, d - dynamic (.so on unix systems, .dll on windows sytems)',
        default: 'no'
      },
    ];

    prompt.message = colors.green("> ");
    prompt.delimiter = "";
    prompt.start();

    prompt.get(promptParams, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

      brunoUtils.read_bruno_file();
    });
  }
}

GenerateCommand.description = "Generate a build file";

GenerateCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = GenerateCommand;
