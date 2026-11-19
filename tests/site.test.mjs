import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../src/script.js', import.meta.url), 'utf8');

test('document declares a language and viewport', () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport"/);
});

test('front camera is the default camera request', () => {
  assert.match(script, /startCamera\("user"\)/);
  assert.match(script, /facingMode:\s*\{\s*ideal:\s*facing\s*\}/);
});

test('payment handoff requires a UPI URI and a valid VPA', () => {
  assert.match(script, /uri\.protocol\.toLowerCase\(\) !== "upi:"/);
  assert.match(script, /const validVpa =/);
  assert.match(script, /if \(!d \|\| !d\.validVpa\)/);
});

test('camera stream is stopped when the page is hidden', () => {
  assert.match(script, /window\.addEventListener\("pagehide", stopCamera\)/);
});

test('payment safety guidance is present', () => {
  assert.match(html, /verify the recipient and amount/i);
  assert.match(html, /does not process payments/i);
});

test('preferred payment app selection and local persistence are wired', () => {
  assert.match(html, /id="paymentModal"/);
  assert.match(html, /id="rememberPaymentApp"/);
  assert.match(script, /frontpay\.preferredPaymentApp/);
  assert.match(script, /function getPreferredApp\(/);
  assert.match(script, /function openPaymentChooser\(/);
  assert.match(script, /if \(preferred\) openPaymentApp\(preferred\); else openPaymentChooser\(\)/);
  assert.match(script, /if \(\$\("rememberPaymentApp"\)\.checked\) savePreferredApp\(app\)/);
});
