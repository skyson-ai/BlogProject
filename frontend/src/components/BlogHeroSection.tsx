import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
          <div className="animate-text-delay lg:pr-16"> 
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Bienvenue sur Voix Indélébiles, 
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
            un espace où les mots deviennent des actes.Ici, on questionne, on éclaire et on raconte les histoires qui méritent d’être entendues. Des droits humains aux enjeux sociaux, chaque article est une invitation à voir le monde autrement. L’information est une force : utilisons-la pour faire la différence.
            </p>
          </div>

      
          <div className="animate-image relative lg:-ml-16"> 
            <Image
              src="/images/justice.jpg"
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