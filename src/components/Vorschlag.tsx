'use client';

import React, { useState, useEffect } from 'react';
import { VorschlagType } from '../lib/types';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useSupabaseAuth } from '../lib/context/AuthContext';
import {
  getVorschlagLikes,
  getVorschlagCommentsCount,
  addLikeWithSession,
  removeLikeWithSession,
  checkIfUserLikedWithSession,
} from '../drizzle/actions';

interface VorschlagProps {
  vorschlag: VorschlagType;
  onClick?: (vorschlag: VorschlagType) => void;
  isDetailedView?: boolean;
  onLike?: () => void; // <-- add this
}

const Vorschlag: React.FC<VorschlagProps> = ({
  vorschlag,
  onClick,
  isDetailedView = false,
  onLike,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(vorschlag.likes);
  const { user } = useSupabaseAuth();
  const userId = user?.id;
  const [commentCount, setCommentCount] = useState(vorschlag.comments);

  // Lade initial und bei vorschlag.id-Wechsel die aktuelle Kommentar-Anzahl
  useEffect(() => {
    (async () => {
      const latestComments = await getVorschlagCommentsCount(vorschlag.id);
      setCommentCount(latestComments);
    })();
  }, [vorschlag.id]);

  useEffect(() => {
    (async () => {
      if (userId) {
        const isLiked = await checkIfUserLikedWithSession(
          userId,
          user?.email || 'Anonymous',
          vorschlag.id,
        );
        setLiked(isLiked);
      }
    })();
  }, [userId, vorschlag.id]);

  const likeVorschlag = async () => {
    if (!userId) {
      alert('Bitte logge dich ein, um zu liken.');
      return;
    }

    if (liked) {
      await removeLikeWithSession(
        userId,
        user?.email || 'Anonymous',
        vorschlag.id,
      );
      setLiked(false);
    } else {
      await addLikeWithSession(
        userId,
        user?.email || 'Anonymous',
        vorschlag.id,
      );
      setLiked(true);
    }
    // Nach jedem Like/Unlike aktuelle Like-Anzahl aus DB laden
    const latestLikes = await getVorschlagLikes(vorschlag.id);
    setLikeCount(latestLikes);
    if (onLike) onLike(); // <-- call after updating
  };

  if (isDetailedView) {
    // Detailed view with like functionality
    return (
      <div className="flex items-center mt-4">
        <button className="text-4xl mr-2" onClick={likeVorschlag}>
          {liked ? <FcLike /> : <FcLikePlaceholder />}
        </button>
        <span>{likeCount} Likes</span>
      </div>
    );
  }

  // List view
  return (
    <div
      className="relative border rounded p-2 mb-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onClick && onClick(vorschlag)}
    >
      {/* Herz-Icon rechts oben */}
      <button
        className="absolute top-2 right-2 text-xl z-10 bg-white rounded-full p-1 shadow hover:scale-110 transition"
        onClick={(e) => {
          e.stopPropagation();
          likeVorschlag();
        }}
        aria-label={liked ? 'Like entfernen' : 'Liken'}
      >
        {liked ? <FcLike /> : <FcLikePlaceholder />}
      </button>
      <h3 className="text-xl font-semibold pr-8">{vorschlag.ueberschrift}</h3>
      <p className="text-gray-600">
        {likeCount} Likes | {commentCount} Kommentare
      </p>
    </div>
  );
};

export default Vorschlag;
