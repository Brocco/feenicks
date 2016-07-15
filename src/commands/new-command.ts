import { Inject } from '@angular/core';
import { Command, CommandHandler, Argument, Option } from '../lib/command';
import { NewTask } from '../tasks';

@Command({
  name: 'new',
  description: 'Create a new application',
})
export class NewCommand implements CommandHandler {
  private _newTask: NewTask;

  constructor(@Inject(NewTask) newTask) {
    this._newTask = newTask;
  }

  @Option({
    description: 'Setup this app as a mobile app',
    alias: 'm'
  })
  mobile: boolean = false;

  @Argument({
    description: 'Name of the new app',
    required: true
  })
  name: string;
  
  validate() {
    console.log('validating...');
    console.log('******************');
    console.log('******************');
    this._newTask.run();
    console.log('******************');
    console.log('******************');
    return true;
  }
  
  run() {
    console.log('running...');
    console.log('name = ', this.name);
    return true;
  }
}
