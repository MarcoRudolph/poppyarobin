'use client';

import React, { useState, useEffect } from 'react';
import { ThemaType, VorschlagType } from '../lib/types';
import '../app/globals.css';
import { v4 as uuidv4 } from 'uuid';
import {
  fetchThemenList,
  getVorschlaegeByThemaWithUser,
  ensureUserExists,
  getVorschlagLikes,
} from '../drizzle/actions';
import ContributionForm from './ContributionForm';
import Vorschlag from './Vorschlag';
import { OpenSans, DesirePro } from '../lib/fonts';
import Image from 'next/image';
import VorschlagDetail from './VorschlagDetail';
import { useSupabaseAuth } from '../lib/context/AuthContext';
import Modal from './common/Modal';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useHydration } from '../hooks/useHydration';
import { ThemaWithVorschlaegeWithUser } from '../drizzle/schema';

interface CommunitybookProps {
  themenList: ThemaWithVorschlaegeWithUser[];
}

const MAGIC_LINK_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 Tage in ms

const Communitybook: React.FC<CommunitybookProps> = ({
  themenList: initialThemenList,
}) => {
  const [email, setEmail] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [themenList, setThemenList] =
    useState<ThemaWithVorschlaegeWithUser[]>(initialThemenList);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [selectedThema, setSelectedThema] =
    useState<ThemaWithVorschlaegeWithUser | null>(null);
  const [expandedThema, setExpandedThema] = useState<number | null>(null);
  const [selectedVorschlag, setSelectedVorschlag] =
    useState<VorschlagType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const isHydrated = useHydration();

  const {
    signInWithGoogle,
    isLoading: isGoogleLoading,
    user: supabaseUser,
    isAuthenticated: supabaseIsAuthenticated,
  } = useSupabaseAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check localStorage for magic link token
      const storedEmail = localStorage.getItem('magiclink_email');
      const storedToken = localStorage.getItem('magiclink_token');
      const storedTimestamp = localStorage.getItem('magiclink_timestamp');

      if (storedEmail && storedToken && storedTimestamp) {
        const age = Date.now() - parseInt(storedTimestamp, 10);
        if (age < MAGIC_LINK_MAX_AGE) {
          setIsAuthenticated(true);
          setUserEmail(storedEmail);
          setTokenExpired(false);
          // Fetch user name from backend
          fetch(`/api/auth/userinfo?token=${encodeURIComponent(storedToken)}`)
            .then((res) => res.json())
            .then((data) => {
              if (data && data.name) setUserName(data.name);
            });
          return; // Magic Link authentication successful
        } else {
          // Clear expired token
          localStorage.removeItem('magiclink_email');
          localStorage.removeItem('magiclink_token');
          localStorage.removeItem('magiclink_timestamp');
        }
      }

      // Check Supabase authentication (Google OAuth)
      if (supabaseUser && supabaseIsAuthenticated) {
        setIsAuthenticated(true);
        setUserEmail(supabaseUser.email);
        setTokenExpired(false);
        // For Google OAuth users, we might not have a name, so use email as fallback
        setUserName(supabaseUser.email?.split('@')[0] || 'User');
        return; // Supabase authentication successful
      }

      // No authentication found
      setIsAuthenticated(false);
      setUserEmail(null);
      setTokenExpired(false);
      setUserName(null);
    };

    checkAuthentication();
  }, [supabaseUser, supabaseIsAuthenticated]);

  useEffect(() => {
    // Lade gespeicherte Benutzerdaten beim ersten Laden
    // Supabase user has no name, so skip name logic
  }, []);

  const refreshData = async () => {
    try {
      const themenList = await fetchThemenList();
      const themenWithVorschlaege = await Promise.all(
        themenList.map(async (thema) => {
          const vorschlaege = await getVorschlaegeByThemaWithUser(thema.id);
          return { ...thema, vorschlaege };
        }),
      );
      setThemenList(themenWithVorschlaege);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const handleAddContribution = (thema: ThemaWithVorschlaegeWithUser) => {
    setSelectedThema(thema);
    setShowContributionForm(true);
  };

  const handleContributionSubmit = () => {
    setShowContributionForm(false);
    setSelectedThema(null);
    refreshData();
  };

  const handleContributionCancel = () => {
    setShowContributionForm(false);
    setSelectedThema(null);
  };

  const handleVorschlagClick = (
    vorschlag: VorschlagType & { userName?: string | null },
  ) => {
    setSelectedVorschlag(vorschlag);
    setIsModalOpen(true);
  };

  // Helper to update a Vorschlag's like count in the themenList state
  const updateVorschlagLikeCount = (
    vorschlagId: number,
    newLikeCount: number,
  ) => {
    setThemenList((prev) =>
      prev.map((thema) => ({
        ...thema,
        vorschlaege: thema.vorschlaege.map((v) =>
          v.id === vorschlagId ? { ...v, likes: newLikeCount } : v,
        ),
      })),
    );
  };

  // Modified handleCloseModal to always fetch latest like count before updating state
  const handleCloseModal = async (updatedVorschlag?: {
    id: number;
    likes: number;
  }) => {
    setIsModalOpen(false);
    setSelectedVorschlag(null);
    if (selectedVorschlag) {
      const latestLikes = await getVorschlagLikes(selectedVorschlag.id);
      updateVorschlagLikeCount(selectedVorschlag.id, latestLikes);
    }
    // Don't call refreshData here as it will override the like count update
  };

  // Modified handleBackToThemes to always fetch latest like count before updating state
  const handleBackToThemes = async (updatedVorschlag?: {
    id: number;
    likes: number;
  }) => {
    setIsModalOpen(false);
    setSelectedVorschlag(null);
    if (selectedVorschlag) {
      const latestLikes = await getVorschlagLikes(selectedVorschlag.id);
      updateVorschlagLikeCount(selectedVorschlag.id, latestLikes);
    }
    // Don't call refreshData here as it will override the like count update
  };

  const toggleThemaExpansion = (themaId: number) => {
    setExpandedThema(expandedThema === themaId ? null : themaId);
  };

  // Dynamische Farben für verschiedene Themen
  const getThemaColor = (themaId: number) => {
    const colors = [
      'bg-gradient-to-r from-pink-500 to-rose-500',
      'bg-gradient-to-r from-blue-500 to-cyan-500',
      'bg-gradient-to-r from-purple-500 to-indigo-500',
      'bg-gradient-to-r from-orange-500 to-red-500',
      'bg-gradient-to-r from-green-500 to-emerald-500',
      'bg-gradient-to-r from-yellow-500 to-orange-500',
      'bg-gradient-to-r from-indigo-500 to-purple-500',
      'bg-gradient-to-r from-teal-500 to-cyan-500',
    ];
    return colors[themaId % colors.length];
  };

  // Dynamische Icons für verschiedene Themen
  const getThemaIcon = (themaId: number, themaName: string) => {
    // Spezielles Icon für Microtropes
    if (themaName.toLowerCase().includes('microtropes')) {
      return (
        <div className="relative w-8 h-8 rounded-lg overflow-hidden">
          <Image
            src="/images/microtropes.png"
            alt="Microtropes"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      );
    }

    // Fallback zu Emoji-Icons für andere Themen
    const icons = ['💕', '🌍', '✨', '⚡', '🎭', '🌟', '💫', '🎪'];
    return icons[themaId % icons.length];
  };

  // Sortiere die Themen nach ihrer Datenbank-ID (entspricht der Reihenfolge in Seed.json)
  const sortedThemenList = themenList.sort((a, b) => a.id - b.id);

  const handleSendMagicLink = async () => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Fehler beim Senden des Magic Links');
      } else {
        setAuthError(
          'Magic Link wurde gesendet! Bitte prüfe dein E-Mail-Postfach.',
        );
      }
    } catch (e) {
      setAuthError('Fehler beim Senden des Magic Links.');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render authentication-dependent content until hydration is complete
  if (!isHydrated) {
    return (
      <div
        className={`relative min-h-screen bg-gradient-to-b from-white to-gray-50 ${OpenSans.className}`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <div className="relative flex flex-col items-center justify-center p-4">
          {/* Header Section - immer sichtbar */}
          <div className="flex flex-col md:flex-row items-center w-full mt-5 p-2 rounded-lg">
            <div className="w-4/5 md:w-3/5 mx-auto mt-6 border-blue-gray-400 border-b-2 pb-8">
              <div
                className={`flex flex-col items-start ${DesirePro.className}`}
              >
                <h2 className="text-6xl md:text-9xl font-semibold text-gray-800 leading-none">
                  Eure Ideen,
                </h2>
                <h2 className="text-6xl md:text-9xl font-semibold text-gray-800 leading-none">
                  eure Geschichte
                </h2>
              </div>
              <p
                className={`text-2xl text-gray-700 mt-8 font-sans leading-relaxed italic ${OpenSans.className}`}
              >
                Wir schreiben ein Buch basierend auf euren Themenvorschlägen,
                Kommentaren und Likes, wobei die Likes die endgültige Auswahl
                bestimmen.
              </p>
            </div>
          </div>

          {/* Loading state for authentication */}
          <div className="flex flex-col items-center mt-6">
            <div className="bg-white/90 rounded-xl shadow-xl p-8 w-full max-w-xl flex flex-col items-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-b from-white to-gray-50 ${OpenSans.className}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center p-4">
        {/* Header Section - immer sichtbar */}
        <div className="flex flex-col md:flex-row items-center w-full mt-5 p-2 rounded-lg">
          <div className="w-4/5 md:w-3/5 mx-auto mt-6 border-blue-gray-400 border-b-2 pb-8">
            <div className={`flex flex-col items-start ${DesirePro.className}`}>
              <h2 className="text-6xl md:text-9xl font-semibold text-gray-800 leading-none">
                Eure Ideen,
              </h2>
              <h2 className="text-6xl md:text-9xl font-semibold text-gray-800 leading-none">
                eure Geschichte
              </h2>
            </div>
            <p
              className={`text-2xl text-gray-700 mt-8 font-sans leading-relaxed italic ${OpenSans.className}`}
            >
              Wir schreiben ein Buch basierend auf euren Themenvorschlägen,
              Kommentaren und Likes, wobei die Likes die endgültige Auswahl
              bestimmen.
            </p>
          </div>
        </div>

        {/* Authentication Section - immer sichtbar */}
        <div className={OpenSans.className}>
          {!isAuthenticated && (
            <div className="flex flex-col items-center mt-6">
              <div className="bg-white/90 rounded-xl shadow-xl p-8 w-full max-w-xl flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Ich will mitmachen
                </h3>
                {/* Magic Link Login */}
                <div className="flex flex-col w-full items-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Dein Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full bg-white/80 backdrop-blur-sm mb-2"
                    autoComplete="name"
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="Deine E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full bg-white/80 backdrop-blur-sm mb-2"
                    autoComplete="email"
                  />
                  <button
                    type="button"
                    onClick={handleSendMagicLink}
                    disabled={isLoading || !email.trim() || !name.trim()}
                    className={`
                      w-full
                      bg-halftone
                      text-white
                      py-2 px-4
                      rounded-lg
                      font-medium
                      hover:opacity-90
                      transition-all duration-200 transform hover:scale-105
                      shadow-md
                      text-lg
                      disabled:opacity-50 disabled:cursor-not-allowed
                      mb-1
                    `}
                  >
                    {isLoading ? 'Wird gesendet...' : 'Send me magic link'}
                  </button>
                </div>
                {/* ODER Separator */}
                <div className="flex items-center w-full my-4">
                  <div className="flex-grow h-px bg-gray-300" />
                  <span className="mx-4 text-gray-500 font-semibold">oder</span>
                  <div className="flex-grow h-px bg-gray-300" />
                </div>
                {/* Google Login */}
                <div className="flex flex-col w-full items-center">
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    disabled={isGoogleLoading}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium shadow hover:bg-gray-50 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 48 48">
                      <g>
                        <path
                          fill="#4285F4"
                          d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.36 13.13 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#34A853"
                          d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.93 37.36 46.1 31.45 46.1 24.55z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.67 28.65c-1.13-3.36-1.13-6.99 0-10.35l-7.98-6.2C.7 16.36 0 20.07 0 24s.7 7.64 2.69 11.9l7.98-6.2z"
                        />
                        <path
                          fill="#EA4335"
                          d="M24 48c6.13 0 11.64-2.03 15.53-5.53l-7.19-5.6c-2.01 1.35-4.58 2.13-8.34 2.13-6.26 0-11.64-3.63-13.33-8.85l-7.98 6.2C6.73 42.52 14.82 48 24 48z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                      </g>
                    </svg>
                    {isGoogleLoading ? 'Lädt...' : 'Login mit Google'}
                  </button>
                </div>
                {tokenExpired && (
                  <div className="text-red-600 text-lg mt-2">
                    Dein Login-Token ist abgelaufen. Bitte fordere einen neuen
                    Magic Link an.
                  </div>
                )}
                {authError && (
                  <div
                    className={`text-lg mt-2 ${authError.includes('gesendet') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {authError}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bedingte Anzeige: Vorschlag-Detail oder Themen-Übersicht */}
        {/* Vorschlag-Detail im Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedVorschlag && (
            <VorschlagDetail
              vorschlag={selectedVorschlag}
              showBackButton={true}
              onBack={handleBackToThemes}
              onLikeUpdate={(updatedVorschlag) =>
                updateVorschlagLikeCount(
                  updatedVorschlag.id,
                  updatedVorschlag.likes,
                )
              }
            />
          )}
        </Modal>
        {!isModalOpen && (
          <>
            {/* Header für alle Themen */}
            <div className="w-full max-w-7xl mt-10">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                {/* Begrüßung für eingeloggte User */}
                {isAuthenticated && (
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src="/images/bravomarco_a_charming_manga-style_young_woman_in_romantasy_atti_8a77cdf6-163f-4d7d-b3d9-fc9be13a1a6a.png"
                          alt="Romantasy Character"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-600 text-lg">
                        {userName
                          ? `Hey ${userName}, like deine Favoriten und/oder reiche Ideen ein.`
                          : 'Like deine Favoriten und/oder reiche Ideen ein.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Themen Grid */}
                {themenList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedThemenList.map((thema) => (
                      <div
                        key={thema.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
                      >
                        {/* Thema Header */}
                        <div className="mb-4">
                          <div className="flex items-center space-x-3 mb-3">
                            {thema.name
                              .toLowerCase()
                              .includes('microtropes') ? (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src="/images/microtropes.png"
                                  alt="Microtropes"
                                  width={64}
                                  height={64}
                                  className="object-cover"
                                />
                              </div>
                            ) : thema.name.toLowerCase().includes('tropes') ? (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src="/images/Tropes2.png"
                                  alt="Tropes"
                                  width={64}
                                  height={64}
                                  className="object-cover"
                                />
                              </div>
                            ) : thema.name.toLowerCase().includes('wesen') ? (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src="/images/Wesen.png"
                                  alt="Wesen"
                                  width={64}
                                  height={64}
                                  className="object-cover"
                                />
                              </div>
                            ) : thema.name
                                .toLowerCase()
                                .includes('settings') ? (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src="/images/Settings.png"
                                  alt="Settings"
                                  width={64}
                                  height={64}
                                  className="object-cover"
                                />
                              </div>
                            ) : thema.name.toLowerCase().includes('no go') ||
                              thema.name.toLowerCase().includes('nogo') ? (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src="/images/NOGO.png"
                                  alt="No Go"
                                  width={64}
                                  height={64}
                                  className="object-cover"
                                />
                              </div>
                            ) : thema.name
                                .toLowerCase()
                                .includes('konflikt') ? (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src="/images/Konflikt.png"
                                  alt="Konflikt"
                                  width={64}
                                  height={64}
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div
                                className={`${getThemaColor(thema.id)} text-white p-2 rounded-lg text-xl`}
                              >
                                {getThemaIcon(thema.id, thema.name)}
                              </div>
                            )}
                            <h4 className="text-2xl font-semibold text-gray-800">
                              {thema.name}
                            </h4>
                          </div>
                          <div className="flex items-center justify-start text-base text-gray-600 mb-3">
                            <span>{thema.vorschlaege.length} Beiträge</span>
                          </div>
                        </div>

                        {/* Vorschläge Vorschau */}
                        {thema.vorschlaege.length > 0 && (
                          <div className="mb-4 flex-grow">
                            <div className="flex items-center justify-center mb-2">
                              <button
                                onClick={() => toggleThemaExpansion(thema.id)}
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
                                title={
                                  expandedThema === thema.id
                                    ? 'Weniger anzeigen'
                                    : 'Mehr anzeigen'
                                }
                              >
                                {expandedThema === thema.id
                                  ? 'Weniger anzeigen'
                                  : 'Mehr anzeigen'}
                              </button>
                            </div>

                            <div className="space-y-3">
                              {thema.vorschlaege
                                .sort((a, b) => b.likes - a.likes) // Sort by likes (highest first)
                                .slice(
                                  0,
                                  expandedThema === thema.id
                                    ? thema.vorschlaege.length
                                    : 2,
                                )
                                .map((vorschlag) => (
                                  <Vorschlag
                                    key={vorschlag.id}
                                    vorschlag={vorschlag}
                                    onClick={handleVorschlagClick}
                                    onLike={refreshData}
                                    onLikeUpdate={(updatedVorschlag) =>
                                      updateVorschlagLikeCount(
                                        updatedVorschlag.id,
                                        updatedVorschlag.likes,
                                      )
                                    }
                                  />
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Beitrag hinzufügen Button */}
                        {isAuthenticated && (
                          <button
                            onClick={() => handleAddContribution(thema)}
                            className="mt-4 flex items-center justify-center text-xl font-semibold bg-gradient-to-r from-[#e7c873] via-[#f7d6e6] to-[#e3c6f7] text-gray-900 px-6 py-3 rounded-lg shadow-xl hover:brightness-105 transition-all duration-200 gap-2 border-2 border-black"
                          >
                            Beitrag hinzufügen
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    Keine Themen verfügbar.
                  </div>
                )}
              </div>
            </div>

            {/* Contribution Form Modal */}
            {showContributionForm && selectedThema && (
              <ContributionForm
                thema={selectedThema}
                onSubmit={handleContributionSubmit}
                onCancel={handleContributionCancel}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Communitybook;
