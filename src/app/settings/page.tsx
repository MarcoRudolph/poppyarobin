'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '../../lib/context/AuthContext';
import { OpenSans, DesirePro } from '../../lib/fonts';
import {
  Trash2,
  Heart,
  MessageSquare,
  User,
  AlertTriangle,
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const { user: supabaseUser, isAuthenticated: supabaseIsAuthenticated } =
    useSupabaseAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState<
    'contributions' | 'likes' | 'account' | null
  >(null);

  useEffect(() => {
    const checkAuthentication = () => {
      // Check Magic Link token
      const magicLinkToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('magiclink_token')
          : null;

      // Check Google OAuth
      const hasGoogleAuth = supabaseUser && supabaseIsAuthenticated;

      if (magicLinkToken || hasGoogleAuth) {
        setIsAuthenticated(true);

        if (hasGoogleAuth) {
          setUserEmail(supabaseUser?.email || null);
          setUserName(supabaseUser?.email?.split('@')[0] || null);
        } else {
          setUserEmail(localStorage.getItem('magiclink_email'));
          // Fetch user name from backend
          if (magicLinkToken) {
            fetch(
              `/api/auth/userinfo?token=${encodeURIComponent(magicLinkToken)}`,
            )
              .then((res) => res.json())
              .then((data) => {
                if (data && data.name) setUserName(data.name);
              })
              .catch((error) => {
                console.error('Error fetching user info:', error);
              });
          }
        }
      } else {
        // Only redirect if we're sure the user is not authenticated
        // and we've given enough time for the auth state to load
        setTimeout(() => {
          if (!isAuthenticated) {
            router.push('/communitybook');
          }
        }, 1000);
      }
    };

    // Add a small delay to allow auth state to settle
    const timer = setTimeout(checkAuthentication, 100);
    return () => clearTimeout(timer);
  }, [supabaseUser, supabaseIsAuthenticated, router, isAuthenticated]);

  const handleDeleteContributions = async () => {
    setDeleteType('contributions');
    setShowDeleteConfirm(true);
  };

  const handleDeleteLikes = async () => {
    setDeleteType('likes');
    setShowDeleteConfirm(true);
  };

  const handleDeleteAccount = async () => {
    setDeleteType('account');
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteType) return;

    setIsLoading(true);
    try {
      let endpoint = '';
      let message = '';

      switch (deleteType) {
        case 'contributions':
          endpoint = '/api/user/delete-contributions';
          message = 'Alle deine Beiträge wurden gelöscht.';
          break;
        case 'likes':
          endpoint = '/api/user/delete-likes';
          message = 'Alle deine Likes wurden gelöscht.';
          break;
        case 'account':
          endpoint = '/api/user/delete-account';
          message = 'Dein Konto wurde gelöscht.';
          break;
      }

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          userId: supabaseUser?.id,
          token: localStorage.getItem('magiclink_token'),
        }),
      });

      if (response.ok) {
        alert(message);
        if (deleteType === 'account') {
          // Clear all data and redirect to home
          localStorage.clear();
          router.push('/');
        }
      } else {
        const error = await response.json();
        alert(`Fehler: ${error.error || 'Unbekannter Fehler'}`);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Fehler beim Löschen. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
      setDeleteType(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('magiclink_email');
    localStorage.removeItem('magiclink_token');
    localStorage.removeItem('magiclink_timestamp');
    router.push('/communitybook');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">
            Überprüfe Authentifizierung...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-white to-gray-50 ${OpenSans.className}`}
    >
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-6xl font-semibold text-gray-800 mb-4 ${DesirePro.className}`}
          >
            Einstellungen
          </h1>
          <p className="text-xl text-gray-600">
            Verwalte dein Konto und deine Daten
          </p>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {userName || 'Benutzer'}
              </h2>
              <p className="text-gray-600">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Abmelden
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-red-600 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Gefahrenbereich
          </h3>

          <div className="space-y-6">
            {/* Delete Contributions */}
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                  <div>
                    <h4 className="text-lg font-semibold text-red-800">
                      Alle Beiträge löschen
                    </h4>
                    <p className="text-red-600 text-sm">
                      Löscht alle deine eingereichten Beiträge unwiderruflich.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDeleteContributions}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  Löschen
                </button>
              </div>
            </div>

            {/* Delete Likes */}
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-red-600" />
                  <div>
                    <h4 className="text-lg font-semibold text-red-800">
                      Alle Likes löschen
                    </h4>
                    <p className="text-red-600 text-sm">
                      Löscht alle deine vergebenen Likes unwiderruflich.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDeleteLikes}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  Löschen
                </button>
              </div>
            </div>

            {/* Delete Account */}
            <div className="border-2 border-red-400 rounded-lg p-6 bg-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trash2 className="w-6 h-6 text-red-700" />
                  <div>
                    <h4 className="text-lg font-semibold text-red-800">
                      Konto löschen
                    </h4>
                    <p className="text-red-600 text-sm">
                      Löscht dein gesamtes Konto und alle zugehörigen Daten
                      unwiderruflich.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 disabled:opacity-50 transition-colors"
                >
                  Konto löschen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/communitybook')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Zurück zum Communitybook
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {deleteType === 'contributions' && 'Alle Beiträge löschen?'}
                {deleteType === 'likes' && 'Alle Likes löschen?'}
                {deleteType === 'account' && 'Konto löschen?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {deleteType === 'contributions' &&
                  'Diese Aktion kann nicht rückgängig gemacht werden.'}
                {deleteType === 'likes' &&
                  'Alle deine Likes werden unwiderruflich gelöscht.'}
                {deleteType === 'account' &&
                  'Dein gesamtes Konto und alle Daten werden unwiderruflich gelöscht.'}
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Wird gelöscht...' : 'Löschen bestätigen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
