import { BaseAssertion } from "./BaseAssertion.ts";
import { AssertionError } from "../AssertionError.ts";

export class ArrayAssertion<T = any> extends BaseAssertion<Array<T>> {
  
  /**
   * Asserts whether the test `value` having a lenght of `num`, is expected.
   */
  public lengthOf(num: number) {
    this.assert(
      (this.value.length === num) === this.assertTrue,
      `${this.expectString} to have a length of "${num}".`,
    );
  }

  public contain(value: T) {
    this.assert(
      (this.value.indexOf(value) > -1) === this.assertTrue,
      `${this.expectString} to contain an element "${value}".`,
    );
  }

  public containAll(values: T[]) {
    let all = true;
    
    for (let i = 0; i < values.length ; i++) {
      if (this.value.indexOf(values[i]) > -1) {
        continue;
      } else {
        all = false;

        if (this.assertTrue) {
          throw new AssertionError(`${this.expectString} to contain all values [${values.join(",")}]. It did not contain "${values[i]}".`);
        }
      }
    }

    if (!this.assertTrue && all) {
      throw new AssertionError(`${this.expectString} to contain all values [${values.join(",")}].`);
    }
  }

  public include(value: T) {
    this.contain(value);
  }

  public includeAll(values: T[]) {
    this.containAll(values);
  }
  /**
   * Asserts that the elements of the test `value` meets the assertion `callbacks`.
   * 
   * **NOTE: negation is currently not supported. Use negation in the callbacks.**
   * 
   * @param callback The assertion callback to test on the elements.
   */
  public elementsMeet(callback: ((value: T) => void)) {
    for (let i = 0; i < this.value.length; i++) {
      try {
        callback(this.value[i]);
      } catch (e) {
        throw new AssertionError(
          `Expected all elements to the assertion. Failed on element ${i + 1} with message: ${e.message}`,
        );
      }
    }
  }
}
