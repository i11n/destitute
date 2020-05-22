import { BaseAssertion } from "./BaseAssertion.ts";

export class BooleanAssertion extends BaseAssertion<Boolean> {
  /**
   * Asserts whether the test `value` being `true`, is expected.
   */
  public true() {
    this.assert(
      this.value === this.assertTrue,
      `${this.expectString} to be "true".`,
    );
  }
}
