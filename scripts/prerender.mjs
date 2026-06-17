// Post-build prerender: render each route to static HTML and inject into its
// built template's <div id="root">, so the page paints before JS hydrates.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const ssrUrl = pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href
const { render } = await import(ssrUrl)

// route -> built HTML file
const ROUTES = [
  { path: '/', file: 'index.html' },
  { path: '/security', file: 'security.html' },
  { path: '/privacy', file: 'privacy.html' },
]

const MARKER = '<div id="root"></div>'

for (const { path, file } of ROUTES) {
  const filePath = resolve(dist, file)
  const template = readFileSync(filePath, 'utf8')
  if (!template.includes(MARKER)) {
    throw new Error(`Prerender: marker not found in ${file}`)
  }
  const appHtml = render(path)
  const out = template.replace(MARKER, `<div id="root">${appHtml}</div>`)
  writeFileSync(filePath, out)
  console.log(`prerendered ${path} -> dist/${file} (${appHtml.length} chars)`)
}
