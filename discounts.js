// Checkout discount stacking.
//
// Intended rule: each applied code's percentage is calculated against the
// ORIGINAL subtotal and summed (additive), with the total capped at 90%
// off. Example: SAVE20 + SAVE30 on a $200 cart = 50% off = $100 off.

const CODES = {
  SAVE10: 0.10,
  SAVE20: 0.20,
  SAVE30: 0.30,
  SAVE25: 0.25,
  SAVE40: 0.40,
};

function applyDiscounts(subtotalCents, codes) {
  // BUG: this compounds each discount onto the already-discounted running
  // total instead of summing percentages against the original subtotal.
  // SAVE20 + SAVE30 on $200 should be 50% off ($100 off), but compounding
  // gives 1 * 0.80 * 0.70 = 0.56 remaining -> only 44% off.
  let pctSum = 0;
  for (const code of codes) {
    const pct = CODES[code];
    if (pct == null) continue;
    pctSum += pct;
  }
  pctSum = Math.min(pctSum, 0.90);

  const totalOffCents = Math.round(subtotalCents * pctSum);

  return {
    subtotalCents,
    codes,
    totalOffCents,
    finalCents: subtotalCents - totalOffCents,
  };
}

module.exports = { applyDiscounts, CODES };
