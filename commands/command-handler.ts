export interface CommandHandler {
  validate(): boolean;
  run(): boolean;
}
export interface CommandHandler2<T> {
  validate(T): boolean;
  run(T): boolean;
}