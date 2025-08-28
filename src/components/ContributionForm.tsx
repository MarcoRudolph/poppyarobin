'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabaseAuth } from '../lib/context/AuthContext';
import { ThemaType } from '../lib/types';

interface ContributionFormProps {
  thema: ThemaType;
  onSubmit: () => void;
  onCancel: () => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({
  thema,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useSupabaseAuth();

  // Get token from localStorage for magic link authentication
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('magiclink_token');
    }
    return null;
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Helper functions for localStorage spam protection
  const getTodayKey = () => {
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    return `vorschlaegeCount_${today}`;
  };

  const canSubmitVorschlag = () => {
    const key = getTodayKey();
    const count = parseInt(localStorage.getItem(key) || '0', 10);
    return count < 5;
  };

  const incrementVorschlagCount = () => {
    const key = getTodayKey();
    const count = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, (count + 1).toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmitVorschlag()) {
      alert(
        'Du kannst heute nur 5 Vorschläge einreichen. Versuche es morgen wieder!',
      );
      return;
    }

    // Check if user is authenticated via either method
    const hasMagicLinkToken = getToken();
    const hasGoogleAuth = user?.id;

    if (!hasMagicLinkToken && !hasGoogleAuth) {
      alert('Bitte logge dich ein, um einen Beitrag zu erstellen.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert('Bitte fülle alle Felder aus.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare authentication data based on login method
      const requestBody: any = {
        themaId: thema.id,
        title: title.trim(),
        content: content.trim(),
      };

      if (user?.id) {
        // Google OAuth user
        requestBody.userId = user.id;
        requestBody.userEmail = user.email;
      } else {
        // Magic Link user
        requestBody.token = getToken();
      }

      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        incrementVorschlagCount();
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-2 md:p-4 overflow-hidden"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 pr-2">
              Beitrag zu "{thema.name}" hinzufügen
            </h3>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-light hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Schließen"
            >
              ×
            </button>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base sm:text-lg"
                  maxLength={100}
                  autoFocus
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-vertical text-base sm:text-lg"
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {content.length}/1000 Zeichen
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-pink-800">
                  <strong>Tipp:</strong> Dein Beitrag wird anderen Nutzern
                  angezeigt und kann geliked und kommentiert werden. Die Likes
                  entscheiden über die finale Auswahl für das Buch!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSubmitting ? 'Wird gespeichert...' : 'Beitrag speichern'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContributionForm;
