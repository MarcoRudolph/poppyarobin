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
  const [isLiking, setIsLiking] = useState(false);
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
    // Prevent multiple rapid clicks
    if (isLiking) {
      return;
    }

    // Check if user is authenticated via either method
    const hasMagicLinkToken = localStorage.getItem('magiclink_token');
    const hasGoogleAuth = userId;

    if (!hasMagicLinkToken && !hasGoogleAuth) {
      alert('Bitte logge dich ein, um zu liken.');
      return;
    }

    setIsLiking(true);

    try {
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
    } catch (error) {
      console.error('Error handling like:', error);
      // Revert the optimistic update on error
      setLiked(!liked);
    } finally {
      setIsLiking(false);
    }
  };

  if (isDetailedView) {
    // Detailed view with like functionality
    return (
      <div className="mt-4 flex items-center">
        <button
          className={`mr-2 text-4xl ${isLiking ? 'cursor-not-allowed opacity-50' : 'transition-transform hover:scale-110'}`}
          onClick={likeVorschlag}
          disabled={isLiking}
        >
          {liked ? <FcLike /> : <FcLikePlaceholder />}
        </button>
        <span>{likeCount} Likes</span>
        {isLiking && <span className="ml-2 text-sm text-gray-500">...</span>}
      </div>
    );
  }

  // List view
  return (
    <div
      className="relative mb-2 cursor-pointer rounded border p-2 hover:bg-gray-100"
      onClick={() => onClick && onClick(vorschlag)}
    >
      {/* Herz-Icon rechts oben */}
      <button
        className={`absolute right-2 top-2 z-10 rounded-full bg-white p-1 text-xl shadow transition ${
          isLiking ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          likeVorschlag();
        }}
        disabled={isLiking}
        aria-label={liked ? 'Like entfernen' : 'Liken'}
      >
        {liked ? <FcLike /> : <FcLikePlaceholder />}
      </button>
      <h3 className="pr-8 text-xl font-semibold">{vorschlag.ueberschrift}</h3>
      {vorschlag.userName &&
        vorschlag.userName !== 'Seed User' &&
        vorschlag.userName !== 'gelöschter user' && (
          <p className="mb-2 text-sm text-gray-500">von {vorschlag.userName}</p>
        )}
      <p className="text-gray-600">
        {likeCount} Likes | {commentCount} Kommentare
      </p>
    </div>
  );
};

export default Vorschlag;
