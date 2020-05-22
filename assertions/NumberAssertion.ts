import { BaseAssertion } from "./BaseAssertion.ts";

export class NumberAssertion extends BaseAssertion<number> {
   
  /**
   * Asserts whether the test `value` being greater than `num`, is expected.
   * 
   * @param num The value to assert `value` is greater than.
   */
  public gt(num: number) {
    this.assert(
      (this.value > num) === this.assertTrue,
      `${this.expectString} to be greater than "${num}".`,
    );
  }

  /**
   * Asserts whether the test `value` being greater than or equal to `num`, is expected.
   * 
   * @param num The value to assert `value` is greater than or equal to.
   */
  public gte(num: number) {
    this.assert(
      (this.value >= num) === this.assertTrue,
      `${this.expectString} to be greater than or equal to "${num}".`,
    );
  }

  /**
   * Asserts whether the test `value` being less than `num`, is expected.
   * 
   * @param num The value to assert `value` is less than.
   */
  public lt(num: number) {
    this.assert(
      (this.value < num) === this.assertTrue,
      `${this.expectString} to be less than "${num}".`,
    );
  }

  /**
   * Asserts whether the test `value` being less than or equal to `num`, is expected.
   * 
   * @param num The value to assert `value` is less than or equal to.
   */
  public lte(num: number) {
    this.assert(
      (this.value <= num) === this.assertTrue,
      `${this.expectString} to be less than or equal to "${num}".`,
    );
  }

  /**
   * Asserts whether the test `value` being an "integer", is expected.
   */
  public int() {
    this.assert(
      Number.isInteger(this.value) === this.assertTrue,
      `${this.expectString} to be an "integer".`,
    );
  }

  /**
   * Asserts whether the test `value` being greater than `min`
   * and less than `max` (exclusive), is expected.
   * 
   * @param min The value to assert `value` is greater than.
   * @param max The value to assert `value` is less than.
   */
  public btw(min: number, max: number) {
    this.assert(
      (this.value > min && this.value < max) === this.assertTrue,
      `${this.expectString} to be between "${min}" and "${max}".`,
    );
  }
  /**
   * Asserts whether the test `value` being greater than `min`
   * and less than `max` (inclusive), is expected.
   * 
   * @param min The value to assert `value` is greater than or equal to.
   * @param max The value to assert `value` is less than or equal to.
   */
  public within(min: number, max: number) {
    this.assert(
      (this.value >= min && this.value <= max) === this.assertTrue,
      `${this.expectString} to be within "${min}" and "${max}".`,
    );
  }

  /**
   * Asserts whether the test `value` being finite, is expected.
   */
  public finite() {
    this.assert(
      isFinite(this.value) === this.assertTrue,
      `${this.expectString} to be "finite".`,
    );
  }
}
