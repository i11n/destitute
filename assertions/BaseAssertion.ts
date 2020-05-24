import { assertEquals } from "../deps.ts";
import { AssertionException } from "../exceptions/AssertionException.ts";
import { IExceptionData } from "../exceptions/IExceptionData.ts";
import { IConstructor } from "../util/types.ts";

export class BaseAssertion<V = any> {
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
   * Returns the leading string of the message for an AssertionException.
   */
  protected get expectString(): string {
    if (typeof this.value === "object" && !!this.value) {
      return `Expected "${(this.value as Object).constructor.name}"${this.assertTrue ? "" : " NOT"}`;
    }

    if (typeof this.value === "function") {
      return `Expected "function ${this.value.name}(){[omitted]}"${this.assertTrue ? "" : " NOT"}`;
    }

    return `Expected "${this.value}"${this.assertTrue ? "" : " NOT"}`;
  }

  /**
   * Creates a new instance of the BaseAssertion class, with the asserted value.
   * 
   * @param value The value to assert.
   */
  constructor(value?: V) {
    this._value = value as V;
  }

  /**
   * Asserts that a result of an `assertion` is true, otherwise throws the `message`
   * with optional additional `data`. 
   * 
   * @param assertion The result of an assertion.
   * @param message The message to through it the assertion is `false`.
   * @param data Any additional data to provide to the AssertionException, if thrown.
   */
  protected assert(assertion: boolean, message: string, data?: IExceptionData) {
    if (!assertion) {
      this.fail(message, data);
    }
  }

  protected fail(message: string, data?: IExceptionData) {
    throw new AssertionException(message, data);
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
      `${this.expectString} to be a value other than "undefined" or "null".`,
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
    let expectedValue = `${expected}`;
    
    if (typeof expected === "object" && !!expected) {
      expectedValue =  (expected as Object).constructor.name;
    }

    if (typeof expected === "function") {
      expectedValue = `function() ${expected.name}{[omitted]}`;
    }

    try {
      assertEquals(this.value, expected);
    } catch (e) {
      if (this.assertTrue) {
        this.fail(`${this.expectString} to equal "${expectedValue}". ${e.message}`);
      }
    }
    if (!this.assertTrue) {
      this.fail(`${this.expectString} to equal "${expected}".`);
    }
  }

  /**
   * Asserts that the test `value` meets all of the assertion `callbacks`.
   * 
   * **NOTE: negation is currently not supported. Use negation in the callbacks.**
   * 
   * @param callbacks The assertion callback to test.
   */
  public meetsAll(...callbacks: ((assertable: this) => void)[]) {
    const ctor = this.constructor as IConstructor<this>;
    
    for (let i = 0; i < callbacks.length; i++) {
      try {
        callbacks[i](new ctor(this.value));
      } catch (e) {
        throw new AssertionException(
          `${this.expectString} to meet all assertions. Failed on assertion ${i +
            1} with message: ${e.message}`,
        );
      }
    }
  }

  /**
   * Asserts that the test `value` meets any of the assertion `callbacks`.
   * 
   * **NOTE: negation is currently not supported. Use negation in the callbacks.**
   * 
   * @param callbacks The assertion callback to test.
   */
  public meetsAny(...callbacks: ((assertable: this) => void)[]) {
    let foundOne = false;
    const ctor = this.constructor as IConstructor<this>;

    for (let i = 0; i < callbacks.length; i++) {
      try {
        callbacks[i](new ctor(this.value));

        foundOne = true;

        break;
      } catch (e) {
        continue;
      }
    }

    if (!foundOne) {
      throw new AssertionException(
        `${this.expectString} to meet at least one assertion.`,
      );
    }
  }

  /**
   * Returns the value as a string.
   */
  public toString() {
    return String(this.value);
  }
}
