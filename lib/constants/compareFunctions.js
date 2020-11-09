const COMPARE_FUNCTIONS = {
  toBe: (received, expects) => received !== expects,
  toEqual: (received, expects) =>
    JSON.stringify(received) !== JSON.stringify(expects),
  lengthOf: (received, expects) => received.length !== expects,
  toBeGreaterThan: (received, expects) => received > expects,
  toBeGreaterThanOrEqual: (received, expects) => received >= expects,
  toBeLessThan: (received, expects) => received < expects,
  toBeLessThanOrEqual: (received, expects) => received <= expects,
  toBeFalsy: (received) => !!received,
  toBeTruthy: (received) => !!!received
}

const COMPARE_FUNCTIONS_KEYS = Object.keys(COMPARE_FUNCTIONS)

module.exports = { COMPARE_FUNCTIONS, COMPARE_FUNCTIONS_KEYS }
