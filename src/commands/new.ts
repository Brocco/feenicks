import { Command, CommandHandler, Argument, Option } from './command';

@Command({
  name: 'new',
  description: 'Create a new application',
})
export class NewCommand implements CommandHandler {
  constructor() {
    this.validate.bind(this);
    this.run.bind(this);
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
    return true;
  }
  run() {
    console.log('running...');
    console.log('name = ', this.name);
    return true;
  }
}
