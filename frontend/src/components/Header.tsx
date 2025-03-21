import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

// Charger la police Playfair Display
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

// Définir une couleur orange personnalisée dans le scope
const orangeCustom = "#F28C38"; // Orange personnalisé, ajustable

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 border-b">
      {/* Logo à gauche */}
      <div className="flex items-center">
        <Link href="/" className={`text-4xl font-bold ${playfair.variable} flex items-center`}>
          <Image
            src="/logo.png"
            width={120} // Agrandi à 120px
            height={120} // Agrandi à 120px
            alt="Voix Indélébiles Logo"
            className="mr-3" // Plus de marge pour l'espace
          />
        </Link>
      </div>

      {/* Liens centrés avec petit trait orange au survol */}
      <div className="flex space-x-10"> {/* Augmenté space-x-10 pour plus d'espace */}
        <Link
          href="/"
          className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
        >
          Accueil
        </Link>
        <Link
          href="/a-propos"
          className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
        >
          À propos
        </Link>
        <Link
          href="/contact"
          className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
        >
          Contact
        </Link>
      </div>

      {/* Icônes sociales à droite */}
      <div className="flex space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookF className="text-2xl hover:text-gray-500 transition-colors" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn className="text-2xl hover:text-gray-500 transition-colors" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram className="text-2xl hover:text-gray-500 transition-colors" />
        </a>
      </div>
    </nav>
  );
}