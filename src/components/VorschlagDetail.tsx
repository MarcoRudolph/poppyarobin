'use client';

import React, { useState, useEffect } from 'react';
import { VorschlagType, CommentType } from '../lib/types';
import {
  fetchComments,
  addLikeWithSession,
  removeLikeWithSession,
  checkIfUserLikedWithSession,
  addLikeToCommentWithSession,
  removeLikeFromCommentWithSession,
  checkIfUserLikedCommentWithSession,
  createCommentWithSession,
  getCurrentLikeCount,
  getCurrentCommentLikeCount,
} from '../drizzle/actions';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { IoArrowBack } from 'react-icons/io5';
import { FaComment, FaHeart } from 'react-icons/fa';
import { useAuthContext } from '../lib/context/AuthContext';

interface VorschlagDetailProps {
  vorschlag: VorschlagType;
  onBack: () => void;
}

const VorschlagDetail: React.FC<VorschlagDetailProps> = ({
  vorschlag,
  onBack,
}) => {
  const { user, isAuthenticated } = useAuthContext();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(vorschlag.likes);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likeLimitReached, setLikeLimitReached] = useState(false);

  const COMMENTS_PER_PAGE = 20;
  const INITIAL_COMMENTS = 3;

  useEffect(() => {
    loadComments();
    checkUserLikeStatus();
  }, [vorschlag.id]);

  const loadComments = async () => {
    try {
      const fetchedComments = await fetchComments(vorschlag.id);
      // Sortiere nach Likes (Top-Kommentare zuerst)
      const sortedComments = fetchedComments.sort((a, b) => b.likes - a.likes);
      setComments(sortedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const checkUserLikeStatus = async () => {
    if (user?.token) {
      const isLiked = await checkIfUserLikedWithSession(
        user.token,
        user.name || 'Anonymous',
        vorschlag.id,
      );
      setLiked(isLiked);
    }
  };

  const handleVorschlagLike = async () => {
    if (!isAuthenticated || !user?.token) {
      alert('Bitte logge dich ein, um zu liken.');
      return;
    }

    if (likeLimitReached) {
      alert(
        'Du hast das Like-Limit für diesen Vorschlag erreicht. Bitte warte 30 Minuten.',
      );
      return;
    }

    try {
      if (liked) {
        await removeLikeWithSession(
          user.token,
          user.name || 'Anonymous',
          vorschlag.id,
        );
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await addLikeWithSession(
          user.token,
          user.name || 'Anonymous',
          vorschlag.id,
        );
        setLiked(true);
        setLikeCount((prev) => prev + 1);

        // Prüfe Like-Limit (4x pro Benutzer) - use the database user ID
        const likeCount = await getCurrentLikeCount(
          user.id, // This should be the database user ID
          vorschlag.id,
        );
        if (likeCount >= 4) {
          setLikeLimitReached(true);
          setTimeout(() => setLikeLimitReached(false), 30 * 60 * 1000); // 30 Minuten
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
      // Show more specific error message
      if (error instanceof Error) {
        alert(`Fehler beim Liken: ${error.message}`);
      } else {
        alert('Fehler beim Liken. Bitte versuche es erneut.');
      }
    }
  };

  const handleCommentLike = async (commentId: number) => {
    if (!isAuthenticated || !user?.token) {
      alert('Bitte logge dich ein, um zu liken.');
      return;
    }

    const comment = comments.find((c) => c.id === commentId);

    if (!comment) return;

    try {
      const isLiked = await checkIfUserLikedCommentWithSession(
        user.token,
        user.name || 'Anonymous',
        commentId,
      );

      if (isLiked) {
        await removeLikeFromCommentWithSession(
          user.token,
          user.name || 'Anonymous',
          commentId,
        );
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, likes: c.likes - 1 } : c,
          ),
        );
      } else {
        // Prüfe Like-Limit für Kommentare (4x pro Benutzer) - use the database user ID
        const currentLikeCount = await getCurrentCommentLikeCount(
          user.id, // This should be the database user ID
          commentId,
        );
        if (currentLikeCount >= 4) {
          alert(
            'Du hast das Like-Limit für diesen Kommentar erreicht. Bitte warte 30 Minuten.',
          );
          return;
        }

        await addLikeToCommentWithSession(
          user.token,
          user.name || 'Anonymous',
          commentId,
        );
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c,
          ),
        );
      }
    } catch (error) {
      console.error('Error handling comment like:', error);
      // Show more specific error message
      if (error instanceof Error) {
        alert(`Fehler beim Liken: ${error.message}`);
      } else {
        alert('Fehler beim Liken. Bitte versuche es erneut.');
      }
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user?.token || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await createCommentWithSession(
        vorschlag.id,
        newComment,
        user.token,
        user.name || 'Anonymous',
      );

      setNewComment('');
      await loadComments(); // Kommentare neu laden
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Show more specific error message
      if (error instanceof Error) {
        alert(`Fehler beim Kommentieren: ${error.message}`);
      } else {
        alert('Fehler beim Kommentieren. Bitte versuche es erneut.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedComments = showAllComments
    ? comments.slice(
        (currentPage - 1) * COMMENTS_PER_PAGE,
        currentPage * COMMENTS_PER_PAGE,
      )
    : comments.slice(0, INITIAL_COMMENTS);

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  return (
    <div className="w-3/5 mx-auto">
      {/* Zurück-Button */}
      <button
        onClick={onBack}
        className={`
          flex items-center space-x-2 mb-6
          bg-halftone
          text-white
          py-3 px-4
          rounded-lg
          font-medium
          hover:opacity-90
          transition-all duration-200 transform hover:scale-105
          shadow-md
          text-xl
        `}
      >
        <IoArrowBack className="text-xl" />
        <span>Zurück zu den Themen</span>
      </button>

      {/* Vorschlag-Details */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {vorschlag.ueberschrift}
        </h1>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {vorschlag.text}
        </p>

        {/* Like-Button und Statistiken */}
        <div className="flex items-center space-x-6">
          <button
            onClick={handleVorschlagLike}
            disabled={likeLimitReached}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              liked
                ? 'text-red-500 bg-red-50'
                : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
            } ${likeLimitReached ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {liked ? (
              <FcLike className="text-2xl" />
            ) : (
              <FcLikePlaceholder className="text-2xl" />
            )}
            <span className="text-lg font-medium">{likeCount}</span>
          </button>

          <div className="flex items-center space-x-2 text-gray-600">
            <FaComment className="text-xl" />
            <span className="text-lg">{comments.length} Kommentare</span>
          </div>
        </div>
      </div>

      {/* Kommentare */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Kommentare</h2>

        {/* Kommentar-Formular */}
        {isAuthenticated && (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Schreibe einen Kommentar..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none"
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {newComment.length}/500 Zeichen
              </span>
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wird gespeichert...' : 'Kommentar hinzufügen'}
              </button>
            </div>
          </form>
        )}

        {/* Kommentare-Liste */}
        <div className="space-y-4">
          {displayedComments.map((comment) => (
            <div
              key={comment.id}
              className="border-l-4 border-pink-400 bg-gray-50 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-800">
                  {comment.userName || 'Anonym'}
                </span>
                <button
                  onClick={() => handleCommentLike(comment.id)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <FaHeart
                    className={
                      comment.likes > 0 ? 'text-red-500' : 'text-gray-400'
                    }
                  />
                  <span className="text-sm">{comment.likes}</span>
                </button>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {comments.length > INITIAL_COMMENTS && (
          <div className="mt-6">
            {!showAllComments ? (
              <button
                onClick={() => setShowAllComments(true)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Mehr anzeigen ({comments.length - INITIAL_COMMENTS} weitere)
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Seite {currentPage} von {totalPages}
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VorschlagDetail;
