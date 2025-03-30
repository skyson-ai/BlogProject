'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from './../../lib/api';

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [sections, setSections] = useState([{ content: '', files: [] as File[] }]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string>(''); // Typage explicite comme string
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchArticles();
      fetchMessages();
    }
  }, [router]);

  const fetchArticles = async () => {
    try {
      const res = await api.get('/articles');
      setArticles(res.data);
    } catch (err: any) {
      setError('Erreur lors de la récupération des articles');
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get('/api/contact');
      setMessages(res.data);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des messages:', err.response?.data || err.message);
      setError('Erreur lors de la récupération des messages de contact');
    }
  };

  const addSection = () => {
    setSections([...sections, { content: '', files: [] }]);
  };

  const updateSection = (index: number, field: 'content' | 'files', value: string | File[]) => {
    const newSections = [...sections];
    if (field === 'content' && typeof value === 'string') {
      newSections[index][field] = value;
    } else if (field === 'files' && Array.isArray(value)) {
      newSections[index][field] = value;
    }
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation des champs obligatoires
    if (!title.trim()) {
      setError('Le titre est obligatoire');
      return;
    }
    if (!category.trim()) {
      setError('La catégorie est obligatoire');
      return;
    }
    if (sections.length === 0) {
      setError('Au moins une section est requise');
      return;
    }
    const isInvalidSection = sections.some((section) =>
      !section.content.trim() || (!editingId && section.files.length === 0)
    );
    if (isInvalidSection) {
      setError('Chaque section doit avoir un contenu et, pour une création, au moins une photo');
      return;
    }

    // Construction du FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);

    sections.forEach((section, index) => {
      formData.append(`sections_content[${index}]`, section.content);
      section.files.forEach((file, fileIndex) => {
        formData.append('files', file);
        console.log(`Fichier ajouté pour section ${index}, fichier ${fileIndex}:`, file.name);
      });
    });

    // Log pour vérifier le contenu du FormData
    console.log('Données envoyées :');
    console.log('title:', title);
    console.log('category:', category);
    console.log('sections:', sections);
    const formDataEntries = Array.from(formData.entries());
    console.log('FormData entries:', formDataEntries);

    try {
      if (editingId) {
        const res = await api.put(`/articles/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setArticles(articles.map((article) => (article.id === editingId ? res.data : article)));
        setEditingId(null);
      } else {
        const res = await api.post('/articles', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setArticles([res.data, ...articles]);
      }
      setTitle('');
      setCategory('');
      setSections([{ content: '', files: [] }]);
    } catch (err: any) {
      const errorDetail = err.response?.data?.detail;
      if (Array.isArray(errorDetail)) {
        const errorMessages = errorDetail.map((e: any) => e.msg).join(', ');
        setError(errorMessages || 'Erreur lors de la création/modification');
      } else {
        setError(errorDetail || 'Erreur lors de la création/modification');
      }
      console.error('Erreur complète :', err.response?.data || err.message);
    }
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setSections(
      article.sections.map((section: any) => ({
        content: section.content,
        files: [],
      }))
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/articles/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erreur lors de la suppression');
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await api.delete(`/api/contact/${id}`);
      setMessages(messages.filter((message) => message.id !== id));
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erreur lors de la suppression du message');
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
          <h1 className="text-4xl font-bold text-gray-900">Tableau de bord</h1>
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

            {/* Sections dynamiques */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Sections</h3>
              {sections.map((section, index) => (
                <div key={index} className="border p-4 mb-4 rounded-lg">
                  <div>
                    <label className="block text-gray-700">Contenu de la section</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(index, 'content', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-gray-700">Photos (1 ou 2)</label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          const filesArray = Array.from(e.target.files).slice(0, 2);
                          updateSection(index, 'files', filesArray);
                        }
                      }}
                      className="w-full p-2 border rounded-lg"
                      accept="image/*"
                      required={!editingId} // Obligatoire seulement pour création
                    />
                    {section.files.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Fichiers sélectionnés : {section.files.map((f: File) => f.name).join(', ')}
                      </p>
                    )}
                  </div>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="mt-2 text-red-600 hover:underline"
                    >
                      Supprimer cette section
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSection}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Ajouter une section
              </button>
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
                  setCategory('');
                  setSections([{ content: '', files: [] }]);
                }}
                className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Annuler
              </button>
            )}
          </form>
        </div>

        {/* Liste des articles */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Articles publiés</h2>
          {articles.length === 0 ? (
            <p className="text-gray-600">Aucun article pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="border-b pb-4 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <p className="text-gray-600">{article.category}</p>
                    <p className="text-gray-500 text-sm">
                      Créé le : {new Date(article.created_at).toLocaleDateString()}
                    </p>
                    {article.sections.map((section: any, index: number) => (
                      <div key={index} className="mt-2">
                        <p>{section.content}</p>
                        {section.photo1_url && (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${section.photo1_url}`}
                            alt={`Section ${index + 1} - Photo 1`}
                            className="w-32 h-32 object-cover mt-1"
                          />
                        )}
                        {section.photo2_url && (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${section.photo2_url}`}
                            alt={`Section ${index + 1} - Photo 2`}
                            className="w-32 h-32 object-cover mt-1"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
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

        {/* Liste des messages de contact */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Messages de contact</h2>
          {messages.length === 0 ? (
            <p className="text-gray-600">Aucun message pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="border-b pb-4 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div className="mb-4 md:mb-0">
                    <p className="text-gray-700">
                      <span className="font-semibold">Nom :</span> {message.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Email :</span> {message.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Message :</span> {message.message}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Envoyé le : {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
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