import { start, end, getLabel } from "./TestSuiteTracking.ts";

export function TestSuite(label: string, callback: () => void) {
  console.log('\x1b[36m%s\x1b[0m', getLabel(label));
  start();
  callback();
  end();
}