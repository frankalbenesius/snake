const hex = x => {
  const str = x.toString(16);
  return str.length === 1 ? '0' + str : str;
};
const getTransitionColor = (colorA, colorB, ratio) => {
  const r = Math.ceil(
    parseInt(colorA.substring(1, 2), 16) * ratio +
      parseInt(colorB.substring(1, 2), 16) * (1 - ratio),
  );
  const g = Math.ceil(
    parseInt(colorA.substring(2, 4), 16) * ratio +
      parseInt(colorB.substring(2, 4), 16) * (1 - ratio),
  );
  const b = Math.ceil(
    parseInt(colorA.substring(4, 6), 16) * ratio +
      parseInt(colorB.substring(4, 6), 16) * (1 - ratio),
  );
  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

export default getTransitionColor;
