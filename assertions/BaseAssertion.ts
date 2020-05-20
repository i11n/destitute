import { equal } from "https://deno.land/std/testing/asserts.ts";
import { IAssertion, IAssertionData } from "../types.ts";
import { AssertionError } from "../AssertionError.ts";

export class BaseAssertion<V = any> implements IAssertion {
  protected _value: V;

  protected _assertTrue: boolean = true;

  protected get value(): V {
    return this._value;
  }

  protected get assertTrue(): boolean {
    return this._assertTrue;
  }

  protected get expectString(): string {
    return `Expected "${this.value}" ${this.assertTrue ? "" : "NOT"}`;
  }

  constructor(value: V) {
    this._value = value;
  }

  protected assert(assertion: boolean, message: string, data?: IAssertionData) {
    if (!assertion) {
      throw new AssertionError(message, data);
    }
  }

  public get is(): this {
    return this;
  }

  public get isnt(): this {
    this._assertTrue = false;
    return this;
  }

  public get has(): this {
    return this;
  }

  public get have(): this {
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

  public get does(): this {
    this._assertTrue = true;
    return this;
  }

  public get doesnt(): this {
    this._assertTrue = false;
    return this;
  }

  public get the(): this {
    return this;
  }

  public get no(): this {
    this._assertTrue = false;
    return this;
  }

  public get not(): this {
    this._assertTrue = !this._assertTrue;

    return this;
  }

  public null() {
    this.assert(
      (this.value === null) === this.assertTrue,
      `${this.expectString} to be "null".`,
    );
  }

  public defined() {
    this.assert(
      (this.value !== undefined) === this.assertTrue,
      `${this.expectString} to be "defined".`,
    );
  }

  public truthy() {
    this.assert(
      (!!this.value === true) === this.assertTrue,
      `${this.expectString} to be "truthy".`,
    );
  }

  public exist() {
    this.exists();
  }

  public exists() {
    this.assert(
      (this.value !== undefined && this.value !== null) === this.assertTrue,
      `${this.expectString} to be "defined".`,
    );
  }

  public equal(value: unknown) {
    this.equalTo(value);
  }

  public equals(value: unknown) {
    this.equalTo(value);
  }

  public equalTo(value: unknown) {
    this.assert(
      equal(this.value, value) === this.assertTrue,
      `${this.expectString} to equal "${value}".`,
    );
  }

  public toString() {
    return String(this.value);
  }
}
