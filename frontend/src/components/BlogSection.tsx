import Image from 'next/image';

const BlogSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre avec un point carré */}
        <h2 className="text-5xl font-bold text-gray-900 mb-12 text-center flex justify-center items-center">
          Blog
          <span className="ml-2 mt-5 w-4 h-4 bg-orange-600 inline-block" style={{ borderRadius: '0' }}></span>
        </h2>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/Tech1.jpg"
              alt="Les Chatbots et l’Expérience Client"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold uppercase">IA</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4">
                Les Chatbots et l’Expérience Client dans le Secteur des Services
              </h3>
              <button className="border border-gray-300 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                Lire plus
              </button>
            </div>
          </div>

          {/* Article 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/tech2.jpg"
              alt="La Réalité Augmentée"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold uppercase">Technologie</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4">
                La Réalité Augmentée : Son Évolution et Ses Applications Actuelles
              </h3>
              <button className="border border-gray-300 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                Lire plus
              </button>
            </div>
          </div>

          {/* Article 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/tech3.jpg"
              alt="Optimisez Votre Temps"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold uppercase">Technologie</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4">
                Optimisez Votre Temps avec les Outils du Numérique
              </h3>
              <button className="border border-gray-300 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                Lire plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;