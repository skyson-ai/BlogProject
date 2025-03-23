'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../../components/Header';
import ContactForm from '../../../components/ContactForm';
import Footer from '../../../components/Footer';

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  image_url: string | null;
  created_at: string;
}

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/articles/${
        params.id
      }`;
      console.log('Fetching article with method: GET, URL:', url);
      try {
        const res = await axios.get(url);
        console.log('Article fetched successfully:', res.data);
        setArticle(res.data);
      } catch (err: any) {
        console.error('Error fetching article:', err.response?.data || err.message);
        setError(err.response?.data?.detail || 'Erreur lors de la récupération de l’article');
      }
    };

    const fetchOtherArticles = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/articles`;
      console.log('Fetching other articles with method: GET, URL:', url);
      try {
        const res = await axios.get(url);
        console.log('Other articles fetched successfully:', res.data);
        setOtherArticles(res.data.filter((a: Article) => a.id !== parseInt(params.id)));
      } catch (err: any) {
        console.error('Error fetching other articles:', err.response?.data || err.message);
        setError(err.response?.data?.detail || 'Erreur lors de la récupération des autres articles');
      }
    };

    fetchArticle();
    fetchOtherArticles();
  }, [params.id]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <p className="text-red-500 text-center py-16">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <p className="text-gray-600 text-center py-16">Chargement...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <section className="bg-white">
          {/* Image en arrière-plan avec titre, catégorie et date */}
          <div className="relative w-full h-[500px] bg-gray-200">
            {article.image_url ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}${article.image_url}`}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Aucune image disponible</p>
              </div>
            )}
            {/* Overlay sombre pour améliorer la lisibilité du texte */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            {/* Contenu sur l'image (titre, catégorie, date) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="max-w-6xl mx-auto">
                {/* Catégorie */}
                <div className="flex items-center mb-2">
                  <span className="w-4 h-4 bg-orange-500 mr-2"></span>
                  <span className="text-blue-200 font-semibold">{article.category}</span>
                </div>
                {/* Titre */}
                <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
                {/* Date de publication */}
                <div className="flex items-center text-gray-200 text-sm">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Créé le : {new Date(article.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Contenu de l'article et autres articles */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contenu de l'article principal (à gauche) */}
              <div className="lg:col-span-2">
                <p className="text-gray-600 leading-relaxed">{article.content}</p>
              </div>

              {/* Autres articles (à droite) */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold mb-4">Autres articles</h2>
                {otherArticles.length === 0 ? (
                  <p className="text-gray-600">Aucun autre article pour le moment.</p>
                ) : (
                  <div className="space-y-6">
                    {otherArticles.map((otherArticle) => (
                      <div
                        key={otherArticle.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                      >
                        {otherArticle.image_url && (
                          <div className="relative w-full h-40">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}${otherArticle.image_url}`}
                              alt={otherArticle.title}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <span className="w-3 h-3 bg-orange-500 mr-2"></span>
                            <span className="text-blue-600 font-semibold text-sm">
                              {otherArticle.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            {otherArticle.title}
                          </h3>
                          <Link href={`/blog/${otherArticle.id}`}>
                            <button className="border border-black text-black px-3 py-1 rounded-lg hover:bg-gray-100">
                              Lire plus
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire de Contact */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}