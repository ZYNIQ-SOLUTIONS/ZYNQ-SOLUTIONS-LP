import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BRANDS } from './brands';
import { STATS } from './stats';
import { SECTORS } from './sectors';
import { SERVICES } from './services';
import { USE_CASES } from './useCases';
import { STATIONS, SITE, CONTACT_EMAILS, SOCIALS } from './site';

const unique = (ids: string[]) => new Set(ids).size === ids.length;

test('all existing content is carried over', () => {
  assert.equal(BRANDS.length, 8);
  assert.equal(SECTORS.length, 4);
  assert.equal(SERVICES.length, 10);
  assert.equal(USE_CASES.length, 4);
  assert.equal(SOCIALS.length, 8);
  assert.equal(CONTACT_EMAILS.length, 3);
});

test('statistics keep their published values', () => {
  assert.deepEqual(
    STATS.map((s) => `${s.value}${s.suffix}`),
    ['97%', '88%', '3X'],
  );
  for (const s of STATS) assert.ok(s.fill > 0 && s.fill <= 1);
});

test('ids are unique and services are numbered 01 to 10 in order', () => {
  assert.ok(unique(SECTORS.map((s) => s.id)));
  assert.ok(unique(SERVICES.map((s) => s.id)));
  assert.ok(unique(USE_CASES.map((u) => u.id)));
  assert.deepEqual(
    SERVICES.map((s) => s.number),
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
  );
});

test('stations are the five numbered sections', () => {
  assert.deepEqual(
    STATIONS.map((s) => `${s.number}:${s.id}`),
    ['01:output', '02:sectors', '03:services', '04:usecases', '05:consultation'],
  );
});

test('brand is ZYNIQ Studio and contact details are unchanged', () => {
  assert.equal(SITE.name, 'ZYNIQ Studio');
  assert.equal(CONTACT_EMAILS[0], 'contact@zyniq.solutions');
  for (const s of SOCIALS) assert.match(s.href, /^https:\/\//);
});
