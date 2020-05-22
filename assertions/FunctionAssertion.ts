import { BaseAssertion } from "./BaseAssertion.ts";
import { IConstructor } from "../types.ts";

export class FunctionAssertion extends BaseAssertion<Function> {

  public throw(ErrorClass?: IConstructor<Error>, message?: string) {

  }

  public async throwAsync(ErrorClass?: IConstructor<Error>, message?: string) {

  }
}
