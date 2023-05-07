export const fixPriceDisplay = (price) => {
  price = price.toFixed(2);
  let holePart = price.toString();
  holePart = holePart.substring(0, holePart.indexOf('.'));

  let decimalPart = price.toString();
  decimalPart = decimalPart.substring(decimalPart.indexOf('.') + 1, decimalPart.length);
  const magnitude = holePart.length;
  const thousand = 4;
  const tenThousand = 5;
  const hundredThousand = 6;
  const million = 7;
  const tenMillion = 8;

  if (magnitude === thousand) {
    const pos = 1;

    holePart = `${holePart[0]}.${holePart
      .substring(pos, magnitude)}`;
  } else if (magnitude === tenThousand) {
    const pos = 2;

    holePart = `${holePart
      .substring(0, pos)}.${holePart
      .substring(pos, magnitude)}`;
  } else if (magnitude === hundredThousand) {
    const pos = 3;

    holePart = `${holePart
      .substring(0, pos)}.${holePart
      .substring(pos, magnitude)}`;
  } else if (magnitude === million) {
    const pos = 4;

    holePart = `${holePart[0]}.${holePart
      .substring(1, pos)}.${holePart
      .substring(pos, magnitude)}`;
  } else if (magnitude === tenMillion) {
    const pos = 5;

    holePart = `${holePart
      .substring(0, 2)}.${holePart
      .substring(2, pos)}.${holePart
      .substring(pos, magnitude)}`;
  }
  return `${holePart},${decimalPart}`;
};
