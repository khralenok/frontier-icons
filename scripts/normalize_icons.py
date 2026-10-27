#!/usr/bin/env python3
"""Normalize SVG presentation without changing geometry (including Illustrator exports)."""
import argparse
from pathlib import Path
import xml.etree.ElementTree as ET

ET.register_namespace('', 'http://www.w3.org/2000/svg')
DEFAULTS = {'width': '64', 'height': '64', 'viewBox': '0 0 64 64', 'fill': 'none',
            'stroke': 'currentColor', 'stroke-width': '2',
            'stroke-linecap': 'round', 'stroke-linejoin': 'round'}
PAINT = {'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'}
BLACK = {'#000', '#000000', 'black', 'rgb(0,0,0)', 'rgb(0, 0, 0)'}


def normalize(source):
    root = ET.fromstring(source)
    before = ET.tostring(root)
    def visit(node, inherited_fill='black', inherited_stroke='none'):
        # Inline presentation overrides inherited attributes in browser SVG rendering.
        styles = dict(part.split(':', 1) for part in node.get('style', '').split(';') if ':' in part)
        styles = {key.strip(): value.strip() for key, value in styles.items()}
        for key in list(styles):
            if key in PAINT:
                node.set(key, styles.pop(key))
        if styles:
            node.set('style', '; '.join(f'{key}: {value}' for key, value in styles.items()))
        else:
            node.attrib.pop('style', None)
        node.attrib.pop('id', None)
        original_fill = node.get('fill', inherited_fill)
        original_stroke = node.get('stroke', inherited_stroke)
        tag = node.tag.rsplit('}', 1)[-1]
        if tag in {'path', 'circle', 'ellipse', 'rect', 'polygon', 'polyline', 'line'}:
            # An unstyled Illustrator dot inherits black fill and no stroke. Keep it a dot.
            if 'fill' not in node.attrib and original_fill in BLACK:
                node.set('fill', 'currentColor')
            if 'stroke' not in node.attrib and original_stroke == 'none':
                node.set('stroke', 'none')
        for key in ('stroke', 'fill'):
            if node.get(key) in BLACK:
                node.set(key, 'currentColor')
        for key, value in DEFAULTS.items():
            if key in PAINT and node.get(key, '').removesuffix('px') == value:
                del node.attrib[key]
        if node.get('stroke-width') in {'0', '0px'}:
            node.attrib.pop('stroke-width')
            node.set('stroke', 'none')
        for child in node:
            visit(child, original_fill, original_stroke)
    visit(root)
    root.attrib.pop('version', None)
    for key, value in DEFAULTS.items():
        root.set(key, value)
    if ET.tostring(root) == before:
        return source
    ET.indent(root, space='  ')
    return ET.tostring(root, encoding='unicode') + '\n'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Report nonconforming files without changing them')
    parser.add_argument('paths', nargs='*', type=Path, help='Defaults to all SVGs in svg/')
    args = parser.parse_args()
    changed = []
    for path in args.paths or sorted(Path('svg').glob('*.svg')):
        source = path.read_text()
        output = normalize(source)
        if source != output:
            changed.append(path)
            if not args.check:
                path.write_text(output)
    print(f'{len(changed)} SVG(s) {"need normalization" if args.check else "normalized"}.')
    if args.check and changed:
        for path in changed:
            print(path)
        raise SystemExit(1)


if __name__ == '__main__':
    main()
