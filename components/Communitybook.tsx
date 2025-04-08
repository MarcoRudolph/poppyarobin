'use client';

import React, { useState, useEffect } from 'react';
import Thema from './Thema';
import { ThemaType } from '@/util/types';
import '../app/globals.css';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { signIn, signOut, useSession } from 'next-auth/react';

interface CommunitybookProps {
  themenList: ThemaType[];
}

const Communitybook: React.FC<CommunitybookProps> = ({ themenList }) => {
  const [name, setName] = useState(''); // State für den Textbox-Inhalt
  const { data: session } = useSession();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId && userId.length > 0 && !session) {
      signIn('credentials', { id: userId, name, redirect: false }).then(
        (result) => {
          if (result && result.error) {
            console.error('Login fehlgeschlagen:', result.error);
          }
        },
      );
    }
  }, [session]);

  const teilnehmen = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4(); // Neue UUID generieren
      localStorage.setItem('userId', userId);
    }

    signIn('credentials', { id: userId, name });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-fixed bg-top">
      {/* 
      
      style={{
        backgroundImage: 'url("/images/creatures2.webp")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: 'white', // Weißer Hintergrund für zusätzlichen Platz
        minHeight: '100vh',
        width: '100%',
      }}
    
      */}

      {/* Container für Text und Bild */}
      <div
        className="flex flex-col md:flex-row items-center w-full mt-5 p-2 rounded-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Halbtransparenter Hintergrund
          backdropFilter: 'blur(5px)', // Weicher Hintergrundeffekt
        }}
      >
        {/* Willkommen  Textbereich */}
        <div className="text-center w-3/5 mx-auto mt-6 border-blue-gray-400 border-b-2">
          <h2 className="text-9xl font-semibold text-gray-800 w-full text-left">
            Eure Ideen,
          </h2>
          <h2 className="text-9xl font-semibold text-gray-800 w-full text-left ml-[180px]">
            eure Geschichte
          </h2>
          <p className="text-2xl text-gray-700 mt-3 w-full font-sans text-center">
            Wir schreiben ein Buch nach euren Vorstellungen. Ihr könnt Themen
            vorschlagen, andere Vorschläge liken und kommentieren. Kommentare
            können auch ins Buch einfließen. Die Likes entscheiden!
          </p>
        </div>
      </div>
      {!session && (
        <div className="flex flex-col items-center mt-6 space-y-4">
          <input
            id="username"
            type="text"
            placeholder="Dein Name"
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
          />
          <button
            type="button"
            onClick={teilnehmen}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Ich will teilnehmen!
          </button>
        </div>
      )}
      {session && session.user?.name && (
        <div className="flex items-center space-x-4">
          <p>Hallo {session.user?.name}</p>
        </div>
      )}
      {/* Liste mit halbtransparentem Hintergrund */}
      <div
        className="w-full max-w-4xl mt-10 p-6 rounded-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Halbtransparenter Hintergrund
          backdropFilter: 'blur(5px)', // Weicher Hintergrundeffekt
        }}
      >
        {themenList.map((thema) => (
          <div key={thema.id} className="mb-8">
            <Thema thema={thema} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communitybook;
