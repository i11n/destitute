import { equal } from "https://deno.land/std/testing/asserts.ts";
import { IAssertion, IAssertionData } from "../types.ts";
import { AssertionError } from "../AssertionError.ts";

export class BaseAssertion<V = any> implements IAssertion {
  protected _value: V;

  protected _assertTrue: boolean = true;

  /**
   * Returns the asserted value.
   */
  protected get value(): V {
    return this._value;
  }

  /**
   * Returns the flag that determines whether or not the assertion is expected to be true.
   */
  protected get assertTrue(): boolean {
    return this._assertTrue;
  }

  /**
   * Returns the leading string of the message for an AssertionError.
   */
  protected get expectString(): string {
    return `Expected "${this.value}" ${this.assertTrue ? "" : "NOT"}`;
  }

  /**
   * Creates a new instance of the BaseAssertion class, with the asserted value.
   * 
   * @param value The value to assert.
   */
  constructor(value: V) {
    this._value = value;
  }

  /**
   * Asserts that a result of an `assertion` is true, otherwise throws the `message`
   * with optional additional `data`. 
   * 
   * @param assertion The result of an assertion.
   * @param message The message to through it the assertion is `false`.
   * @param data Any additional data to provide to the AssertionError, if thrown.
   */
  protected assert(assertion: boolean, message: string, data?: IAssertionData) {
    if (!assertion) {
      throw new AssertionError(message, data);
    }
  }

  /**
   * Simple chainable property.
   */
  public get is(): this {
    return this;
  }

  /**
   * Simple negating chainable property.
   * 
   * Flips the current expectation of the result of the assertion.
   */
  public get isnt(): this {
    return this.not;
  }

  /**
   * Simple chainable property.
   */
  public get has(): this {
    return this;
  }

  /**
   * Simple chainable property.
   */
  public get have(): this {
    return this;
  }

  /**
   * Simple negating chainable property.
   * 
   * Flips the current expectation of the result of the assertion.
   */
  public get hasnt(): this {
    return this.not;
  }

  /**
   * Simple chainable property.
   */
  public get a(): this {
    return this;
  }

  /**
   * Simple chainable property.
   */
  public get an(): this {
    return this;
  }

  /**
   * Simple chainable property.
   */
  public get does(): this {
    return this;
  }

  /**
   * Simple negating chainable property.
   * 
   * Flips the current expectation of the result of the assertion.
   */
  public get doesnt(): this {
    return this.not;
  }

  /**
   * Simple chainable property.
   */
  public get the(): this {
    return this;
  }

  /**
   * Simple negating chainable property.
   * 
   * Flips the current expectation of the result of the assertion.
   */
  public get no(): this {
    return this.not;
  }

  /**
   * Simple negating chainable property.
   * 
   * Flips the current expectation of the result of the assertion.
   */
  public get not(): this {
    this._assertTrue = !this._assertTrue;

    return this;
  }

  /**
   * Asserts whether the test `value` being `null`, is expected.
   */
  public null() {
    this.assert(
      (this.value === null) === this.assertTrue,
      `${this.expectString} to be "null".`,
    );
  }

  /**
   * Asserts whether the test `value` not being `undefined`, is expected.
   */
  public defined() {
    this.assert(
      (this.value !== undefined) === this.assertTrue,
      `${this.expectString} to be "defined".`,
    );
  }

  /**
   * Asserts whether the test `value` being "truthy", is expected.
   */
  public truthy() {
    this.assert(
      (!!this.value === true) === this.assertTrue,
      `${this.expectString} to be "truthy".`,
    );
  }

  /**
   * Asserts whether the test `value` not being `null` or `undefined`, is expected.
   * 
   * @alias exists
   */
  public exist() {
    this.exists();
  }

  /**
   * Asserts whether the test `value` not being `null` or `undefined`, is expected.
   */
  public exists() {
    this.assert(
      (this.value !== undefined && this.value !== null) === this.assertTrue,
      `${this.expectString} to be "defined".`,
    );
  }

  /**
   * Asserts whether the test `value` being equal to `expected`, is expected.
   * 
   * @alias equalTo
   */
  public equal(expected: unknown) {
    this.equalTo(expected);
  }

  /**
   * Asserts whether the test `value` being equal to `expected`, is expected.
   * 
   * @alias equalTo
   */
  public equals(expected: unknown) {
    this.equalTo(expected);
  }

  /**
   * Asserts whether the test `value` being equal to `expected`, is expected.
   */
  public equalTo(expected: unknown) {
    this.assert(
      equal(this.value, expected) === this.assertTrue,
      `${this.expectString} to equal "${expected}".`,
    );
  }

  /**
   * Returns the value as a string.
   */
  public toString() {
    return String(this.value);
  }
}
