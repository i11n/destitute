import { BaseAssertion } from "./BaseAssertion.ts";

export class StringAssertion extends BaseAssertion<string> {
  public matches(regex: RegExp) {
    this.assert(
      regex.test(this.value) === this.assertTrue,
      `${this.expectString} to match "${regex.source}".`,
    );
  }

  public contains(str: string) {
    this.assert(
      this.value.includes(str) === this.assertTrue,
      `${this.expectString} to include "${str}".`,
    );
  }

  public lengthOf(num: number) {
    this.assert(
      (this.value.length === num) === this.assertTrue,
      `${this.expectString} to have a length of "${num}".`,
    );
  }
}
