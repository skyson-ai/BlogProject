'use client';

import { useState } from 'react';
import api from '../lib/api';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await api.post('/api/contact', { name, email, message });
      setSuccess(res.data.message);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erreur lors de l’envoi du message');
    }
  };

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Texte à gauche */}
          <div className="mt-[-1rem] ml-[-1rem] lg:ml-[-2rem]">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Écrivez-moi et entrons en contact !
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              N’hésitez pas à m’écrire via ce formulaire. Je me ferai une grande joie de vous répondre dans les plus brefs délais.
            </p>
          </div>

          {/* Formulaire à droite */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Affichage des messages d'erreur ou de succès */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Champ Nom */}
            <div>
              <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>

            {/* Champ Email */}
            <div>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>

            {/* Champ Message */}
            <div>
              <textarea
                placeholder="Message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
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