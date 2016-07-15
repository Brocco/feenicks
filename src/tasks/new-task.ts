import { Injectable } from '@angular/core';

// export interface NewTaskOptions {
//   name: string;
//   skipNpm: boolean;
// }

@Injectable()
export class NewTask {
  run(){
    console.log('');
    console.log('new task running');
    console.log('');
  }
  // console.log('new task');
  // console.log('name: ', options.name);
  // console.log('skipNpm: ', options.skipNpm);
}