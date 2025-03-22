'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from './../../lib/api';

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [author, setAuthor] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchArticles();
    }
  }, [router]);

  const fetchArticles = async () => {
    try {
      const res = await api.get('/articles');
      setArticles(res.data);
    } catch (err) {
      setError('Erreur lors de la récupération des articles');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editingId) {
        // Modifier un article
        const res = await api.put(`/articles/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setArticles(articles.map((article) => (article.id === editingId ? res.data : article)));
        setEditingId(null);
      } else {
        // Créer un article
        const res = await api.post('/articles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setArticles([res.data, ...articles]);
      }
      setTitle('');
      setContent('');
      setCategory('');
      setImage(null);
      setAuthor('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erreur lors de la création/modification');
    }
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setTitle(article.title);
    setContent(article.content);
    setCategory(article.category);
    setAuthor(article.author_id.toString()); // On ne modifie pas l'image ici
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/articles/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erreur lors de la suppression');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Tableau de bord Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Déconnexion
          </button>
        </div>

        {/* Formulaire pour créer/modifier un article */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? 'Modifier un article' : 'Créer un nouvel article'}
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-700">
                Titre
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-gray-700">
                Contenu
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows={5}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-700">
                Catégorie
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-gray-700">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
                className="w-full p-2 border rounded-lg"
                accept="image/*"
                required={!editingId} // Image requise pour la création, optionnelle pour la modification
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingId ? 'Modifier' : 'Créer'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setContent('');
                  setCategory('');
                  setImage(null);
                  setAuthor('');
                }}
                className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Annuler
              </button>
            )}
          </form>
        </div>

        {/* Liste des articles */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Articles publiés</h2>
          {articles.length === 0 ? (
            <p className="text-gray-600">Aucun article pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="border-b pb-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <p className="text-gray-600">{article.category}</p>
                    <p className="text-gray-500 text-sm">
                      Créé le : {new Date(article.created_at).toLocaleDateString()}
                    </p>
                    {article.image_url && (
                      <img
                        src={`http://localhost:8000${article.image_url}`}
                        alt={article.title}
                        className="w-32 h-32 object-cover mt-2"
                      />
                    )}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(article)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}