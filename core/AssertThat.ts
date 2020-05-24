import { AssertionRouter } from "./AssertionRouter.ts";
import { BaseAssertion } from "../assertions/BaseAssertion.ts";

/**
 * The core assertion wrapper.
 * 
 * **Example**
 * ```ts
 * Deno.test("hello world", () => {
 *  AssertThat<StringAssertion>("hello world")
 *    .matches(/world/);
 * });
 * 
 * Deno.test("integer", () => {
 *  AssertThat<NumberAssertion>(25)
 *    .is.an.integer();
 * });
 * ```
 * 
 * @typeparam T The assertion class to cast as the return value. By default cast to `any` to reduce IDE errors.
 * @param value The value to test.
 * @returns The instantiated assertion class that was routed to based on the value passed.
 */
export function AssertThat<T extends BaseAssertion = any>(
  value?: unknown,
): T {
  const Assertion = AssertionRouter.matchRoute(value);

  return new Assertion(value) as T;
}
