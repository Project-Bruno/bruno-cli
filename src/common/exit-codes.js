/*
  This module exports all exit codes
*/

exports.UNSPECIFIED_BAD_EXIT = -1;        // Bad exit without dedicated exit code, not a long term solution
exports.GOOD_EXIT = 0;                    // Normal exit
exports.FILE_NOT_FOUND_ERROR = 1;         // Could not find file
exports.NON_BRUNO_REPOSITORY_ERROR = 2;   // Directory is not a bruno reository
exports.BRUNO_DUPLICATE_INIT_ERROR = 3;   // Re-initialization of a bruno repository
exports.COULD_NOT_LOAD_BRUNO_PROJ = 4;    // Could not load bruno project file
exports.COULD_NOT_CREATE_PROJ_FILE = 5;   // Could not create project file
exports.COULD_NOT_WRITE_PROJ_FILE = 6;    // Could not write project file
