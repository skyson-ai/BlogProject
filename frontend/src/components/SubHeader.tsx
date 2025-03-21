const SubHeader = () => {
  return (
    <div className="bg-gray-100 py-4 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        {Array.from("BIENVENU SUR VOIX INDELEBILES").map((letter, index) => (
          <span
            key={index}
            className={`inline-block text-4xl font-bold animate-color-change ${
              index % 3 === 0 ? 'text-orange-500' : index % 3 === 1 ? 'text-black' : 'text-white'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }} 
          >
            {letter === " " ? "\u00A0" : letter} 
          </span>
        ))}
      </div>
    </div>
  );
};

export default SubHeader;