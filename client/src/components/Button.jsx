export default function Button({ text, onClick, className }) {
  return (
    <button onClick={onClick} className={`py-2 px-4 ${className}`}>
      {text}
    </button>
  );
}
