import { ControlValidationState } from './form.types';

/**
 * A specialized version of a shallow equals. This is intended to be used in a Control's
 * validate function to compare the result of a validation run to a previous state.
 *
 * @param {ControlValidationState} objA
 * @param {ControlValidationState} objB
 * @returns {boolean}
 */
export function validationsEqual(
  objA: ControlValidationState,
  objB: ControlValidationState,
): boolean {
  // they're the same if they're the same object
  if (objA === objB) {
    return true;
  }

  // they're different if they have differing numbers of keys
  const keysA: string[] = Object.keys(objA);
  const keysB: string[] = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  let valid = true;

  // they're different if the key values don't match
  keysA.forEach((key: string) => {
    if (objA[key] !== objB[key]) {
      valid = false;
      return false;
    }
  });

  if (!valid) {
    return false;
  }

  // we have to check this because they may (though unlikely) have the same number of keys
  // but have two keys with different names. This would arise if a parent component changed
  // the validation on a Control for some reason.
  keysB.forEach((key: string) => {
    if (objB[key] !== objA[key]) {
      valid = false;
      return false;
    }
  });

  return valid;
}
