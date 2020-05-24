const TEST_TRACKING: any[] = [];

export const start = () => TEST_TRACKING.push(null);

export const end = () => TEST_TRACKING.pop();

export const getLabel = (label: string): string => {
  if (!TEST_TRACKING.length) {
    return label;
  }

  return `└ ${label}`.padStart(TEST_TRACKING.length * 2);
}