import { globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTypescript,
  // Static navigation uses native anchors and preserves same-page campaign URLs.
  { rules: { '@next/next/no-html-link-for-pages': 'off' } },
  globalIgnores(['.next/**', 'out/**', 'next-env.d.ts']),
];

export default config;
