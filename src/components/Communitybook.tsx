'use client';

import React, { useState, useEffect } from 'react';
import { ThemaType, VorschlagType } from '../lib/types';
import '../app/globals.css';
import { v4 as uuidv4 } from 'uuid';
import {
  fetchThemenList,
  getVorschlaegeByThema,
  ensureUserExists,
} from '../drizzle/actions';
import ContributionForm from './ContributionForm';
import Vorschlag from './Vorschlag';
import { OpenSans, DesirePro } from '../lib/fonts';
import Image from 'next/image';
import VorschlagDetail from './VorschlagDetail';
import { useAuthContext } from '../lib/context/AuthContext';

interface CommunitybookProps {
  themenList: ThemaType[];
}

const Communitybook: React.FC<CommunitybookProps> = ({
  themenList: initialThemenList,
}) => {
  const [name, setName] = useState('');
  const [themenList, setThemenList] = useState<ThemaType[]>(initialThemenList);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [selectedThema, setSelectedThema] = useState<ThemaType | null>(null);
  const [expandedThema, setExpandedThema] = useState<number | null>(null);
  const [selectedVorschlag, setSelectedVorschlag] =
    useState<VorschlagType | null>(null);

  const { user, isAuthenticated, register, isRegistering } = useAuthContext();

  useEffect(() => {
    // Lade gespeicherte Benutzerdaten beim ersten Laden
    const savedUserName = localStorage.getItem('userName');

    if (savedUserName && !name) {
      setName(savedUserName);
    }
  }, [name]);

  const refreshData = async () => {
    try {
      const themenList = await fetchThemenList();
      const themenWithVorschlaege = await Promise.all(
        themenList.map(async (thema) => {
          const vorschlaege = await getVorschlaegeByThema(thema.id);
          return { ...thema, vorschlaege };
        }),
      );
      setThemenList(themenWithVorschlaege);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const teilnehmen = async () => {
    if (!name.trim()) {
      alert('Bitte gib deinen Namen ein.');
      return;
    }

    try {
      await register(name.trim());
      // Speichere auch den Namen im localStorage für die Wiedererkennung
      localStorage.setItem('userName', name.trim());
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    }
  };

  const handleAddContribution = (thema: ThemaType) => {
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

  const handleVorschlagClick = (vorschlag: VorschlagType) => {
    setSelectedVorschlag(vorschlag);
  };

  const handleBackToThemes = () => {
    setSelectedVorschlag(null);
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
          <div className="w-3/5 mx-auto mt-6 border-blue-gray-400 border-b-2 pb-8">
            <div className={`flex flex-col items-start ${DesirePro.className}`}>
              <h2 className="text-9xl font-semibold text-gray-800 leading-none">
                Eure Ideen,
              </h2>
              <h2 className="text-9xl font-semibold text-gray-800 leading-none">
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
            <div className="flex flex-col items-center mt-6 space-y-4">
              <input
                id="username"
                type="text"
                placeholder="Dein Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-64 bg-white/80 backdrop-blur-sm"
              />
              <button
                type="button"
                onClick={teilnehmen}
                disabled={isRegistering || !name.trim()}
                className={`
    w-full
    bg-halftone            /* unser lila Verlauf + Punkte */
    text-white
    py-3 px-4
    rounded-lg
    font-medium
    hover:opacity-90
    transition-all duration-200 transform hover:scale-105
    shadow-md
    text-2xl
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
              >
                {isRegistering ? 'Wird erstellt...' : 'Ich will mitmachen!'}
              </button>
            </div>
          )}
        </div>

        {/* Bedingte Anzeige: Vorschlag-Detail oder Themen-Übersicht */}
        {selectedVorschlag ? (
          <VorschlagDetail
            vorschlag={selectedVorschlag}
            onBack={handleBackToThemes}
          />
        ) : (
          <>
            {/* Header für alle Themen */}
            <div className="w-full max-w-7xl mt-10">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                {/* Zentrierter Text über den Themen */}
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
                      {user?.name
                        ? `Hey ${user.name}, like deine Favoriten und/oder reiche Ideen ein.`
                        : 'Like deine Favoriten und/oder reiche Ideen ein.'}
                    </p>
                  </div>
                </div>

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
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg font-medium text-gray-700">
                                Aktuelle Beiträge:
                              </span>
                              <button
                                onClick={() => toggleThemaExpansion(thema.id)}
                                className="text-xl text-blue-600 hover:text-blue-800"
                              >
                                {expandedThema === thema.id
                                  ? 'Weniger anzeigen'
                                  : 'Alle anzeigen'}
                              </button>
                            </div>

                            <div className="space-y-3">
                              {thema.vorschlaege
                                .slice(
                                  0,
                                  expandedThema === thema.id
                                    ? thema.vorschlaege.length
                                    : 2,
                                )
                                .map((vorschlag) => (
                                  <div
                                    key={vorschlag.id}
                                    className="bg-gray-50 rounded-lg p-4 border-l-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    style={{ borderLeftColor: '#f869df' }}
                                    onClick={() =>
                                      handleVorschlagClick(vorschlag)
                                    }
                                  >
                                    <h5 className="font-semibold text-gray-800 text-2xl mb-1">
                                      {vorschlag.ueberschrift}
                                    </h5>
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                      {vorschlag.text}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-xs text-gray-500">
                                        {vorschlag.likes} Likes
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {vorschlag.comments} Kommentare
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Beitrag hinzufügen Button */}
                        {isAuthenticated && (
                          <button
                            onClick={() => handleAddContribution(thema)}
                            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors font-medium"
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
