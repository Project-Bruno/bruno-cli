/* Define templates for header and source files. */
const path = require('path');

exports.get_header_file = file_name => {
  if (file_name.includes('.h')) {
    file_name = path.parse(file_name).name;
  }

  let template = `
  #ifndef ${file_name}.h
  #define ${file_name}.h

  /* SOURCE CODE GOES HERE */

  #endif
  `;

  return template;
};

exports.get_class_definition_file = file_name => {
  if (file_name.includes('.h') || file_name.includes('.cpp')) {
    file_name = path.parse(file_name).name;
  }

  let template = `
  #include "${file_name}.h"

  /* SOURCE CODE GOES HERE */

  `;

  return template;
};
