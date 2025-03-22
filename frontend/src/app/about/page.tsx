import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos - Voix Indélébiles',
  description: 'Découvrez qui je suis et la mission de Voix Indélébiles, un blog dédié à la sensibilisation sur les droits humains.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
            À PROPOS – Voix Indélébiles
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Texte à gauche */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Qui suis-je ?</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Je me nomme Kouassi Legouan Eric Didier, un jeune passionné par la technologie, la lecture et l’écriture. Curieux et engagé, j’ai toujours été fasciné par le pouvoir des mots et leur capacité à informer, sensibiliser et éveiller les consciences.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mt-4">
                  Aujourd’hui, je fais partie du programme des Jeunes Blogueurs, une initiative en partenariat avec l’UNICEF, qui vise à promouvoir les droits humains, notamment ceux des enfants et des femmes, à travers le numérique et l’expression écrite.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Pourquoi “Voix Indélébiles” ?</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  “Les mots peuvent disparaître des pages, mais jamais des mémoires.”
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mt-4">
                  Ce blog est né d’un constat simple : trop de réalités sont ignorées, trop d’injustices restent dans l’ombre. Voix Indélébiles se veut un espace où l’on dénonce, sensibilise et informe sur les problématiques liées aux droits des enfants, des femmes et des populations vulnérables. Ici, chaque article porte une voix, chaque mot laisse une empreinte.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mt-4">
                  À travers mes écrits, je veux donner une tribune à ceux qu’on n’entend pas assez, poser des questions, interpeller et surtout, engager le dialogue. Parce que le changement commence avec la prise de conscience, et que celle-ci passe par l’information.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Rejoins le mouvement !</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Si tu crois en une société plus juste et mieux informée, si tu veux contribuer à la diffusion de messages forts et significatifs, alors suis-moi sur mes réseaux sociaux et ensemble, faisons résonner ces Voix Indélébiles.
                </p>
              </div>
            </div>

            {/* Photo à droite */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/proprietaire.jpg" // Remplace par ton image
                alt="Kouassi Legouan Eric Didier"
                width={400}
                height={500}
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}