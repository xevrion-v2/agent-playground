'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { slugify } = require('../src/utils/slugify');

test('slugify converts plain text to url friendly slugs', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
  assert.equal(slugify('  Multiple   Spaces  '), 'multiple-spaces');
});

test('slugify removes special characters', () => {
  assert.equal(slugify('TaskFlow: Teams & Projects!'), 'taskflow-teams-projects');
  assert.equal(slugify('Save 50% now'), 'save-50-now');
});

test('slugify handles accents and repeated separators', () => {
  assert.equal(slugify('Creme brulee roadmap'), 'creme-brulee-roadmap');
  assert.equal(slugify('alpha---beta___gamma'), 'alpha-beta-gamma');
});

test('slugify handles empty and missing values gracefully', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('   '), '');
  assert.equal(slugify(null), '');
  assert.equal(slugify(undefined), '');
});
