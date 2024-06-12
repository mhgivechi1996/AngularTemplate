export  class OperationResult<T> {
  constructor() {
    this.message = '';
  }
  warnings: Array<string>;
  status: number;
  message?: string;
  value: T;
  ErrorCode: number;
}
