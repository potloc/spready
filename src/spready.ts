type TValueOrCallback<T> = T | (() => T);

function evaluate<T>(valueOrCallback: TValueOrCallback<T>) {
  return valueOrCallback instanceof Function
    ? valueOrCallback()
    : valueOrCallback;
}

export default function spready<T extends object | unknown[]>(
  value: TValueOrCallback<T>
) {
  // NOTE: We change the return type to {} in the case that T is an object in order
  // to avoid a weird Typescript typing issue.
  // Without this, the type of { a: 1, ...[] } would contain all of Array.prototype's methods.
  // Typescript internally uses Object.assign to handle the spread operator in an object literal,
  // which has a known issue with typings: https://github.com/microsoft/TypeScript/issues/9726
  // In short, Typescript does not have a mechanism for knowing which object properties are
  // enumerable or non-enumerable while Object.assign only copies enumerable properties
  const evaluateIf = (condition: unknown) =>
    condition ? evaluate(value) : ([] as T extends unknown[] ? [] : object);

  return {
    if: evaluateIf,
    unless: (condition: unknown) => evaluateIf(!condition),
  };
}
