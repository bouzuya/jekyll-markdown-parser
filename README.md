# jekyll-markdown-parser

**DEPRECATED: Use [npm:front-matter][] and [npm:marked][] instead.**

A [Jekyll](https://jekyllrb.com/) Markdown parser using TypeScript.

## Installation

```
$ npm install jekyll-markdown-parser
```

## Usage

```ts
import * as assert from 'assert';
import { parse } from 'jekyll-markdown-parser';

const jekyllMarkdown = [
  '---',
  'layout: post',
  'title: Hello Jekyll',
  '---',
  'This is my first entry.',
].join('\n');
assert.deepEqual(parse(jekyllMarkdown), {
  html: '<p>This is my first entry.</p>\n',
  markdown: 'This is my first entry.',
  parsedYaml: {
    layout: 'post',
    title: 'Hello Jekyll',
  },
  yaml: 'layout: post\ntitle: Hello Jekyll\n',
});
```

or use `compileMarkdown` / `parseYaml` / `separate`. See [`test/index.ts`](test/index.ts).

## Badges

[![npm version][npm-badge-url]][npm-url]
[![Travis CI][travisci-badge-url]][travisci-url]

[npm-badge-url]: https://img.shields.io/npm/v/jekyll-markdown-parser.svg
[npm-url]: https://www.npmjs.com/package/jekyll-markdown-parser
[travisci-badge-url]: https://img.shields.io/travis/bouzuya/jekyll-markdown-parser.svg
[travisci-url]: https://travis-ci.org/bouzuya/jekyll-markdown-parser

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net

## Alternatives

- [npm:front-matter][]
- [npm:gray-matter][]

[npm:front-matter]: https://www.npmjs.com/package/front-matter
[npm:gray-matter]: https://www.npmjs.com/package/gray-matter
[npm:marked]: https://www.npmjs.com/package/marked
