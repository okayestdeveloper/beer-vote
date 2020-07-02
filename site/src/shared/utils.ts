export type DebounceableFunction = (...args: any[]) => void;

/**
 * Apply a debounce to a functions such that it is called at most once every timeout milliseconds.
 * note: I have yet to discover a way to make this work with HTML events due to react's event pooling
 * todo: test
 *
 * @param {F extends DebounceableFunction} fn
 * @param {number} timeout
 * @returns {(this: ThisParameterType<F>, ...args: Parameters<F>) => void}
 */
export function debounce<F extends DebounceableFunction>(
  fn: F,
  timeout: number,
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timerId: number | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;
    const params = [...args];
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }

    timerId = window.setTimeout(() => {
      timerId = null;
      fn.apply(context, params);
    }, timeout);
  };
}

/**
 * Is the given string a valid email address? This test is very permissive as the email spec is itself very permissive.
 * todo: test
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email: string): boolean {
  return /^\w+([.-]?\w+)*@[.\-\w]+/.test(email);
}
