bruno-cli
=========

A command line interface for Bruno projects

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Maintainability](https://api.codeclimate.com/v1/badges/8bfba664e7feb2821a9e/maintainability)](https://codeclimate.com/github/justws95/bruno-cli/maintainability)
[![Version](https://img.shields.io/npm/v/bruno-cli.svg)](https://npmjs.org/package/bruno-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bruno-cli.svg)](https://npmjs.org/package/bruno-cli)


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
* [`bruno audit`](#bruno-audit)
* [`bruno build`](#bruno-build)
* [`bruno config ARG1 ARG2`](#bruno-config-arg1-arg2)
* [`bruno generate`](#bruno-generate)
* [`bruno help [COMMAND]`](#bruno-help-command)
* [`bruno init`](#bruno-init)
* [`bruno track`](#bruno-track)

## `bruno audit`

Describe the command here

```
USAGE
  $ bruno audit

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/audit.js](https://github.com/justws95/bruno-cli/blob/v0.0.0/src/commands/audit.js)_

## `bruno build`

Describe the command here

```
USAGE
  $ bruno build

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/build.js](https://github.com/justws95/bruno-cli/blob/v0.0.0/src/commands/build.js)_

## `bruno config ARG1 ARG2`

Alter configuration of Bruno

```
USAGE
  $ bruno config ARG1 ARG2

OPTIONS
  -e, --edit=edit  edit config file
  -n, --name=name  name to print
```

_See code: [src/commands/config.js](https://github.com/justws95/bruno-cli/blob/v0.0.0/src/commands/config.js)_

## `bruno generate`

generates project files based on a schematic

```
USAGE
  $ bruno generate
```

_See code: [src/commands/generate.js](https://github.com/justws95/bruno-cli/blob/v0.0.0/src/commands/generate.js)_

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

initialize a new Bruno project

```
USAGE
  $ bruno init

OPTIONS
  -f, --force  Overwrite existing bruno file.
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
