import { safeLoad } from 'js-yaml';
import * as marked from 'marked';

const separate = (jekyllMarkdown: string): {
  markdown: string;
  yaml: string;
} => {
  const re = new RegExp('^---\s*$\n', 'm');
  const parsed = jekyllMarkdown.split(re);
  const yaml = parsed[1];
  const markdown = parsed[2];
  return { markdown, yaml };
};

const compileMarkdown = (markdown: string): string => {
  return marked(markdown);
};

const parseYaml = (yaml: string): any => {
  return safeLoad(yaml);
};

const parse = (jekyllMarkdown: string): {
  html: string;
  yaml: string;
  parsedYaml: any;
  markdown: string;
} => {
  const { yaml, markdown } = separate(jekyllMarkdown);
  const parsedYaml = parseYaml(yaml);
  const html = compileMarkdown(markdown);
  return { html, markdown, parsedYaml, yaml };
};

export { compileMarkdown, parse, parseYaml, separate };
