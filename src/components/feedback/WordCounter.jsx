function WordCounter({ text, limit }) {

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return (
    <p className="text-sm text-gray-500 mt-2">
      {words.length}/{limit} words
    </p>
  );
}

export default WordCounter;