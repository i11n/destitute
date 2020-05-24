import { IConstructor } from "../util/types.ts";

export class MissingAssertionRouteException<T extends IConstructor<any>>
  extends Error {
  constructor(value: unknown, valueType: T | string) {
    const message = `No route matching "${
      typeof valueType === "string" ? valueType : valueType.name
    }" for value (${value}) was found.`;

    super(message);
  }
}
