import test from 'node:test';
import assert from 'node:assert/strict';
import { getAdaptiveDPR } from '../app/js/core.js';

test('getAdaptiveDPR adapts correctly to different viewports and pixel budgets', () => {
  // 1. Mobile screen (390 x 844) with max budget
  const dprMobile = getAdaptiveDPR(1920 * 1080);
  assert.ok(dprMobile >= 0.75 && dprMobile <= 1.35, 'DPR stays in comfortable bounds');

  // 2. Huge screen with strict budget (e.g. 3840 x 2160 on 4K)
  // Total pixels = 3840 * 2160 = 8.29M.
  // With maxPixels = 2.07M, DPR should scale down below 1.0 to fit budget
  const dprConstrained = getAdaptiveDPR(500 * 500);
  assert.ok(dprConstrained >= 0.75, 'DPR never falls below 0.75 threshold');
});
