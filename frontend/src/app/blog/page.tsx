'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import Header from '../../components/Header';
import BlogHeroSection from '../../components/BlogHeroSection';
import Footer from '../../components/Footer';
import ContactForm from '@/src/components/ContactForm';

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles');
        // Trier les articles par date de création (du plus récent au plus ancien)
        const sortedArticles = res.data.sort((a: any, b: any) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setArticles(sortedArticles); // Afficher tous les articles
      } catch (err) {
        setError('Erreur lors de la récupération des articles');
      }
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <Header />
      <BlogHeroSection />
      <ContactForm />
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-12">
            Tous les Articles <span className="text-orange-600">.</span>
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {articles.length === 0 ? (
            <p className="text-gray-600 text-center">Aucun article pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Image */}
                  {article.image_url && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${article.image_url}`}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  {/* Contenu de la carte */}
                  <div className="p-6 flex flex-col h-[200px]">
                    {/* Catégorie avec carré orange */}
                    <div className="flex items-center mb-2">
                      <span className="w-4 h-4 bg-orange-500 mr-2"></span>
                      <p className="text-gray-700 font-semibold">{article.category}</p>
                    </div>
                    {/* Titre souligné */}
                    <h3 className="text-xl font-semibold mb-2 border-black">
                      {article.title}
                    </h3>
                    {/* Espace flexible pour pousser le bouton en bas */}
                    <div className="flex-grow"></div>
                    {/* Bouton "Lire plus" */}
                    <Link href={`/blog/${article.id}`}>
                      <button className="border border-black text-black px-4 py-2 rounded-lg hover:bg-gray-100">
                        Lire plus
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}