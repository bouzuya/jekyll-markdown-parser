import { safeLoad } from 'js-yaml';
import marked from 'marked';

export interface Options {
  compileMarkdownOptions: any;
}

const separate = (
  jekyllMarkdown: string
): {
  markdown: string;
  yaml: string;
} => {
  const re = new RegExp('^---s*$\r?\n', 'm');
  const m1 = jekyllMarkdown.match(re); // first separator
  if (m1 === null) return { markdown: jekyllMarkdown, yaml: '' };
  const s1 = jekyllMarkdown.substring(m1.index! + m1[0].length);
  const m2 = s1.match(re); // second separator
  if (m2 === null) return { markdown: jekyllMarkdown, yaml: '' };
  const yaml = s1.substring(0, m2.index);
  const markdown = s1.substring(m2.index! + m2[0].length);
  return { markdown, yaml };
};

const compileMarkdown = (markdown: string, options?: any): string => {
  return marked(markdown, options);
};

const parseYaml = (yaml: string): any => {
  return safeLoad(yaml);
};

const parse = (
  jekyllMarkdown: string,
  options?: Partial<Options>
): {
  html: string;
  yaml: string;
  parsedYaml: any;
  markdown: string;
} => {
  const { yaml, markdown } = separate(jekyllMarkdown);
  const parsedYaml = parseYaml(yaml);
  const compileMarkdownOptions =
    typeof options === 'undefined' ? void 0 : options.compileMarkdownOptions;
  const html = compileMarkdown(markdown, compileMarkdownOptions);
  return { html, markdown, parsedYaml, yaml };
};

export { compileMarkdown, parse, parseYaml, separate };
