import { CommandMetadata } from './command-metadata';
import * as _ from 'lodash';
// var vorpal = require('vorpal')();

export function register(vorpal, command: CommandMetadata, ctor: any){
  
  let commandName = command.name;
  
  if (ctor.prototype.__arguments) {
    for(let key in ctor.prototype.__arguments) {
      let value = ctor.prototype.__arguments[key][0];
      let arg = value.required ? 
        `<${key}${value.variadic ? '...' : ''}>` :
        `[${key}${value.variadic ? '...' : ''}]`; 
      commandName += ` ${arg}`;
    }
  }
  let cmd = vorpal.command(commandName);
  cmd.description(command.description);

  // if (command.options) {
  //   command.options.forEach(option => {
  //     let arg = '';
  //     if (option.alias) {
  //       arg += `-${option.alias}, `
  //     }
  //     arg += `--${option.name}`;
  //     cmd.option(arg, option.description);
  //   });
  // }
  if (ctor.prototype.__options) {
    for(let key in ctor.prototype.__options) {
      let value = ctor.prototype.__options[key][0];
      let option = '';
      if (value.alias) {
        option += `-${value.alias}, `
      }
      option += `--${key}`;
      cmd.option(option, value.description);
    }
  }

  cmd.validate((args) => {
    //get instance via ctor
    let instance = new ctor();
    return instance.validate(args);
  });
  
  cmd.action((args) => {
    //get instance via ctor
    console.log('vorpal raw args...');
    console.log(JSON.stringify(args, null, 2));
    let instance = new ctor();
    _.extend(instance, args);
    return instance.run(args);
  });
}

