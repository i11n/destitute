import { BaseAssertion } from "./BaseAssertion.ts";

/**
 * An assertion class that tests arrays.
 */
export class ArrayAssertion<T = any> extends BaseAssertion<Array<T>> {
  /**
   * Asserts whether the test value having a length of `num` is expected.
   * 
   * **Example**
   * ```ts
   * const test = Destitute.AssertThat(["hello", "world"]);
   * 
   * test.has.a.lengthOf(2);
   * // ^ Okay
   * test.does.not.have.lengthOf(5);
   * // ^ Okay
   * test.has.a.lengthOf(3);
   * // ^ Error!
   * test.does.not.have.a.lengthOf(2);
   * // ^ Error!
   * ```
   * 
   * @param length The expected `length` of the test value.
   */
  public lengthOf(length: number) {
    this.assert(
      (this.value.length === length) === this.assertTrue,
      `${this.expectString} to have a length of "${length}".`,
    );
  }

  /**
   * Asserts whether the test value containing the element `value` is expected.
   * 
   * ```ts
   * const test = Destitute.AssertThat(["hello", "world"]);
   * 
   * test.does.contain("hello");
   * // ^ Okay
   * test.does.not.contain("goodbye");
   * // ^ Okay
   * test.does.contain("goodbye");
   * // ^ Error!
   * test.does.not.contain("world");
   * // ^ Error!
   * ```
   * 
   * @param value A value that is expected to be elements of the test value.
   */
  public contain(value: T) {
    this.assert(
      (this.value.indexOf(value) > -1) === this.assertTrue,
      `${this.expectString} to contain an element "${value}".`,
    );
  }

  /**
   * Asserts whether the test value containing all of the elements `values` is expected.
   * 
   * > This assertion tests whether ALL of the elements provided are in the array. 
   * > For checking if ANY of the elements are in the array, check out the 
   * > [[ArrayAssertion.containAny | containAny assertion]].
   * 
   * **Example**
   * ```ts
   * const test = Destitute.AssertThat(["hello", "world", "!"]);
   * 
   * test.does.containAll(["hello", "!"]);
   * // ^ Okay
   * test.does.not.containAll(["goodbye", "!"]);
   * // ^ Okay
   * test.does.containAll(["goodbye", "world"]);
   * // ^ Error!
   * ```
   * 
   * @param values The values that are expected to be elements of the test value.
   */
  public containAll(values: T[]) {
    let all = true;

    for (let i = 0; i < values.length; i++) {
      if (this.value.indexOf(values[i]) > -1) {
        continue;
      } else {
        all = false;

        if (this.assertTrue) {
          this.fail(
            `${this.expectString} to contain all values [${
              values.join(",")
            }]. It did not contain "${values[i]}".`,
          );
        }
      }
    }

    if (!this.assertTrue && all) {
      this.fail(
        `${this.expectString} to contain all values [${values.join(",")}].`,
      );
    }
  }

  /**
   * Asserts whether the test value including the element `value` is expected.
   * 
   * ```ts
   * const test = Destitute.AssertThat(["hello", "world"]);
   * 
   * test.does.include("hello");
   * // ^ Okay
   * test.does.not.include("goodbye");
   * // ^ Okay
   * test.does.include("goodbye");
   * // ^ Error!
   * test.does.not.include("world");
   * // ^ Error!
   * ```
   * 
   * @param value A value that is expected to be elements of the test value.
   */
  public include(value: T) {
    this.contain(value);
  }

  /**
   * Asserts whether the test value including all of the elements `values` is expected.
   * 
   * > This assertion tests whether ALL of the elements provided are in the array. 
   * > For checking if ANY of the elements are in the array, check out the 
   * > [[ArrayAssertion.includeAny | includeAny assertion]].
   * 
   * **Example**
   * ```ts
   * const test = Destitute.AssertThat(["hello", "world", "!"]);
   * 
   * test.does.includeAll(["hello", "!"]);
   * // ^ Okay
   * test.does.not.includeAll(["goodbye", "!"]);
   * // ^ Okay
   * test.does.includeAll(["goodbye", "world"]);
   * // ^ Error!
   * ```
   * 
   * @param values The values that are expected to be elements of the test value.
   */
  public includeAll(values: T[]) {
    this.containAll(values);
  }

  public containAny(values: T[]) {
    this.fail("Not implemented");
  }

  public includeAny(values: T[]) {
    this.fail("Not implemented");
  }

  /**
   * Asserts that the elements of the test value meets the assertion `callbacks`.
   * 
   * **NOTE: negation is currently not supported. Use negation in the callbacks.**
   * 
   * **Example**
   * ```ts
   * const test = Destitute.AssertThat(["hello", "world", "cruel"]);
   * 
   * test.elementsMeet(el => {
   *  Destitute.AssertThat(el).contains("l");
   * });
   * // ^ Okay
   * test.elementsMeet(el => {
   *  Destitute.AssertThat(el).meetsAll(
   *    it => it.does.match(/\D/),
   *    it => it.has.lengthOf(5),
   *  );
   * });
   * // ^ Okay
   * test.elementsMeet(el => {
   *  Destitute.AssertThat(el).meetsAll(
   *    it => it.does.contain("o"),
   *  );
   * });
   * // ^ Error!
   * ```
   * 
   * @param callback The assertion callback to test on the elements.
   */
  public elementsMeet(callback: ((value: T) => void)) {
    for (let i = 0; i < this.value.length; i++) {
      try {
        callback(this.value[i]);
      } catch (e) {
        this.fail(
          `Expected all elements to the assertion. Failed on element ${i +
            1} with message: ${e.message}`,
        );
      }
    }
  }
}
