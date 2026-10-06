import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';

import styles from './CodeSnippet.module.css';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);

interface CodeSnippetProps {
  code: string;
  file: string;
  label: string;
}

export function CodeSnippet({ code, file, label }: CodeSnippetProps) {
  const language = file.endsWith('.css') ? 'css' : 'typescript';
  const highlighted = hljs.highlight(code, { language }).value;

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <span className={styles.file}>
          <span className={styles.fileIcon} aria-hidden="true">
            {'</>'}
          </span>
          {file}
        </span>
      </div>
      <div className={styles.viewport} role="region" tabIndex={0} aria-label={label}>
        <div className={styles.gutter} aria-hidden="true">
          {code.split('\n').map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <pre className={styles.code}>
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
}
