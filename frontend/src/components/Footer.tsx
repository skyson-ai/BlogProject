import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Icône pour X (Twitter)

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Première ligne : Logo à gauche, Email et icônes sociales à droite */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold">
              Voix <span className="text-blue-600">Indélébiles</span>
            </h2>
          </div>

          {/* Email et icônes sociales */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="mailto:edithbrou@edithbrou.com" className="text-gray-400 hover:text-white">
            Rigoparis796@gmail.com
            </a>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1A2cJ8RmCA/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="text-2xl hover:text-gray-300" />
              </a>
              <a href="https://x.com/VoixIndelebiles?t=aqNkRwTfZIA_7CUv-1bzjQ&s=09" target="_blank" rel="noopener noreferrer" aria-label="X">
                <FaXTwitter className="text-2xl hover:text-gray-300" />
              </a>
              <a href="https://www.instagram.com/voix_indelebiles/profilecard/?igsh=MTY2dWcybDg0Nmt5eA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-2xl hover:text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <hr className="border-gray-700 mb-6" />

        {/* Deuxième ligne : Navigation */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
          <Link href="/" className="text-gray-400 hover:text-white">
            Accueil
          </Link>
          <Link href="/blog" className="text-gray-400 hover:text-white">
            Blog
          </Link>
          <Link href="/a-propos" className="text-gray-400 hover:text-white">
            À propos
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-white">
            Contact
          </Link>
        </div>

        {/* Troisième ligne : Copyright et design */}
        <div className="text-center text-gray-400 text-sm">
          ©Legouan  Eric 2025. All rights reserved. | Designed By MICHEE CEPHAS
        </div>
      </div>
    </footer>
  );
};

export default Footer;