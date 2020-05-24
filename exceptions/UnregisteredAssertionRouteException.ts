import { IConstructor } from "../util/types.ts";

export class UnregisteredAssertionRouteException<T extends IConstructor<any>>
  extends Error {
  constructor(Class: T | string) {
    const message = `No route matching "${
      typeof Class === "string" ? Class : Class.name
    }" was found. Use "addRoute()" or "spliceRoute()" instead.`;

    super(message);
  }
}
