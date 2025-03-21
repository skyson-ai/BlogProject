import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div>{/* Section À Propos */} 
  <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="w-full lg:w-auto">
              <Image
                src="/proprietaire.jpg" // Remplace par ton image
                alt="Edith Brou Bleu"
                width={300} // Ajuste selon la taille souhaitée
                height={400} // Ajuste selon la taille souhaitée
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Texte */}
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
             Legouan <span className="text-blue-600">Eric</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Ivoirienne engagée et leader dans le domaine des médias numériques, Edith Brou Bleu a
                dirigé les agences de communication digitales People Input Côte d'Ivoire [2012 - 2016]
                et ACG entreprises [2017 - 2019]. Ces expériences renforcent sa stature en tant que
                professionnelle accomplie avec plus de 15 ans d’expérience.
              </p>
            </div>
          </div>
        </div>
      </section>
  </div>
  )
}

export default Hero