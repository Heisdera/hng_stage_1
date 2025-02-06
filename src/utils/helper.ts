export const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b, hex: `rgb(${r}, ${g}, ${b})` };
};

export const generateShades = ({ r, g, b }) => {
  let shades = Array.from({ length: 6 }, (_, i) => {
    const factor = 1 - i * 0.15;
    return `rgb(${Math.floor(r * factor)}, ${Math.floor(
      g * factor
    )}, ${Math.floor(b * factor)})`;
  });

  return shades.sort(() => Math.random() - 0.5);
};
