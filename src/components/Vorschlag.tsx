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

// Extended type to include username
interface VorschlagWithUser extends VorschlagType {
  userName?: string | null;
}

interface VorschlagProps {
  vorschlag: VorschlagWithUser;
  onClick?: (vorschlag: VorschlagWithUser) => void;
  isDetailedView?: boolean;
  onLike?: () => void;
  onLikeUpdate?: (updatedVorschlag: { id: number; likes: number }) => void;
}

const Vorschlag: React.FC<VorschlagProps> = ({
  vorschlag,
  onClick,
  isDetailedView = false,
  onLike,
  onLikeUpdate,
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
      // Check if user is authenticated via either method
      const hasMagicLinkToken = localStorage.getItem('magiclink_token');
      const hasGoogleAuth = userId;

      if (hasMagicLinkToken || hasGoogleAuth) {
        const isLiked = await checkIfUserLikedWithSession(
          userId || hasMagicLinkToken || 'Anonymous',
          user?.email || localStorage.getItem('magiclink_email') || 'Anonymous',
          vorschlag.id,
        );
        setLiked(isLiked);
      }
    })();
  }, [userId, vorschlag.id, user?.email]);

  const likeVorschlag = async () => {
    // Check if user is authenticated via either method
    const hasMagicLinkToken = localStorage.getItem('magiclink_token');
    const hasGoogleAuth = userId;

    if (!hasMagicLinkToken && !hasGoogleAuth) {
      alert('Bitte logge dich ein, um zu liken.');
      return;
    }

    if (liked) {
      await removeLikeWithSession(
        userId || hasMagicLinkToken || 'Anonymous',
        user?.email || localStorage.getItem('magiclink_email') || 'Anonymous',
        vorschlag.id,
      );
      setLiked(false);
    } else {
      await addLikeWithSession(
        userId || hasMagicLinkToken || 'Anonymous',
        user?.email || localStorage.getItem('magiclink_email') || 'Anonymous',
        vorschlag.id,
      );
      setLiked(true);
    }
    // Nach jedem Like/Unlike aktuelle Like-Anzahl aus DB laden
    const latestLikes = await getVorschlagLikes(vorschlag.id);
    setLikeCount(latestLikes);

    // Notify parent component about the updated like count
    if (onLikeUpdate) {
      onLikeUpdate({ id: vorschlag.id, likes: latestLikes });
    }

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
      {vorschlag.userName &&
        vorschlag.userName !== 'Seed User' &&
        vorschlag.userName !== 'gelöschter user' && (
          <p className="text-sm text-gray-500 mb-2">von {vorschlag.userName}</p>
        )}
      <p className="text-gray-600">
        {likeCount} Likes | {commentCount} Kommentare
      </p>
    </div>
  );
};

export default Vorschlag;
