'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Vorschlag from './Vorschlag';
import Comments from './Comments';
import { ThemaType, VorschlagType } from '../lib/types';
import ContributionForm from './ContributionForm';

interface ThemaProps {
  thema: ThemaType;
  onContributionAdded?: () => void;
}

const Thema: React.FC<ThemaProps> = ({ thema, onContributionAdded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedVorschlag, setSelectedVorschlag] =
    useState<VorschlagType | null>(null);
  const [showContributionForm, setShowContributionForm] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const showMore = () => {
    setDisplayCount(thema.vorschlaege.length);
  };

  const handleVorschlagClick = (vorschlag: VorschlagType) => {
    setSelectedVorschlag(vorschlag);
  };

  const handleBack = () => {
    setSelectedVorschlag(null);
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
    ? thema.vorschlaege.slice(0, displayCount)
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
            {displayCount < thema.vorschlaege.length && (
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
            <button onClick={handleBack} className="text-2xl mb-4">
              ← Zurück
            </button>
            <h2 className="text-3xl font-bold">
              {selectedVorschlag.ueberschrift}
            </h2>
            <p className="mt-4 text-gray-700">{selectedVorschlag.text}</p>
            <Vorschlag vorschlag={selectedVorschlag} isDetailedView={true} />
            <Comments vorschlagId={selectedVorschlag.id} />
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
