import beater from 'beater';
import * as assert from 'power-assert';

import {
  compileMarkdown,
  parse,
  parseYaml,
  separate
} from '../src/';

const { test } = beater();

test('compileMarkdown', () => {
  const markdown = 'This is my first entry.';
  const html = compileMarkdown(markdown);
  assert(html === '<p>This is my first entry.</p>\n');
});

test('parse', () => {
  const yaml = [
    'layout: post',
    'title: Hello Jekyll',
  ].map((s) => s + '\n').join('');
  const markdown = [
    'This is my first entry.'
  ].map((s) => s + '\n').join('');
  const jekyllMarkdown = `---\n${yaml}---\n${markdown}`;
  const parsed = parse(jekyllMarkdown);
  assert.deepEqual(
    parsed,
    {
      html: '<p>This is my first entry.</p>\n',
      markdown,
      parsedYaml: {
        layout: 'post',
        title: 'Hello Jekyll'
      },
      yaml
    }
  );
});

test('parseYaml', () => {
  const yaml = [
    'layout: post',
    'title: Hello Jekyll',
  ].join('\n');
  const parsed = parseYaml(yaml);
  assert.deepEqual(
    parsed,
    {
      layout: 'post',
      title: 'Hello Jekyll'
    }
  );
});

test('separate', () => {
  const yaml = [
    'layout: post',
    'title: Hello Jekyll',
  ].map((s) => s + '\n').join('');
  const markdown = [
    'This is my first entry.'
  ].map((s) => s + '\n').join('');
  const jekyllMarkdown = `---\n${yaml}---\n${markdown}`;
  const separated = separate(jekyllMarkdown);
  assert.deepEqual(separated, { markdown, yaml });
});

test('separate 2', () => {
  const yaml = [
    'layout: post',
    'title: Hello Jekyll',
  ].map((s) => s + '\n').join('');
  const markdown = [
    'This is my first entry.',
    '---',
    'Hello',
    '---',
    'World'
  ].map((s) => s + '\n').join('');
  const jekyllMarkdown = `---\n${yaml}---\n${markdown}`;
  const separated = separate(jekyllMarkdown);
  assert.deepEqual(separated, { markdown, yaml });
});
