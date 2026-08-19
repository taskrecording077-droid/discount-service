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

// New: two-code stacking should be additive not compounded
const stacked = applyDiscounts(20000, ['SAVE20', 'SAVE30']) //$200 cart
assert.strictEqual(stacked.totalOffCents, 10000, 'SAVE20 + SAVE30 should be $100.00 off (50%)' )

//New: total stacked discount should be capped at 90%
const capped = applyDiscounts(20000, ['SAVE20', 'SAVE30', 'SAVE40', 'SAVE25']) //sum to 115%
assert.strictEqual(capped.totalOffCents, 18000, 'Four codes should be capped at $180.00')

console.log('PASS: discount smoke tests (does not cover multi-code stacking).');
