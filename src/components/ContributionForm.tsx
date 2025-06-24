'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../lib/context/AuthContext';

interface ContributionFormProps {
  themaId: number;
  themaName: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({
  themaId,
  themaName,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user?.token) {
      alert('Bitte logge dich ein, um einen Beitrag zu erstellen.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert('Bitte fülle alle Felder aus.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          themaId,
          title: title.trim(),
          content: content.trim(),
          token: user.token,
        }),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        onSubmit();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Fehler beim Speichern des Beitrags',
        );
      }
    } catch (error) {
      console.error('Error submitting contribution:', error);
      alert('Fehler beim Speichern des Beitrags. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Beitrag zu "{themaName}" hinzufügen
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Titel deines Beitrags *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. Meine Idee für Friends to Lovers..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1">
            {title.length}/100 Zeichen
          </p>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Dein Beitrag *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Beschreibe deine Idee, deine Geschichte oder deinen Vorschlag für dieses Thema..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1">
            {content.length}/1000 Zeichen
          </p>
        </div>

        <div className="flex items-center space-x-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? 'Wird gespeichert...' : 'Beitrag speichern'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>
        </div>

        <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Tipp:</strong> Dein Beitrag wird anderen Nutzern angezeigt
            und kann geliked und kommentiert werden. Die Likes entscheiden über
            die finale Auswahl für das Buch!
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default ContributionForm;
