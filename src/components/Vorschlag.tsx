'use client';

import React, { useState, useEffect } from 'react';
import { VorschlagType } from '../lib/types';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useSession } from 'next-auth/react';
import { checkIfUserLiked, addLike, removeLike } from '../drizzle/actions';

interface VorschlagProps {
  vorschlag: VorschlagType;
  onClick?: (vorschlag: VorschlagType) => void;
  isDetailedView?: boolean;
}

const Vorschlag: React.FC<VorschlagProps> = ({
  vorschlag,
  onClick,
  isDetailedView = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(vorschlag.likes);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    (async () => {
      if (userId) {
        const numericUserId = parseInt(userId, 10);
        const isLiked = await checkIfUserLiked(numericUserId, vorschlag.id);
        setLiked(isLiked);
      }
    })();
  }, [userId, vorschlag.id]);

  const likeVorschlag = async () => {
    if (!userId) {
      alert('Bitte logge dich ein, um zu liken.');
      return;
    }

    const numericUserId = parseInt(userId, 10);

    if (liked) {
      await removeLike(numericUserId, vorschlag.id);
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      await addLike(numericUserId, vorschlag.id);
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
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
      className="border rounded p-2 mb-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onClick && onClick(vorschlag)}
    >
      <h3 className="text-xl font-semibold">{vorschlag.ueberschrift}</h3>
      <p className="text-gray-600">
        {likeCount} Likes | {vorschlag.comments} Kommentare
      </p>
    </div>
  );
};

export default Vorschlag;
