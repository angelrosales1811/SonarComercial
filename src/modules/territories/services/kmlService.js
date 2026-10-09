export function parseKml(content) {
  const parser = new DOMParser();

  const xml = parser.parseFromString(content, 'text/xml');

  const placemarks = xml.getElementsByTagName('Placemark');

  const polygons = [];

  const FALLBACK_COLORS = [
    '#e53935',
    '#d81b60',
    '#8e24aa',
    '#5e35b1',
    '#3949ab',
    '#1e88e5',
    '#039be5',
    '#00acc1',
    '#00897b',
    '#43a047',
    '#7cb342',
    '#c0ca33',
    '#fdd835',
    '#ffb300',
    '#fb8c00',
    '#f4511e',
    '#6d4c41',
    '#546e7a',
  ];

  const styles = {};

  const usedColors = new Set();

  let colorIndex = 0;

  function kmlColorToHex(kmlColor) {
    if (!kmlColor || kmlColor.length !== 8) {
      return null;
    }

    const rr = kmlColor.substring(6, 8);
    const gg = kmlColor.substring(4, 6);
    const bb = kmlColor.substring(2, 4);

    return `#${rr}${gg}${bb}`;
  }

  function getUniqueColor() {
    while (usedColors.has(FALLBACK_COLORS[colorIndex % FALLBACK_COLORS.length])) {
      colorIndex++;
    }

    const color = FALLBACK_COLORS[colorIndex % FALLBACK_COLORS.length];

    colorIndex++;

    usedColors.add(color);

    return color;
  }

  Array.from(xml.getElementsByTagName('Style')).forEach((style) => {
    const id = style.getAttribute('id');

    if (!id) {
      return;
    }

    const polyColor = style
      .getElementsByTagName('PolyStyle')[0]
      ?.getElementsByTagName('color')[0]
      ?.textContent?.trim();

    const lineColor = style
      .getElementsByTagName('LineStyle')[0]
      ?.getElementsByTagName('color')[0]
      ?.textContent?.trim();

    const color = kmlColorToHex(polyColor) || kmlColorToHex(lineColor);

    if (color) {
      styles[id] = color;
      usedColors.add(color);
    }
  });

  Array.from(placemarks).forEach((placemark, index) => {
    const nameNode = placemark.getElementsByTagName('name')[0];

    const coordinatesNode = placemark.getElementsByTagName('coordinates')[0];

    if (!coordinatesNode) {
      return;
    }

    const coordinatesText = coordinatesNode.textContent.trim();

    const points = coordinatesText
      .split(/\s+/)
      .filter(Boolean)
      .map((coord) => {
        const [lng, lat] = coord.split(',').map(Number);

        return [lat, lng];
      });

    if (points.length > 1) {
      const first = points[0];
      const last = points[points.length - 1];

      if (first[0] === last[0] && first[1] === last[1]) {
        points.pop();
      }
    }

    const styleUrl = placemark.getElementsByTagName('styleUrl')[0]?.textContent?.trim();

    const styleId = styleUrl?.replace('#', '');

    const color = styles[styleId] || getUniqueColor();

    polygons.push({
      id: crypto.randomUUID(),
      name: nameNode?.textContent?.trim() || `Polígono ${index + 1}`,
      color,
      closed: true,
      points,
    });
  });

  return polygons;
}
