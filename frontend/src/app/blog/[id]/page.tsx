'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>(null);
  const [otherArticles, setOtherArticles] = useState<any[]>([]);
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
        setOtherArticles(res.data.filter((a: any) => a.id !== parseInt(params.id)));
      } catch (err: any) {
        console.error('Error fetching other articles:', err.response?.data || err.message);
        setError(err.response?.data?.detail || 'Erreur lors de la récupération des autres articles');
      }
    };

    fetchArticle();
    fetchOtherArticles();
  }, [params.id]);

  if (error) {
    return <p className="text-red-500 text-center py-16">{error}</p>;
  }

  if (!article) {
    return <p className="text-gray-600 text-center py-16">Chargement...</p>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article principal */}
          <div className="lg:col-span-2">
            {/* Image de l'article */}
            {article.image_url && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${article.image_url}`}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            {/* Catégorie */}
            <div className="flex items-center mb-2">
              <span className="w-4 h-4 bg-orange-500 mr-2"></span>
              <span className="text-blue-600 font-semibold">{article.category}</span>
            </div>
            {/* Titre */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
            {/* Date de publication */}
            <div className="flex items-center text-gray-500 text-sm mb-4">
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
            {/* Contenu complet */}
            <p className="text-gray-600 leading-relaxed mb-6">{article.content}</p>
            {/* Boutons Partager et Recommander */}
            <div className="flex space-x-4">
              <button className="flex items-center text-blue-600 hover:underline">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.684 13.342C9.886 12.938 10 12.773 10 12c0-.773-.114-1.938 1.088-2.342M15.316 10.658C14.114 11.062 14 11.227 14 12c0 .773.114 1.938-1.088 2.342M9 12h6m-3-9v18"
                  />
                </svg>
                Partager
              </button>
              <button className="flex items-center text-blue-600 hover:underline">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Recommander
              </button>
            </div>
          </div>

          {/* Autres articles */}
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
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${otherArticle.image_url}`}
                        alt={otherArticle.title}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <span className="w-3 h-3 bg-orange-500 mr-2"></span>
                        <span className="text-blue-600 font-semibold text-sm">
                          {otherArticle.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 underline">
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
  );
}