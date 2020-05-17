import { AssertionRouter } from "./AssertionRouter.ts";
import { IAssertion } from "./types.ts";

export function AssertThat<T extends IAssertion>(value: unknown): any {
  const Assertion = AssertionRouter.matchRoute(value);

  return new Assertion(value) as any;
}
