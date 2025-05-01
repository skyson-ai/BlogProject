'use client';

import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; 

// Charger la police Playfair Display
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

// Définir une couleur orange personnalisée dans le scope
const orangeCustom = "#F28C38"; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay pour bloquer le scroll en arrière-plan sur mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      <nav className="flex items-center justify-between p-6 border-b relative z-20 bg-white">
        {/* Logo à gauche */}
        <div className="flex items-center">
          <Link href="/" className={`text-4xl font-bold ${playfair.variable} flex items-center`}>
            <Image
              src="/new_logo.jpg"
              width={120} 
              height={120} 
              alt="Voix Indélébiles Logo"
              className="mr-3"
            />
          </Link>
        </div>

     
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Liens centrés et icônes sociales à droite (visible sur desktop) */}
        <div className="hidden md:flex items-center justify-center flex-1">
          {/* Liens centrés */}
          <div className="flex space-x-10">
            <Link
              href="/"
              className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
            >
              Accueil
            </Link>
            <Link
              href="/blog"
              className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
            >
              Blog
            </Link>
            <Link
              href="/about"
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
        </div>

        {/* Icônes sociales à droite (visible sur desktop) */}
        <div className="hidden md:flex space-x-4">
          <a
            href="https://www.facebook.com/share/1A2cJ8RmCA/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className="text-2xl hover:text-gray-500 transition-colors" />
          </a>
          <a
            href="https://x.com/VoixIndelebiles?t=aqNkRwTfZIA_7CUv-1bzjQ&s=09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <FaXTwitter className="text-2xl hover:text-gray-300" />
          </a>
          <a
            href="https://www.instagram.com/voix_indelebiles/profilecard/?igsh=MTY2dWcybDg0Nmt5eA=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="text-2xl hover:text-gray-500 transition-colors" />
          </a>
        </div>

        {/* Menu déroulant sur mobile */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:hidden flex-col fixed top-0 left-0 w-full bg-white p-6 space-y-6 z-10 transition-all duration-300 pt-20 shadow-lg`}
        >
          {/* Croix pour fermer le menu */}
          <div className="flex justify-end">
            <button onClick={toggleMenu} aria-label="Close menu">
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Liens de navigation */}
          <Link
            href="/"
            className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
            onClick={() => setIsOpen(false)} 
          >
            Accueil
          </Link>
          <Link
            href="/blog"
            className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="text-2xl hover:border-b-2 hover:border-orange-500 transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {/* Icônes sociales */}
          <div className="flex space-x-4 pt-4">
            <a
              href="https://www.facebook.com/share/1A2cJ8RmCA/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-2xl hover:text-gray-500 transition-colors" />
            </a>
            <a
              href="https://x.com/VoixIndelebiles?t=aqNkRwTfZIA_7CUv-1bzjQ&s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <FaXTwitter className="text-2xl hover:text-gray-300" />
            </a>
            <a
              href="https://www.instagram.com/voix_indelebiles/profilecard/?igsh=MTY2dWcybDg0Nmt5eA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-2xl hover:text-gray-500 transition-colors" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}