const hex = x => {
  const str = x.toString(16);
  return str.length === 1 ? '0' + str : str;
};
const getTransitionColor = (colorA, colorB, ratio) => {
  const r = Math.ceil(
    parseInt(colorA.substring(1, 3), 16) * ratio +
      parseInt(colorB.substring(1, 3), 16) * (1 - ratio),
  );
  const g = Math.ceil(
    parseInt(colorA.substring(3, 5), 16) * ratio +
      parseInt(colorB.substring(3, 5), 16) * (1 - ratio),
  );
  const b = Math.ceil(
    parseInt(colorA.substring(5, 7), 16) * ratio +
      parseInt(colorB.substring(5, 7), 16) * (1 - ratio),
  );
  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

export default getTransitionColor;
