import { ArrayAssertion as BaseArrayAssertion } from "./ArrayAssertion.ts";
import { AsyncFunctionAssertion as BaseAsyncFunctionAssertion } from "./AsyncFunctionAssertion.ts";
import { BaseAssertion as BaseBaseAssertion } from "./BaseAssertion.ts";
import { BooleanAssertion as BaseBooleanAssertion } from "./BooleanAssertion.ts";
import { FunctionAssertion as BaseFunctionAssertion } from "./FunctionAssertion.ts";
import { FunctionSpyAssertion as BaseFunctionSpyAssertion } from "./FunctionSpyAssertion.ts";
import { MapAssertion as BaseMapAssertion } from "./MapAssertion.ts";
import { NumberAssertion as BaseNumberAssertion } from "./NumberAssertion.ts";
import { ObjectAssertion as BaseObjectAssertion } from "./ObjectAssertion.ts";
import { SetAssertion as BaseSetAssertion } from "./SetAssertion.ts";
import { StringAssertion as BaseStringAssertion } from "./StringAssertion.ts";

export module Assertions {
  export class ArrayAssertion<T = any> extends BaseArrayAssertion<T> {}
  export class AsyncFunctionAssertion extends BaseAsyncFunctionAssertion {}
  export class BaseAssertion<T = any> extends BaseBaseAssertion<T> {}
  export class BooleanAssertion extends BaseBooleanAssertion {}
  export class FunctionAssertion extends BaseFunctionAssertion {}
  export class FunctionSpyAssertion extends BaseFunctionSpyAssertion {}
  export class MapAssertion extends BaseMapAssertion {}
  export class NumberAssertion extends BaseNumberAssertion {}
  export class ObjectAssertion extends BaseObjectAssertion {}
  export class SetAssertion extends BaseSetAssertion {}
  export class StringAssertion extends BaseStringAssertion {}
}
