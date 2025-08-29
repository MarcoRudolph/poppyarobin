'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Vorschlag from './Vorschlag';
import VorschlagDetail from './VorschlagDetail';
import Comments from './Comments';
import { ThemaType, VorschlagType } from '../lib/types';
import {
  ThemaWithVorschlaegeWithUser,
  VorschlagWithUser,
} from '../drizzle/schema';
import ContributionForm from './ContributionForm';

interface ThemaProps {
  thema: ThemaWithVorschlaegeWithUser;
  onContributionAdded?: () => void;
}

const Thema: React.FC<ThemaProps> = ({ thema, onContributionAdded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedVorschlag, setSelectedVorschlag] =
    useState<VorschlagType | null>(null);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [sortedVorschlaege, setSortedVorschlaege] = useState<VorschlagType[]>(
    [],
  );

  // Sort vorschlaege by likes count (highest first)
  useEffect(() => {
    const sorted = [...thema.vorschlaege].sort((a, b) => b.likes - a.likes);
    setSortedVorschlaege(sorted);
  }, [thema.vorschlaege]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const showMore = () => {
    setDisplayCount(sortedVorschlaege.length);
  };

  const handleVorschlagClick = (vorschlag: VorschlagType) => {
    setSelectedVorschlag(vorschlag);
  };

  const handleBack = (updatedVorschlag?: { id: number; likes: number }) => {
    setSelectedVorschlag(null);
  };

  const handleLikeUpdate = (updatedVorschlag: {
    id: number;
    likes: number;
  }) => {
    // Update the like count in the sorted list and re-sort
    setSortedVorschlaege((prev) => {
      const updated = prev.map((v) =>
        v.id === updatedVorschlag.id
          ? { ...v, likes: updatedVorschlag.likes }
          : v,
      );
      return updated.sort((a, b) => b.likes - a.likes);
    });
  };

  const handleBackButtonClick = () => {
    handleBack();
  };

  const handleAddContribution = () => {
    setShowContributionForm(true);
  };

  const handleContributionSubmit = () => {
    setShowContributionForm(false);
    // Refresh the data after contribution is added
    if (onContributionAdded) {
      onContributionAdded();
    }
  };

  const handleContributionCancel = () => {
    setShowContributionForm(false);
  };

  const displayedVorschlaege = isExpanded
    ? sortedVorschlaege.slice(0, displayCount)
    : [];

  return (
    <>
      <div className="bg-white border rounded-lg shadow-md p-4 mb-4 transition-all">
        {/* Thema Header */}
        <div
          className="cursor-pointer flex justify-between items-center p-4 rounded-md hover:bg-gray-100 transition"
          onClick={handleExpand}
        >
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {thema.name}
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddContribution();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              + Beitrag hinzufügen
            </button>
          </div>
          <span className="text-gray-600 text-xl">
            {isExpanded ? '▲' : '▼'}
          </span>
        </div>

        {/* Expand Animation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="mt-4 space-y-2">
            {displayedVorschlaege.map((vorschlag) => (
              <Vorschlag
                key={vorschlag.id}
                vorschlag={vorschlag}
                onClick={handleVorschlagClick}
              />
            ))}
            {displayCount < sortedVorschlaege.length && (
              <button
                className="mt-2 text-blue-500 hover:underline"
                onClick={showMore}
              >
                Mehr anzeigen
              </button>
            )}
          </div>
        </motion.div>

        {/* Vorschlag Detail View */}
        {selectedVorschlag && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 p-6 shadow-lg overflow-auto"
          >
            {/* Custom back button */}
            <button
              onClick={handleBackButtonClick}
              className="text-2xl mb-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Zurück zu den Themen
            </button>

            <VorschlagDetail
              vorschlag={selectedVorschlag}
              onBack={handleBack}
              onLikeUpdate={handleLikeUpdate}
              showBackButton={false}
            />
          </motion.div>
        )}
      </div>

      {/* Contribution Form Modal */}
      {showContributionForm && (
        <ContributionForm
          thema={thema}
          onSubmit={handleContributionSubmit}
          onCancel={handleContributionCancel}
        />
      )}
    </>
  );
};

export default Thema;
