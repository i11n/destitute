import { BaseAssertion } from "./BaseAssertion.ts";
import { IConstructor } from "../util/types.ts";

export class FunctionAssertion extends BaseAssertion<Function> {
  protected checkThrown(
    throws: boolean = false,
    error?: Error,
    ErrorClass?: IConstructor<Error>,
    messageIncludes?: string | RegExp,
  ) {
    let message = "";
    const matchesClass = ErrorClass && error
      ? (Object.getPrototypeOf(error) === ErrorClass.prototype)
      : undefined;
    const matchesString = messageIncludes && error
      ? typeof messageIncludes === "string"
        ? (error.message.includes(messageIncludes))
        : messageIncludes.test(error.message)
      : undefined;
    const errClass = error ? error.constructor.name : "";

    if (this.assertTrue && throws) { //  expected to throw
      //  expect to throw Error Type, but didn't
      if (ErrorClass && !matchesClass) {
        this.fail(
          `${this.expectString} to throw "${ErrorClass.name}", but threw "${errClass}".`,
        );
      }
      //  expect to throw error containing message, but didn't
      if (messageIncludes && !matchesString) {
        this.fail(
          `${this.expectString} to throw error ${
            typeof messageIncludes === "string"
              ? `containing "${messageIncludes}"`
              : `matches "${messageIncludes}"`
          }, but threw "${error?.message}".`,
        );
      }
    } else if (this.assertTrue && !throws) { //  expected to throw but didn't
      this.fail(`${this.expectString} to throw an error.`);
    } else if (!this.assertTrue && throws) { //  expected not to throw but did
      if (!ErrorClass && !messageIncludes) { //  expected not to throw at all
        this.fail(`${this.expectString} to throw an error, but threw "${error?.constructor.name}" with message "${error?.message}".`);
      }

      if (ErrorClass && matchesClass) { //  expected thrown message not to be of Error Type, but it is
        this.fail(`${this.expectString} to throw "${ErrorClass.name}".`);
      }

      if (messageIncludes && matchesString) { //  expected thrown message not to contain message, but it did
        this.fail(
          `${this.expectString} to throw error containing ${
            typeof messageIncludes === "string"
              ? `containing "${messageIncludes}"`
              : `matches "${messageIncludes}"`
          }, but threw "${error?.message}".`,
        );
      }
    }
  }

  public throw(
    ErrorClass?: IConstructor<Error>,
    messageIncludes?: string | RegExp,
  ) {
    try {
      this.value();
      this.checkThrown(false, undefined, ErrorClass, messageIncludes);
    } catch (e) {
      this.checkThrown(true, e, ErrorClass, messageIncludes);
    }
  }

  public throwWith(
    args: unknown[],
    ErrorClass?: IConstructor<Error>,
    messageIncludes?: string | RegExp,
  ) {
    try {
      this.value(...args);
      this.checkThrown(false, undefined, ErrorClass, messageIncludes);
    } catch (e) {
      this.checkThrown(true, e, ErrorClass, messageIncludes);
    }
  }

  // public return<T extends IAssertion = any>(callback: (assertion: T) => void) {
  // }

  // public returnAsync<T extends IAssertion = any>(callback: (assertion: T) => void) {

  // }

  // public returnWith<T extends IAssertion = any>(args: unknown[], callback: (assertion: T) => void) {

  // }

  // public returnWithAsync<T extends IAssertion = any>(args: unknown[], callback: (assertion: T) => void) {

  // }
}
