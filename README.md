bruno-cli
=========

A command line interface for Bruno projects

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bruno-cli.svg)](https://npmjs.org/package/bruno-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bruno-cli.svg)](https://npmjs.org/package/bruno-cli)
[![License](https://img.shields.io/npm/l/bruno-cli.svg)](https://github.com/justws95/bruno-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bruno-cli
$ bruno COMMAND
running command...
$ bruno (-v|--version|version)
bruno-cli/0.0.0 linux-x64 node-v12.19.0
$ bruno --help [COMMAND]
USAGE
  $ bruno COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bruno help [COMMAND]`](#bruno-help-command)
* [`bruno init`](#bruno-init)
* [`bruno track`](#bruno-track)

## `bruno help [COMMAND]`

display help for bruno

```
USAGE
  $ bruno help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `bruno init`

Initializes a Bruno project.

```
USAGE
  $ bruno init

OPTIONS
  -n, --name=name  Name of new project
```

_See code: [src/commands/init.js](https://github.com/justws95/bruno-cli/blob/v0.0.0/src/commands/init.js)_

## `bruno track`

Describe the command here

```
USAGE
  $ bruno track

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/track.js](https://github.com/justws95/bruno-cli/blob/v0.0.0/src/commands/track.js)_
<!-- commandsstop -->
