const SubHeader = () => {
  // Séparer les mots pour mieux gérer l'espacement
  const words = ["BIENVENUE", "SUR", "VOIX", "INDELEBILES"];

  return (
    <div className="bg-gray-100 py-4 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="inline-block mr-8" // Ajout d'un espacement entre les mots
          >
            {word.split("").map((letter, letterIndex) => {
              // Calculer un index global pour l'animation des couleurs
              const globalIndex = wordIndex * 10 + letterIndex; // Approximation pour différencier les lettres
              return (
                <span
                  key={`${wordIndex}-${letterIndex}`}
                  className={`inline-block text-4xl font-bold animate-color-change ${
                    globalIndex % 3 === 0
                      ? 'text-orange-500'
                      : globalIndex % 3 === 1
                      ? 'text-black'
                      : 'text-white'
                  }`}
                  style={{ animationDelay: `${globalIndex * 0.1}s` }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SubHeader;