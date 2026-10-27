"""Regression checks for Illustrator export cleanup, not icon geometry."""
import unittest
import xml.etree.ElementTree as ET

from normalize_icons import normalize


class NormalizeIconsTest(unittest.TestCase):
    def test_preserves_geometry_and_restores_inherited_presentation(self):
        source = '<svg viewBox="0 0 64 64"><path d="M5 9Q20 5 30 40" style="fill: none; stroke: #000; stroke-width: 2px; stroke-linecap: round"/></svg>'
        root = ET.fromstring(normalize(source))
        path = root.find('path')
        self.assertEqual(path.get('d'), 'M5 9Q20 5 30 40')
        self.assertNotIn('style', path.attrib)
        self.assertNotIn('stroke-width', path.attrib)
        self.assertEqual(root.get('stroke'), 'currentColor')
        self.assertEqual(root.get('width'), '64')

    def test_preserves_unstyled_filled_dots(self):
        root = ET.fromstring(normalize('<svg><circle cx="39" cy="39" r="1"/></svg>'))
        dot = root.find('circle')
        self.assertEqual(dot.get('fill'), 'currentColor')
        self.assertEqual(dot.get('stroke'), 'none')
        self.assertEqual(dot.get('r'), '1')

    def test_respects_nested_group_paint(self):
        root = ET.fromstring(normalize('<svg><g style="fill: none; stroke: #000"><path d="M1 1h4"/></g></svg>'))
        path = root.find('g/path')
        self.assertNotIn('fill', path.attrib)
        self.assertNotEqual(path.get('stroke'), 'none')

    def test_is_idempotent(self):
        source = '<svg><path d="M1 1h4" style="fill:none;stroke:#000;stroke-width:2px"/></svg>'
        output = normalize(source)
        self.assertEqual(normalize(output), output)


if __name__ == '__main__':
    unittest.main()
