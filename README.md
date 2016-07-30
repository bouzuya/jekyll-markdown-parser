# jekyll-markdown-parser

A [Jekyll](https://jekyllrb.com/) Markdown parser using TypeScript.

## Usage

```ts
import * as assert from 'assert';
import { parse } from 'jekyll-markdown-parser';

const jekyllMarkdown = [
  '---',
  'layout: post',
  'title: Hello Jekyll',
  '---',
  'This is my first entry.'
].join('\n');
assert.deepEqual(
  parse(jekyllMarkdown),
  {
    html: '<p>This is my first entry.</p>\n',
    markdown: 'This is my first entry.',
    parsedYaml: {
      layout: 'post',
      title: 'Hello Jekyll'
    },
    yaml: 'layout: post\ntitle: Hello Jekyll\n'
  }
);
```

or use `compileMarkdown` / `parseYaml` / `separate`. See [`test/index.ts`](test/index.ts).

## Badges

[![Travis CI][travisci-badge-url]][travisci-url]

[travisci-badge-url]: https://travis-ci.org/bouzuya/jekyll-markdown-parser.svg?branch=master
[travisci-url]: https://travis-ci.org/bouzuya/jekyll-markdown-parser

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
