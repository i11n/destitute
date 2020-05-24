import { IConstructor } from "../types.ts";
import { AssertionError } from "../AssertionError.ts";
import { FunctionAssertion } from "./FunctionAssertion.ts";

export class AsyncFunctionAssertion extends FunctionAssertion {

  public async throw(ErrorClass?: IConstructor<Error>, messageIncludes?: string | RegExp) {
    try {
      await this.value();
      this.checkThrown(false, undefined, ErrorClass, messageIncludes);
    } catch (e) {
      this.checkThrown(true, e, ErrorClass, messageIncludes);
    }
  }

  public async throwWith(args: unknown[], ErrorClass?: IConstructor<Error>, messageIncludes?: string | RegExp) {
    try {
      await this.value(...args);
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
