import { IExceptionData } from "./IExceptionData.ts";

export class AssertionException extends Error {
  constructor(message: string, data?: IExceptionData) {
    super(message);
    this.name = "AssertionError";
  }
}
