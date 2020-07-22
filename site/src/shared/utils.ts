export type DebounceableFunction = (...args: any[]) => void;

/**
 * Apply a debounce to a functions such that it is called at most once every
 * timeout milliseconds.
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
 * Is the given string a valid email address? This test is very permissive as
 * the email spec is itself very permissive.
 * todo: test
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email: string): boolean {
  return /^\w+([.-]?\w+)*@[.\-\w]+/.test(email);
}

/**
 * A generic response handler from any of our own API functions. It is assumed
 * that all response bodies from our API have the form
 * { message: string, data: unknown }
 * todo: test
 *
 * @param {Response} res
 * @returns {Promise<any>} rejected with a mess if response is not ok (300+
 * status) or resolved with body data or {} on success.
 */
export async function handleAPIResponse(res: Response): Promise<any> {
  if (res.body) {
    const body = await res.json();

    if (!res.ok) {
      const msg = body?.message;
      throw new Error(
        `API request failed. ${res.status} ${res.statusText}. ${msg}`,
      );
    }

    return body.data || {};
  }

  if (!res.ok) {
    throw new Error(`API request failed. ${res.status} ${res.statusText}.`);
  }

  return {};
}
