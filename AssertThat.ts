import { AssertionRouter } from "./AssertionRouter.ts";
import { IAssertion } from "./types.ts";

/**
 * The core assertion function.
 * 
 * **Example**
 * ```ts
 * import {
 *  AssertThat
 * } from "https://denopkg.com/i11n/assert-that/";
 * 
 * Deno.test("hello world", () => {
 *  AssertThat("hello world")
 *    .matches(/world/);
 * });
 * 
 * Deno.test("integer", () => {
 *  AssertThat(25)
 *    .is.an.integer();
 * });
 * ```
 * @param value The value to test.
 */
export function AssertThat<T extends IAssertion>(value: unknown): any {
  const Assertion = AssertionRouter.matchRoute(value);

  return new Assertion(value) as any;
}

AssertThat;
