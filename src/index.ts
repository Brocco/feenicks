#!/usr/bin/env node

/// <reference path="../node_modules/@types/node/index.d.ts" />

'use strict';

require('reflect-metadata');
const vorpal = require('vorpal')();

import { Injector, ReflectiveInjector, provide } from '@angular/core';

import commands from './commands';
import * as tasks from './tasks';

let diItems = [].concat(commands);
for(let t in tasks){
  diItems.push(provide(tasks[t], { useClass: tasks[t] }))
}

let injector = ReflectiveInjector.resolveAndCreate(diItems);

commands.forEach(command => {
  command.register(vorpal, injector);
});

vorpal.parse(process.argv);