import { BaseAssertion } from "./BaseAssertion.ts";

export class BooleanAssertion extends BaseAssertion<Boolean> {
  public true() {
    this.assert(
      this.value === this.assertTrue,
      `Expected ${this}${this.assertTrue ? " " : " NOT "}to be "true".`
    );
  }
}