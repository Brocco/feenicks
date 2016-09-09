import { NewCommand } from './new-command';

describe('New Command', () => {
  let newTask, uut: NewCommand;

  function createUut(): void {
    uut = new NewCommand(newTask);
  }

  beforeEach(() => {
    newTask = jasmine.createSpyObj('newTask', ['run']);
  });

  it('should instantiate', () => {
    createUut();
    expect(uut).toBeTruthy();
  });

  describe('validate', () => {
    it('should implement a validate method', () => {
      createUut();
      expect(typeof uut.validate).toEqual('function');
    });

    it('should call newTask.run()', () => {
      createUut();
      uut.validate();
      expect(newTask.run).toHaveBeenCalledTimes(1);
    });

    it('should return true', () => {
      createUut();
      let returnValue = uut.validate();
      expect(returnValue).toEqual(true);
    })
  });

  describe('run', () => {
    it('should implement a run method', () => {
      createUut();
      expect(typeof uut.run).toEqual('function');
    });
  });
})