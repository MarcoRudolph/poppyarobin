'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
import { useSupabaseAuth } from '../lib/context/AuthContext';
import { useHydration } from '../hooks/useHydration';

// Extended type to include username
interface VorschlagWithUser extends VorschlagType {
  userName?: string | null;
}

interface VorschlagDetailProps {
  vorschlag: VorschlagWithUser;
  onBack?: (updatedVorschlag?: { id: number; likes: number }) => void;
  onLikeUpdate?: (updatedVorschlag: { id: number; likes: number }) => void;
  showBackButton?: boolean;
}

const VorschlagDetail: React.FC<VorschlagDetailProps> = ({
  vorschlag,
  onBack,
  onLikeUpdate,
  showBackButton = true,
}) => {
  const { user, isAuthenticated } = useSupabaseAuth();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(vorschlag.likes);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [likingComments, setLikingComments] = useState<Set<number>>(new Set());
  const [likeLimitReached, setLikeLimitReached] = useState(false);
  const isHydrated = useHydration();

  const COMMENTS_PER_PAGE = 20;
  const INITIAL_COMMENTS = 3;

  // Helper function to get token from localStorage
  const getToken = useCallback(() => {
    if (!isHydrated) return null;
    return localStorage.getItem('magiclink_token');
  }, [isHydrated]);

  // Helper function to get user name from localStorage
  const getUserName = useCallback(() => {
    if (!isHydrated) return 'Anonymous';
    return localStorage.getItem('magiclink_email') || 'Anonymous';
  }, [isHydrated]);

  const loadComments = useCallback(async () => {
    try {
      const fetchedComments = await fetchComments(vorschlag.id);
      // Sortiere nach Likes (Top-Kommentare zuerst)
      const sortedComments = fetchedComments.sort((a, b) => b.likes - a.likes);
      setComments(sortedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }, [vorschlag.id]);

  const checkUserLikeStatus = useCallback(async () => {
    try {
      if (user?.id) {
        // Google OAuth user - use Supabase user ID and email
        const isLiked = await checkIfUserLikedWithSession(
          user.id,
          user.email || 'Anonymous',
          vorschlag.id,
        );
        setLiked(isLiked);
      } else {
        // Magic Link user - use token from localStorage
        const token = getToken();
        if (token) {
          const isLiked = await checkIfUserLikedWithSession(
            token,
            getUserName(),
            vorschlag.id,
          );
          setLiked(isLiked);
        }
      }
    } catch (error) {
      console.error('Error checking user like status:', error);
    }
  }, [user?.id, user?.email, vorschlag.id, getToken, getUserName]);

  useEffect(() => {
    loadComments();
    checkUserLikeStatus();
  }, [vorschlag.id, loadComments, checkUserLikeStatus]);

  const handleVorschlagLike = async () => {
    // Prevent multiple rapid clicks
    if (isLiking) {
      return;
    }

    // Check if user is authenticated via either method
    const hasMagicLinkToken = getToken();
    const hasGoogleAuth = user?.id;

    if (!hasMagicLinkToken && !hasGoogleAuth) {
      alert('Bitte logge dich ein, um zu liken.');
      return;
    }

    if (likeLimitReached) {
      alert(
        'Du hast das Like-Limit für diesen Vorschlag erreicht. Bitte warte 30 Minuten.',
      );
      return;
    }

    setIsLiking(true);

    try {
      if (liked) {
        // Remove like
        if (user?.id) {
          // Google OAuth user - use Supabase user ID and email
          await removeLikeWithSession(
            user.id,
            user.email || 'Anonymous',
            vorschlag.id,
          );
        } else {
          // Magic Link user - use token from localStorage
          const token = getToken();
          if (!token) {
            throw new Error('Kein gültiger Token gefunden');
          }
          await removeLikeWithSession(token, getUserName(), vorschlag.id);
        }

        setLiked(false);
        const newLikeCount = likeCount - 1;
        setLikeCount(newLikeCount);

        // Notify parent component about the updated like count
        if (onLikeUpdate) {
          onLikeUpdate({ id: vorschlag.id, likes: newLikeCount });
        }
      } else {
        // Add like
        if (user?.id) {
          // Google OAuth user - use Supabase user ID and email
          await addLikeWithSession(
            user.id,
            user.email || 'Anonymous',
            vorschlag.id,
          );
        } else {
          // Magic Link user - use token from localStorage
          const token = getToken();
          if (!token) {
            throw new Error('Kein gültiger Token gefunden');
          }
          await addLikeWithSession(token, getUserName(), vorschlag.id);
        }

        setLiked(true);
        const newLikeCount = likeCount + 1;
        setLikeCount(newLikeCount);

        // Prüfe Like-Limit (4x pro Benutzer) - use the database user ID
        const currentLikeCount = await getCurrentLikeCount(
          parseInt(user?.id || '0', 10),
          vorschlag.id,
        );
        if (currentLikeCount >= 4) {
          setLikeLimitReached(true);
          setTimeout(() => setLikeLimitReached(false), 30 * 60 * 1000); // 30 Minuten
        }

        // Notify parent component about the updated like count
        if (onLikeUpdate) {
          onLikeUpdate({ id: vorschlag.id, likes: newLikeCount });
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
      // Revert the optimistic update on error
      setLiked(!liked);
      // Show more specific error message
      if (error instanceof Error) {
        alert(`Fehler beim Liken: ${error.message}`);
      } else {
        alert('Fehler beim Liken. Bitte versuche es erneut.');
      }
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentLike = async (commentId: number) => {
    // Prevent multiple rapid clicks on the same comment
    if (likingComments.has(commentId)) {
      return;
    }

    // Check if user is authenticated via either method
    const hasMagicLinkToken = getToken();
    const hasGoogleAuth = user?.id;

    if (!hasMagicLinkToken && !hasGoogleAuth) {
      alert('Bitte logge dich ein, um zu liken.');
      return;
    }

    const comment = comments.find((c) => c.id === commentId);

    if (!comment) return;

    setLikingComments((prev) => new Set(prev).add(commentId));

    try {
      let isLiked: boolean;

      // Check if we have a Supabase user (Google OAuth) or need to use Magic Link token
      if (user?.id) {
        // Google OAuth user - use Supabase user ID and email
        isLiked = await checkIfUserLikedCommentWithSession(
          user.id,
          user.email || 'Anonymous',
          commentId,
        );
      } else {
        // Magic Link user - use token from localStorage
        const token = getToken();
        if (!token) {
          throw new Error('Kein gültiger Token gefunden');
        }
        isLiked = await checkIfUserLikedCommentWithSession(
          token,
          getUserName(),
          commentId,
        );
      }

      if (isLiked) {
        // Remove like
        if (user?.id) {
          await removeLikeFromCommentWithSession(
            user.id,
            user.email || 'Anonymous',
            commentId,
          );
        } else {
          const token = getToken();
          if (token) {
            await removeLikeFromCommentWithSession(
              token,
              getUserName(),
              commentId,
            );
          }
        }

        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, likes: c.likes - 1 } : c,
          ),
        );
      } else {
        // Add like - check like limit first
        const currentLikeCount = await getCurrentCommentLikeCount(
          parseInt(user?.id || '0', 10),
          commentId,
        );
        if (currentLikeCount >= 4) {
          alert(
            'Du hast das Like-Limit für diesen Kommentar erreicht. Bitte warte 30 Minuten.',
          );
          return;
        }

        // Add like
        if (user?.id) {
          await addLikeToCommentWithSession(
            user.id,
            user.email || 'Anonymous',
            commentId,
          );
        } else {
          const token = getToken();
          if (token) {
            await addLikeToCommentWithSession(token, getUserName(), commentId);
          }
        }

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
    } finally {
      setLikingComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated via either method
    const hasMagicLinkToken = getToken();
    const hasGoogleAuth = user?.id;

    if (!hasMagicLinkToken && !hasGoogleAuth) {
      alert('Bitte logge dich ein, um zu kommentieren.');
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // Check if we have a Supabase user (Google OAuth) or need to use Magic Link token
      if (user?.id) {
        // Google OAuth user - use Supabase user ID and email
        await createCommentWithSession(
          vorschlag.id,
          newComment,
          user.id, // Use Supabase user ID as token
          user.email || 'Anonymous',
        );
      } else {
        // Magic Link user - use token from localStorage
        const token = getToken();
        if (!token) {
          throw new Error('Kein gültiger Token gefunden');
        }
        await createCommentWithSession(
          vorschlag.id,
          newComment,
          token,
          getUserName(),
        );
      }

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

  // Don't render the component until hydration is complete
  if (!isHydrated) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 rounded-xl bg-white p-8 shadow-lg">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-5/6 rounded bg-gray-200"></div>
            <div className="h-4 w-4/5 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Zurück-Button (optional) */}
      {showBackButton && onBack && (
        <button
          onClick={() => onBack({ id: vorschlag.id, likes: likeCount })}
          className={`
            bg-halftone mb-6 flex items-center
            space-x-2
            rounded-lg
            px-4 py-3
            text-xl
            font-medium
            text-white
            shadow-md transition-all duration-200 hover:scale-105
            hover:opacity-90
          `}
        >
          <IoArrowBack className="text-xl" />
          <span>Zurück zu den Themen</span>
        </button>
      )}

      {/* Vorschlag-Details */}
      <div className="mb-8 rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          {vorschlag.ueberschrift}
        </h1>
        {vorschlag.userName &&
          vorschlag.userName !== 'Seed User' &&
          vorschlag.userName !== 'gelöschter user' && (
            <p className="mb-4 text-lg text-gray-500">
              von {vorschlag.userName}
            </p>
          )}
        <p className="mb-6 text-xl leading-relaxed text-gray-600">
          {vorschlag.text}
        </p>

        {/* Like-Button und Statistiken */}
        <div className="flex items-center space-x-6">
          <button
            onClick={handleVorschlagLike}
            disabled={likeLimitReached || isLiking}
            className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-all ${
              liked
                ? 'bg-red-50 text-red-500'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            } ${likeLimitReached || isLiking ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {liked ? (
              <FcLike className="text-2xl" />
            ) : (
              <FcLikePlaceholder className="text-2xl" />
            )}
            <span className="text-lg font-medium">{likeCount}</span>
            {isLiking && <span className="text-sm text-gray-500">...</span>}
          </button>

          <div className="flex items-center space-x-2 text-gray-600">
            <FaComment className="text-xl" />
            <span className="text-lg">{comments.length} Kommentare</span>
          </div>
        </div>
      </div>

      {/* Kommentare */}
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Kommentare</h2>
        {/* Kommentar-Liste, scrollbar */}
        {comments.length > 0 ? (
          <div className="mb-4 max-h-60 space-y-4 overflow-y-auto pr-2">
            {displayedComments.map((comment) => (
              <div key={comment.id} className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center">
                  <span className="mr-2 font-semibold text-gray-800">
                    {comment.userName}
                  </span>
                  <button
                    className={`ml-auto text-pink-500 hover:text-pink-700 ${
                      likingComments.has(comment.id)
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    }`}
                    onClick={() => handleCommentLike(comment.id)}
                    disabled={likingComments.has(comment.id)}
                  >
                    <FaHeart
                      className={`mr-1 inline-block ${
                        comment.likes > 0 ? 'text-pink-500' : 'text-gray-400'
                      }`}
                    />
                    {comment.likes}
                    {likingComments.has(comment.id) && (
                      <span className="ml-1 text-xs">...</span>
                    )}
                  </button>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-4 text-gray-500">Noch keine Kommentare.</p>
        )}

        {/* Kommentar-Formular */}
        {(getToken() || user?.id) && (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Schreibe einen Kommentar..."
              className="w-full resize-none rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-pink-400"
              rows={3}
              maxLength={500}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {newComment.length}/500 Zeichen
              </span>
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="rounded-lg bg-pink-500 px-6 py-2 text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Wird gespeichert...' : 'Kommentar hinzufügen'}
              </button>
            </div>
          </form>
        )}

        {/* Pagination */}
        {comments.length > INITIAL_COMMENTS && (
          <div className="mt-6">
            {!showAllComments ? (
              <button
                onClick={() => setShowAllComments(true)}
                className="rounded-lg bg-gray-200 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-300"
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
                        className={`rounded px-3 py-1 ${
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
