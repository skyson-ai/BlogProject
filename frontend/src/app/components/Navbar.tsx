'use client';

import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Voix Indélébiles</Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">Accueil</Link>
          {isAuthenticated ? (
            <>
              <Link href="/admin" className="hover:text-gray-300">Administration</Link>
              <button onClick={logout} className="hover:text-gray-300">Déconnexion</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">Connexion</Link>
              <Link href="/register" className="hover:text-gray-300">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}