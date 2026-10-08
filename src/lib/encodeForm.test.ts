import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encodeForm } from './encodeForm';

test('joins fields as key=value pairs', () => {
  assert.equal(encodeForm({ 'form-name': 'consultation', firstName: 'Jane' }), 'form-name=consultation&firstName=Jane');
});

test('escapes characters that would break the body', () => {
  assert.equal(
    encodeForm({ email: 'a+b@c.com', message: 'Build X & Y = Z?\nNow' }),
    'email=a%2Bb%40c.com&message=Build%20X%20%26%20Y%20%3D%20Z%3F%0ANow',
  );
});

test('keeps empty fields so optional inputs still arrive', () => {
  assert.equal(encodeForm({ lastName: '' }), 'lastName=');
});
