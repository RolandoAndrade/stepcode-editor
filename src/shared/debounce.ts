type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  maxReps: number
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout | null;
  let counter = 0;

  const debouncedFunction: DebouncedFunction<T> = function (
    ...args: Parameters<T>
  ) {
    clearTimeout(timeoutId!);

    if (counter >= maxReps) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      func.apply(this, args);
      counter = 0;
    } else {
      timeoutId = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        func.apply(this, args);
        counter = 0;
      }, delay);
    }

    counter++;
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId!);
    timeoutId = null;
    counter = 0;
  };

  return debouncedFunction;
}