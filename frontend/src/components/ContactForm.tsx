const ContactForm = () => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Texte à gauche */}
          <div className="mt-[-1rem] ml-[-1rem] lg:ml-[-2rem]"> {/* Réduit mt-[-2rem] à mt-[-1rem] pour descendre */}
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Écrivez-moi et entrons en contact !
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              N’hésitez pas à m’écrire via ce formulaire. Je me ferai une grande joie de vous répondre dans les plus brefs délais.
            </p>
          </div>

          {/* Formulaire à droite */}
          <form className="space-y-6">
            {/* Champ Nom */}
            <div>
              <input
                type="text"
                placeholder="Nom"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            {/* Champ Email */}
            <div>
              <input
                type="email"
                placeholder="E-mail"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            {/* Champ Message */}
            <div>
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            {/* Bouton Envoyer */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="w-1/4 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;