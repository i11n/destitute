import { BaseAssertion } from "./BaseAssertion.ts";

export class StringAssertion extends BaseAssertion<string> {
  
  /**
   * Asserts whether the test `value` matching the regular expression `regex`, is expected.
   */
  public match(regex: RegExp) {
    this.assert(
      regex.test(this.value) === this.assertTrue,
      `${this.expectString} to match "${regex.source}".`,
    );
  }

  /**
   * Asserts whether the test `value` containing the string `str`, is expected.
   */
  public contain(str: string) {
    this.assert(
      this.value.includes(str) === this.assertTrue,
      `${this.expectString} to include "${str}".`,
    );
  }

  /**
   * Asserts whether the test `value` containing the string `str`, is expected.
   * 
   * @alias contain
   */
  public include(str: string) {
    this.contain(str);
  }

  /**
   * Asserts whether the test `value` having a lenght of `num`, is expected.
   */
  public lengthOf(num: number) {
    this.assert(
      (this.value.length === num) === this.assertTrue,
      `${this.expectString} to have a length of "${num}".`,
    );
  }
}
