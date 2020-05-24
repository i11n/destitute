import { AssertThat as BaseAssertThat } from "./core/AssertThat.ts";
import { AssertionRouter as BaseAssertionRouter } from "./core/AssertionRouter.ts";
import { TestSuite as BaseTestSuite } from "./core/TestSuite.ts";
import { AssertionException as BaseAssertionException } from "./exceptions/AssertionException.ts";
import { Assertions as BaseAssertions } from "./assertions/mod.ts";
import { FunctionSpy as BaseFunctionSpy } from "./util/FunctionSpy.ts";

export namespace Destitute {
  export const version: string = "v0.1.0";

  export const AssertThat = BaseAssertThat;

  export const TestSuite = BaseTestSuite;

  export const Test = Deno.test;

  export function AssertArray<T = any>(
    value?: any,
  ): BaseAssertions.ArrayAssertion<T> {
    return new BaseAssertions.ArrayAssertion<T>(value);
  }

  export function AssertAsyncFunction(
    value?: any,
  ): BaseAssertions.AsyncFunctionAssertion {
    return new BaseAssertions.AsyncFunctionAssertion(value);
  }

  export function AssertAny(value?: any): BaseAssertions.BaseAssertion {
    return new BaseAssertions.BaseAssertion(value);
  }

  export function AssertBoolean(value?: any): BaseAssertions.BooleanAssertion {
    return new BaseAssertions.BooleanAssertion(value);
  }

  export function AssertFunction(
    value?: any,
  ): BaseAssertions.FunctionAssertion {
    return new BaseAssertions.FunctionAssertion(value);
  }

  export function AssertFunctionSpy(
    value?: any,
  ): BaseAssertions.FunctionSpyAssertion {
    return new BaseAssertions.FunctionSpyAssertion(value);
  }

  export function AssertMap(value?: any): BaseAssertions.MapAssertion {
    return new BaseAssertions.MapAssertion(value);
  }

  export function AssertNumber(value?: any): BaseAssertions.NumberAssertion {
    return new BaseAssertions.NumberAssertion(value);
  }

  export function AssertObject(value?: any): BaseAssertions.ObjectAssertion {
    return new BaseAssertions.ObjectAssertion(value);
  }

  export function AssertSet(value?: any): BaseAssertions.SetAssertion {
    return new BaseAssertions.SetAssertion(value);
  }

  export function AssertString(value?: any): BaseAssertions.StringAssertion {
    return new BaseAssertions.StringAssertion(value);
  }

  export namespace Suite {

  }

  export namespace Exceptions {
    export class AssertionException extends BaseAssertionException {}
  }

  export namespace AssertionRouter {
    export const addRoute = BaseAssertionRouter.addRoute;
    export const setRoute = BaseAssertionRouter.setRoute;
    export const matchRoute = BaseAssertionRouter.matchRoute;
  }

  export namespace Assertions {
    export class ArrayAssertion<T = any>
      extends BaseAssertions.ArrayAssertion<T> {}
    export class AsyncFunctionAssertion
      extends BaseAssertions.AsyncFunctionAssertion {}
    export class BaseAssertion extends BaseAssertions.BaseAssertion {}
    export class BooleanAssertion extends BaseAssertions.BooleanAssertion {}
    export class FunctionAssertion extends BaseAssertions.FunctionAssertion {}
    export class FunctionSpyAssertion
      extends BaseAssertions.FunctionSpyAssertion {}
    export class MapAssertion extends BaseAssertions.MapAssertion {}
    export class NumberAssertion extends BaseAssertions.NumberAssertion {}
    export class ObjectAssertion extends BaseAssertions.ObjectAssertion {}
    export class SetAssertion extends BaseAssertions.SetAssertion {}
    export class StringAssertion extends BaseAssertions.StringAssertion {}
  }

  export namespace Util {
    export class FunctionSpy extends BaseFunctionSpy {}
  }
}
