import { IAssertionData } from "./types.ts";

export class AssertionError extends Error {
  constructor(message: string, data?: IAssertionData) {
    super(message);
    this.name = "AssertionError";
  }
}
