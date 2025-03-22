import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Texte à gauche */}
          <div className="animate-text-delay lg:pr-16"> {/* Ajout de padding à droite pour rapprocher le texte de l'image */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              ICI ON PARLE  DE JUSTICES ET DES DROITS DE L’HOMME
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Bienvenue sur mon Blog. Ici, des articles captivants et instructifs vous plongeront au cœur de l’univers passionnant de la technologie, de l’innovation et de la sécurité numérique, guidés par une vision novatrice et une expertise pointue.
            </p>
          </div>

          {/* Image à droite */}
          <div className="animate-image relative lg:-ml-16"> {/* Décalage à gauche pour chevauchement */}
            <Image
              src="/justice.jpg"
              alt="Hero Image"
              width={500}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;