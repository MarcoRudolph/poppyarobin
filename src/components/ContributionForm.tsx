'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabaseAuth } from '../lib/context/AuthContext';
import { ThemaType } from '../lib/types';
import { useHydration } from '../hooks/useHydration';
import { ThemaWithVorschlaegeWithUser } from '../drizzle/schema';

interface ContributionFormProps {
  thema: ThemaWithVorschlaegeWithUser;
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
  const isHydrated = useHydration();

  // Get token from localStorage for magic link authentication
  const getToken = () => {
    if (!isHydrated) return null;
    return localStorage.getItem('magiclink_token');
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
    if (!isHydrated) return true; // Allow submission before hydration
    const key = getTodayKey();
    const count = parseInt(localStorage.getItem(key) || '0', 10);
    return count < 5;
  };

  const incrementVorschlagCount = () => {
    if (!isHydrated) return;
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

  // Don't render the form until hydration is complete
  if (!isHydrated) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50 p-1 sm:p-2 md:p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="max-h-[95vh] w-full max-w-sm overflow-y-auto overflow-x-hidden rounded-xl bg-white shadow-2xl sm:max-h-[90vh] sm:max-w-md md:max-w-lg lg:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
              <div className="animate-pulse">
                <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
                <div className="mb-2 h-4 w-48 rounded bg-gray-200"></div>
                <div className="h-4 w-64 rounded bg-gray-200"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50 p-1 sm:p-2 md:p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="max-h-[95vh] w-full max-w-sm overflow-y-auto overflow-x-hidden rounded-xl bg-white shadow-2xl sm:max-h-[90vh] sm:max-w-md md:max-w-lg lg:max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
            <h3 className="pr-2 text-lg font-semibold text-gray-800 sm:text-2xl">
              Beitrag zu &quot;{thema.name}&quot; hinzufügen
            </h3>
            <button
              onClick={onCancel}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-2xl font-light text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 sm:text-3xl"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Titel deines Beitrags *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="z.B. Meine Idee für Friends to Lovers..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base transition-all focus:border-transparent focus:ring-2 focus:ring-pink-500 sm:px-4 sm:py-3 sm:text-lg"
                  maxLength={100}
                  autoFocus
                />
                <p className="mt-1 text-xs text-gray-500">
                  {title.length}/100 Zeichen
                </p>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Dein Beitrag *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Beschreibe deine Idee, deine Geschichte oder deinen Vorschlag für dieses Thema..."
                  rows={6}
                  className="resize-vertical w-full rounded-lg border border-gray-300 px-3 py-2 text-base transition-all focus:border-transparent focus:ring-2 focus:ring-pink-500 sm:px-4 sm:py-3 sm:text-lg"
                  maxLength={1000}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {content.length}/1000 Zeichen
                </p>
              </div>

              {/* Info Box */}
              <div className="rounded-lg border border-pink-200 bg-pink-50 p-3 sm:p-4">
                <p className="text-xs text-pink-800 sm:text-sm">
                  <strong>Tipp:</strong> Dein Beitrag wird anderen Nutzern
                  angezeigt und kann geliked und kommentiert werden. Die Likes
                  entscheiden über die finale Auswahl für das Buch!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-stretch justify-end space-y-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto sm:px-6 sm:py-3"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="w-full rounded-lg bg-pink-500 px-4 py-2 font-medium text-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto sm:px-6 sm:py-3"
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
