export interface IConstructor<T> {
  new(...args: any[]): T;
}

export interface IAssertion {
  
}

export interface IAssertionData {
  actual: any;
  expected: any;
  [key: string]: any;
}