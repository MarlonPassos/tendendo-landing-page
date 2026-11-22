import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../out/${path}`, import.meta.url), 'utf8');
const home = () => read('index.html');

test('exporta a página completa e seus destinos internos', () => {
  const html = home();
  assert.match(html, /lang="pt-BR"/);
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1);
  for (const id of ['grupos', 'como-funciona', 'sobre']) {
    assert.ok(html.includes(`id="${id}"`));
    assert.match(html, new RegExp(`href="/?#${id}"`));
  }
  assert.equal([...html.matchAll(/href="#grupos"/g)].length, 4);
  for (const route of ['politica-de-privacidade', 'termos-de-uso', 'links-de-afiliados']) {
    assert.ok(html.includes(`href="/${route}/"`));
    assert.match(read(`${route}/index.html`), /revisão jurídica/);
    assert.ok(read('sitemap.xml').includes(`/${route}/`));
  }
  assert.match(read('robots.txt'), /sitemap\.xml/);
});

test('exporta os cinco convites exatos com abertura segura', () => {
  const html = home();
  const expected = [
    ['radar-de-ofertas', 'Hv6LSL0y0Z04ZODzvAlgPd'],
    ['tecnologia', 'CC4v27uoukuKeyEIAeOn57'],
    ['esportes-e-fitness', 'ECCm9RHJNF04smRSx66cC0'],
    ['escolar-e-pedagogico', 'BQNHvawkTSFF9JZKnppy7u'],
    ['casa-e-estilo', 'CygPqiCg21kFtgQZ7xB5LK'],
  ];
  const links = [...html.matchAll(/<a\b[^>]*data-group-id="[^"]+"[^>]*>/g)].map(match => match[0]);
  assert.equal(links.length, expected.length);
  for (const [index, [id, invite]] of expected.entries()) {
    assert.ok(links[index].includes(`data-group-id="${id}"`));
    assert.ok(links[index].includes(`href="https://chat.whatsapp.com/${invite}"`));
    assert.ok(links[index].includes('target="_blank"'));
    assert.ok(links[index].includes('rel="noopener noreferrer"'));
  }
});
