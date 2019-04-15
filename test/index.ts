import { Test, run, test } from 'beater';
import assert from 'power-assert';

import {
  compileMarkdown,
  parse,
  parseYaml,
  separate
} from '../src/';

const tests1: Test[] = [
  test('compileMarkdown', () => {
    const markdown = 'This is my first entry.';
    const html = compileMarkdown(markdown);
    assert(html === '<p>This is my first entry.</p>\n');
  }),

  test('compileMarkdown with options', () => {
    const markdown = 'http://example.com';
    const html = compileMarkdown(markdown, { gfm: true });
    assert(html === '<p><a href=\"http://example.com\">http://example.com</a></p>\n');
    const htmlNoGfm = compileMarkdown(markdown, { gfm: false });
    assert(htmlNoGfm === '<p>http://example.com</p>\n');
  }),

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
  }),

  test('parse with options', () => {
    const yaml = [
      'layout: post',
      'title: Hello Jekyll',
    ].map((s) => s + '\n').join('');
    const markdown = [
      'http://example.com'
    ].map((s) => s + '\n').join('');
    const jekyllMarkdown = `---\n${yaml}---\n${markdown}`;
    const parsed = parse(jekyllMarkdown, { compileMarkdownOptions: { gfm: true } });
    assert.deepEqual(
      parsed,
      {
        html: '<p><a href=\"http://example.com\">http://example.com</a></p>\n',
        markdown,
        parsedYaml: {
          layout: 'post',
          title: 'Hello Jekyll'
        },
        yaml
      }
    );
  }),

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
  }),

  test('separate', () => {
    const ls = '\n';
    const yaml = [
      'layout: post',
      'title: Hello Jekyll',
    ].map((s) => s + ls).join('');
    const markdown = [
      'This is my first entry.'
    ].map((s) => s + ls).join('');
    const jekyllMarkdown = `---${ls}${yaml}---${ls}${markdown}`;
    const separated = separate(jekyllMarkdown);
    assert.deepEqual(separated, { markdown, yaml });
  }),

  test('separate (windows)', () => {
    const ls = '\r\n';
    const yaml = [
      'layout: post',
      'title: Hello Jekyll',
    ].map((s) => s + ls).join('');
    const markdown = [
      'This is my first entry.'
    ].map((s) => s + ls).join('');
    const jekyllMarkdown = `---${ls}${yaml}---${ls}${markdown}`;
    const separated = separate(jekyllMarkdown);
    assert.deepEqual(separated, { markdown, yaml });
  }),

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
  })
];

run(tests1).catch(() => process.exit(1));
