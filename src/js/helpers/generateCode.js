export function generateRandomCode() {
  const part1 = "TK";
  const part2 = String(Math.floor(Math.random() * 999)).padStart(3, "0");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part3 = Array.from(
    { length: 5 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");

  return `${part1}-${part2}-${part3}`;
}
