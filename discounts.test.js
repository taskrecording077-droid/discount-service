// Existing smoke-test suite. Does NOT cover multi-code stacking -- that's
// the coverage gap that let this bug ship. Stays green before and after
// the fix, matching the "existing tests still pass" step in the script.
const assert = require('assert');
const { applyDiscounts } = require('./discounts');

// Single code applies correctly.
const single = applyDiscounts(10000, ['SAVE20']);
assert.strictEqual(single.totalOffCents, 2000, 'SAVE20 alone should take 20% off');
assert.strictEqual(single.finalCents, 8000);

// No codes leaves the subtotal untouched.
const none = applyDiscounts(5000, []);
assert.strictEqual(none.finalCents, 5000);

// Unknown code is ignored rather than throwing.
const unknown = applyDiscounts(5000, ['NOT_REAL']);
assert.strictEqual(unknown.finalCents, 5000);

console.log('PASS: discount smoke tests (does not cover multi-code stacking).');
