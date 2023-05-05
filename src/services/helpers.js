export const fixPriceDisplay = (price) => {
  let holePart = price.toString();
  holePart = holePart.substring(0, holePart.indexOf('.'));

  let decimalPart = price.toString();
  decimalPart = decimalPart.substring(decimalPart.indexOf('.') + 1, decimalPart.length);

  const thousand = 4;
  const tenThousand = 5;
  const hundredThousand = 6;
  const million = 7;

  if (holePart.length === thousand) {
    holePart = `${holePart[0]}.${holePart.substring(1, holePart.length)}`;
  } else if (holePart.length === tenThousand) {
    holePart = `${holePart.substring(0, 2)}.${holePart.substring(2, holePart.length)}`;
  } else if (holePart.length === hundredThousand) {
    const pos = 3;

    holePart = `${holePart
      .substring(0, pos)}.${holePart
      .substring(pos, holePart.length)}`;
  } else if (holePart.length === million) {
    const pos = 4;

    holePart = `${holePart[0]}.${holePart
      .substring(1, pos)}.${holePart
      .substring(pos, holePart.length)}`;
  }
  return `${holePart},${decimalPart}`;
};
