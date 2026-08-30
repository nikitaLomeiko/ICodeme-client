const TITLE = "ICODEME — ИНТЕРАКТИВНЫЙ ТЕРМИНАЛ";
const SUBTITLE = "Welcome to the interactive terminal";
const WIDTH = 46;

const fill = (text: string) => {
  const padTotal = Math.max(0, WIDTH - text.length);
  const left = Math.floor(padTotal / 2);
  const right = padTotal - left;
  return `║${" ".repeat(left)}${text}${" ".repeat(right)}║`;
};
