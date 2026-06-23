export default function FormattedText({ text }) {
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}
