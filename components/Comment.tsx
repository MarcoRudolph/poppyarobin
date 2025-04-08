// Comment.tsx

"use client";

import React, { useState, useEffect } from "react";
import { CommentType } from "@/util/types";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useSession } from "next-auth/react";
import {
  checkIfUserLikedComment,
  addLikeToComment,
  removeLikeFromComment,
} from "../drizzle/actions";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  useEffect(() => {
    (async () => {
      if (userId) {
        const numericUserId = parseInt(userId, 10);
        const isLiked = await checkIfUserLikedComment(numericUserId, comment.id);
        setLiked(isLiked);
      }
    })();
  }, [userId, comment.id]);

  const likeComment = async () => {
    if (!userId) {
      alert("Bitte logge dich ein, um zu liken.");
      return;
    }

    const numericUserId = parseInt(userId, 10);

    if (liked) {
      await removeLikeFromComment(numericUserId, comment.id);
      setLiked(false);
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      await addLikeToComment(numericUserId, comment.id);
      setLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="border-t pt-2 mt-2">
      <p>
        <strong>{comment.userName ?? "Unknown User"}</strong>: {comment.text}
      </p>
      <div className="flex items-center">
        <button className="text-xl mr-2" onClick={likeComment}>
          {liked ? <FcLike /> : <FcLikePlaceholder />}
        </button>
        <span>{likeCount} Likes</span>
      </div>
    </div>
  );
};

export default Comment;
