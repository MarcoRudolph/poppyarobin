// Comments.tsx

"use client";

import React, { useState, useEffect } from "react";
import { CommentType } from "@/util/types";
import { fetchComments } from "../drizzle/actions";
import Comment from "./Comment"; // Import the Comment component

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
        <Comment key={comment.id} comment={comment} />
      ))}
      {/* You can add a form here to submit new comments */}
    </div>
  );
};

export default Comments;
