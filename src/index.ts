#!/usr/bin/env node
'use strict';

// Provide a title to the process in `ps`
process.title = 'angular-cli'

var vorpal = require('vorpal')();

let NewCommand = require('./commands/new');
NewCommand.NewCommand.register(vorpal);

vorpal.parse(process.argv);