import { CommandMetadata } from './command-metadata';
import { CommandHandler } from './command-handler';
import { register } from './register';
import 'reflect-metadata';
import * as _ from 'lodash';
export * from './command-handler';
export * from './command-metadata';

// Command Decorator
export function Command (command: CommandMetadata) {
  return (target) => {
    target.register = (vorpal) => {
      register(vorpal, command, target);
    };
    return target;
  };
}

export interface OptionMetadata {
  name?: string;
  description: string;
  required?: boolean;
  variadic?: boolean;
  alias?: string;
}

function OptionFactory(optionKey: string, optionMetadata?: OptionMetadata) {
  return (target: any, key: string) => {
    const attrMap: any = (target[optionKey] = target[optionKey] || {});
    const attrType = Reflect.getMetadata("design:type", target, key);
    // attrType will be a type constructor, like Boolean, Number, String, Array, ...

    const attrName = _.kebabCase(optionMetadata.name || key);
    attrMap[attrName] = attrMap[attrName] || [];
    attrMap[attrName].push(Object.assign({}, optionMetadata, {
      type: attrType
    }));
    return target;
  };
}

export const Option = (optionMetadata?: OptionMetadata) => {
  return OptionFactory('__options', optionMetadata);
};
export const Argument = (optionMetadata?: OptionMetadata) => {
  return OptionFactory('__arguments', optionMetadata);
};;
