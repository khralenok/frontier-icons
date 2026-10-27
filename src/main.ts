import './style.css';
import illustration from '../img/hero-illustration.png';
import license from '../LICENSE?raw';

const sources = import.meta.glob('../svg/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const aliases: Record<string, string> = { hat: 'cowboy headwear', boot: 'western footwear', seed: 'sprout plant', snake: 'rattlesnake animal', knife: 'bowie blade', revolver: 'gun pistol', ingot: 'gold metal', minecart: 'mining wagon', lasso: 'rope' };
const icons = Object.entries(sources).map(([path, svg]) => ({ name: path.split('/').pop()!.replace('.svg', ''), svg })).sort((a, b) => a.name.localeCompare(b.name));
const saddleMark = decorative(icons.find(icon => icon.name === 'saddle')!.svg);
const github = 'https://github.com/khralenok/frontier-icons';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="site-header wrap">
    <a class="brand" href="#" aria-label="Frontier Icons home"><span class="brand-mark">${saddleMark}</span><span>frontier icons</span></a>
    <nav aria-label="Main navigation"><a href="#collection">The collection</a><a href="${github}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to light theme"></button></nav>
  </header>
  <main>
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <h1 id="hero-title">A little wild.<br><em>Simply drawn.</em></h1>
        <p class="intro">Icons from the frontier, made for wherever you’re headed. A small, thoughtfully drawn collection with an Old West soul.</p>
        <div class="hero-actions"><a class="button primary" href="#collection">Explore the icons <span aria-hidden="true">↓</span></a><button class="button secondary" id="download-all">Download pack <span aria-hidden="true">↧</span></button></div>
        <p class="hero-note">${icons.length} icons <span>·</span> SVG format <span>·</span> Free & open source</p>
      </div>
      <div class="hero-art"><div class="sun-disc"></div><span class="art-label">EST. 2026 / THE OPEN RANGE</span><img src="${illustration}" alt="Western musician in a cowboy hat playing a guitar" fetchpriority="high"></div>
    </section>
    <section class="collection wrap" id="collection" aria-labelledby="collection-title">
      <div class="collection-heading"><div><p class="eyebrow">THE COLLECTION</p><h2 id="collection-title">Good company for your next project<span>.</span></h2></div><span class="count">${icons.length} hand-drawn icons</span></div>
      <div class="toolbar"><label class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Find something out here…" aria-label="Search icons"><kbd>/</kbd></label><label class="size-control">Preview size <input id="grid-size" type="range" min="32" max="64" value="48"><output id="grid-size-value">48px</output></label></div>
      <div class="grid" id="grid"></div><p class="empty" id="empty" hidden>No icons found. Try “cowboy”, “tools”, or another name.</p>
      <div class="collection-bottom"><p id="results" role="status"></p><p>Made with care. Ready for adventure.</p></div>
    </section>
    <section class="license-strip wrap"><span class="license-star" aria-hidden="true">✳</span><div><h3>Yours to roam with.</h3><p>Personal projects, commercial adventures, and everything in between. Free under the MIT license.</p></div><a href="${github}/blob/main/LICENSE" target="_blank" rel="noreferrer">Read the license ↗</a></section>
  </main>
  <footer class="wrap"><a class="brand" href="#"><span class="brand-mark">${saddleMark}</span><span>frontier icons</span></a><p>Drawn for the open web.</p><a href="${github}" target="_blank" rel="noreferrer">Made open source ↗</a></footer>
  <dialog id="detail" aria-labelledby="detail-title"><div class="dialog-top"><p class="eyebrow">FROM THE FRONTIER</p><button class="close" aria-label="Close icon details">×</button></div><h2 id="detail-title"></h2><div class="icon-preview" id="preview" aria-hidden="true"></div><div class="settings"><label>Size <output id="size-value">64px</output><input id="size" type="range" min="16" max="128" value="64"></label><label>Stroke <output id="stroke-value">2</output><input id="stroke" type="range" min="1" max="4" step="0.25" value="2"></label><label class="color-label">Color<input id="color" type="color" value="#352c25"></label></div><div class="dialog-actions"><button class="button primary" id="copy">Copy SVG</button><button class="button secondary" id="download">Download SVG ↧</button></div><details><summary>SVG source</summary><pre><code id="source"></code></pre></details></dialog>
  <div class="toast" id="toast" role="status"></div>`;

function el<T extends HTMLElement = HTMLElement>(id: string) { return document.getElementById(id) as T; }
const themeButton = el<HTMLButtonElement>('theme-toggle');
const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>';
const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/></svg>';
function updateThemeButton() {
  const light = document.documentElement.dataset.theme === 'light';
  themeButton.innerHTML = `${light ? moon : sun}<span>${light ? 'Dark' : 'Light'}</span>`;
  themeButton.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!.content = light ? '#f6f0e4' : '#1c1815';
}
updateThemeButton();
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('frontier-theme', theme); } catch { /* Theme still works when storage is unavailable. */ }
  updateThemeButton();
});
// Keep the export color independent from the page theme, with a consistent light preview canvas.
function decorative(svg: string) { return svg.replace('<svg', '<svg aria-hidden="true" focusable="false"'); }
function render() {
  const query = el<HTMLInputElement>('search').value.trim().toLowerCase();
  const matching = icons.filter(icon => `${icon.name} ${aliases[icon.name] || ''} ${['axe', 'hammer', 'pickaxe'].includes(icon.name) ? 'tools' : ''}`.includes(query));
  el('grid').innerHTML = matching.map(icon => `<button class="icon-card" data-icon="${icon.name}" aria-label="Preview ${icon.name}"><span class="card-arrow" aria-hidden="true">↗</span>${decorative(icon.svg)}<span>${icon.name}</span></button>`).join('');
  el('empty').hidden = matching.length > 0;
  el('results').textContent = `Showing ${matching.length} of ${icons.length} icons`;
}
render();
el('search').addEventListener('input', render);
el<HTMLInputElement>('grid-size').addEventListener('input', event => { const value = (event.target as HTMLInputElement).value; el('grid').style.setProperty('--icon-size', `${value}px`); el('grid-size-value').textContent = `${value}px`; });
const dialog = el<HTMLDialogElement>('detail');
let selected = icons[0];
function customized() {
  const doc = new DOMParser().parseFromString(selected.svg, 'image/svg+xml');
  const svg = doc.documentElement;
  svg.setAttribute('width', el<HTMLInputElement>('size').value);
  svg.setAttribute('height', el<HTMLInputElement>('size').value);
  svg.setAttribute('stroke-width', el<HTMLInputElement>('stroke').value);
  svg.setAttribute('color', el<HTMLInputElement>('color').value);
  return new XMLSerializer().serializeToString(svg);
}
function updatePreview() { const svg = customized(); el('preview').innerHTML = decorative(svg); el('source').textContent = svg; el('size-value').textContent = `${el<HTMLInputElement>('size').value}px`; el('stroke-value').textContent = el<HTMLInputElement>('stroke').value; }
el('grid').addEventListener('click', event => { const card = (event.target as Element).closest<HTMLElement>('[data-icon]'); if (!card) return; selected = icons.find(icon => icon.name === card.dataset.icon)!; el('detail-title').textContent = selected.name; updatePreview(); dialog.showModal(); });
dialog.querySelector('.close')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
['size', 'stroke', 'color'].forEach(id => el(id).addEventListener('input', updatePreview));
let toastTimer: ReturnType<typeof setTimeout>;
function toast(message: string) { el('toast').textContent = message; el('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el('toast').classList.remove('visible'), 3000); }
el('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText(customized()); toast('SVG copied. Happy trails!'); } catch { toast('Clipboard unavailable. Select and copy the SVG source below.'); dialog.querySelector('details')!.open = true; } });
function download(blob: Blob, name: string) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
el('download').addEventListener('click', () => download(new Blob([customized()], { type: 'image/svg+xml' }), `${selected.name}.svg`));

// Store-only ZIP: no runtime dependency, originals and license preserved.
function zip(files: { name: string; content: string }[]) {
  const encoder = new TextEncoder(); const chunks: Uint8Array[] = []; const directory: Uint8Array[] = []; let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name); const data = encoder.encode(file.content); let crc = 0xffffffff;
    for (const byte of data) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0); } crc = (crc ^ 0xffffffff) >>> 0;
    const local = new Uint8Array(30 + name.length); const view = new DataView(local.buffer);
    view.setUint32(0, 0x04034b50, true); view.setUint16(4, 20, true); view.setUint16(12, 33, true); view.setUint32(14, crc, true); view.setUint32(18, data.length, true); view.setUint32(22, data.length, true); view.setUint16(26, name.length, true); local.set(name, 30);
    const central = new Uint8Array(46 + name.length); const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true); cv.setUint16(14, 33, true); cv.setUint32(16, crc, true); cv.setUint32(20, data.length, true); cv.setUint32(24, data.length, true); cv.setUint16(28, name.length, true); cv.setUint32(42, offset, true); central.set(name, 46);
    chunks.push(local, data); directory.push(central); offset += local.length + data.length;
  }
  const end = new Uint8Array(22); const ev = new DataView(end.buffer); ev.setUint32(0, 0x06054b50, true); ev.setUint16(8, files.length, true); ev.setUint16(10, files.length, true); ev.setUint32(12, directory.reduce((sum, part) => sum + part.length, 0), true); ev.setUint32(16, offset, true);
  return new Blob([...chunks, ...directory, end] as BlobPart[], { type: 'application/zip' });
}
el('download-all').addEventListener('click', () => { download(zip([...icons.map(icon => ({ name: `frontier-icons/svg/${icon.name}.svg`, content: icon.svg })), { name: 'frontier-icons/LICENSE', content: license }]), 'frontier-icons.zip'); toast('The whole frontier, packed and ready.'); });
document.addEventListener('keydown', event => { if (event.key === '/' && !dialog.open && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) { event.preventDefault(); el('search').focus(); } });
