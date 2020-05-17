import { IAssertion, IAssertionData } from "../types.ts";
import { AssertionError } from "../AssertionError.ts";

export class BaseAssertion<V> implements IAssertion {
  protected _value: V;

  protected _assertTrue: boolean = true;

  constructor(value: V) {
    this._value = value;
  }

  public get is(): this {
    this._assertTrue = true;
    return this;
  }

  public get isnt(): this {
    this._assertTrue = false;
    return this;
  }

  public get has(): this {
    this._assertTrue = true;
    return this;
  }

  public get hasnt(): this {
    this._assertTrue = true;
    return this;
  }

  public get a(): this {
    return this;
  }

  public get an(): this {
    return this;
  }

  public get the(): this {
    return this;
  }

  public get no(): this {
    this._assertTrue = false;
    return this;
  }

  public get does(): this {
    this._assertTrue = true;
    return this;
  }

  public get doesnt(): this {
    this._assertTrue = false;
    return this;
  }

  public get value(): V {
    return this._value;
  }

  public get assertTrue(): boolean {
    return this._assertTrue;
  }

  public get not(): this {
    this._assertTrue = !this._assertTrue;

    return this;
  }

  protected assert(assertion: boolean, message: string, data?: IAssertionData) {
    if (!assertion) {
      throw new AssertionError(message, data);
    }
  }
  
  public null() {
    this.assert(
      (this.value === null) === this.assertTrue,
      `Expected ${this}${this.assertTrue ? " " : " not "}to be "null".`,
    );
  }

  public defined() {
    this.assert(
      (this.value !== undefined) === this.assertTrue,
      `Expected ${this}${this.assertTrue ? " " : " not "}to be defined.`,
    );
  }

  public truthy() {
    this.assert(
      (!!this.value === true) === this.assertTrue,
      `Expected ${this}${this.assertTrue ? " " : " not "}to be defined.`,
    );
  }

  public exists() {
    this.assert(
      (this.value !== undefined && this.value !== null) === this.assertTrue,
      `Expected ${this}${this.assertTrue ? " " : " not "}to be defined.`,
    );
  }

  public exist() {
    this.exists();
  }

  toString() {
    return String(this.value);
  }
}