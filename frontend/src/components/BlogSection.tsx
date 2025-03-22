'use client';

import { useState, useEffect } from 'react';
import api from '../lib/api';

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  image_url?: string;
}

const BlogSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles');
        setArticles(res.data);
      } catch (err) {
        setError('Erreur lors de la récupération des articles');
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Blog</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {articles.length === 0 ? (
          <p className="text-gray-600 text-center">Aucun article pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-lg shadow-lg">
                {article.image_url && (
                  <img
                    src={`http://localhost:8000${article.image_url}`}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.content.substring(0, 100)}...</p>
                <p className="text-gray-500 text-sm">Catégorie : {article.category}</p>
                <p className="text-gray-500 text-sm">
                  Publié le : {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;