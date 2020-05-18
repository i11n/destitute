import { BaseAssertion } from "./BaseAssertion.ts";

export class NumberAssertion extends BaseAssertion<number> {
  public gt(num: number) {
    this.assert(
      (this.value > num) === this.assertTrue,
      `${this.expectString} to be greater than "${num}".`,
    );
  }

  public gte(num: number) {
    this.assert(
      (this.value >= num) === this.assertTrue,
      `${this.expectString} to be greater than or equal to "${num}".`,
    );
  }

  public lt(num: number) {
    this.assert(
      (this.value < num) === this.assertTrue,
      `${this.expectString} to be less than "${num}".`,
    );
  }

  public lte(num: number) {
    this.assert(
      (this.value <= num) === this.assertTrue,
      `${this.expectString} to be less than or equal to "${num}".`,
    );
  }

  public int() {
    this.assert(
      Number.isInteger(this.value) === this.assertTrue,
      `${this.expectString} to be an "integer".`,
    );
  }

  public btw(min: number, max: number) {
    this.assert(
      (this.value > min && this.value < max) === this.assertTrue,
      `${this.expectString} to be between "${min}" and "${max}".`,
    );
  }

  public finite() {
    this.assert(
      isFinite(this.value) === this.assertTrue,
      `${this.expectString} to be "finite".`,
    );
  }
}
