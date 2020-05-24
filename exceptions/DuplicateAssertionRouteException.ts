import { IConstructor } from "../util/types.ts";
import { BaseAssertion } from "../assertions/BaseAssertion.ts";

export class DuplicateAssertionRouteException<T extends IConstructor<any>>
  extends Error {
  constructor(Class: T | string, assertion: IConstructor<BaseAssertion>) {
    const message = `A route matching "${
      typeof Class === "string" ? Class : Class.name
    }" is already mapped to "${assertion.name}". Use "setRoute()" to override.`;

    super(message);
  }
}
