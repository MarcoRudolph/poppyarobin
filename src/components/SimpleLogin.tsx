'use client';

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface SimpleLoginProps {
  onSuccess?: () => void;
}

const SimpleLogin: React.FC<SimpleLoginProps> = ({ onSuccess }) => {
  const { register, isRegistering } = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Bitte gib deinen Namen ein');
      return;
    }

    try {
      await register(name.trim());
      onSuccess?.();
    } catch (error) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Jetzt mitmachen
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dein Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Gib deinen Namen ein"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={isRegistering || !name.trim()}
          className="w-full bg-pink-500 text-white py-3 px-4 rounded-md hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-colors"
        >
          {isRegistering ? 'Wird erstellt...' : 'Jetzt mitmachen'}
        </button>
      </form>
    </div>
  );
};

export default SimpleLogin;
