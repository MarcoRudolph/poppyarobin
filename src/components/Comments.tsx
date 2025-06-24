// Comments.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { CommentType } from '../lib/types';
import { fetchComments } from '../drizzle/actions';
import { FaHeart } from 'react-icons/fa';

interface CommentsProps {
  vorschlagId: number;
}

const Comments: React.FC<CommentsProps> = ({ vorschlagId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchComments(vorschlagId);
      setComments(data);
    };
    loadComments();
  }, [vorschlagId]);

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold">Kommentare</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="border-t pt-2 mt-2">
          <p>
            <strong>{comment.userName ?? 'Unknown User'}</strong>:{' '}
            {comment.text}
          </p>
          <div className="flex items-center">
            <FaHeart className="text-red-500 mr-2" />
            <span>{comment.likes} Likes</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
