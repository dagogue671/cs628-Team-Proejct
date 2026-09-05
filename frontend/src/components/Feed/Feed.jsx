import { useEffect, useState } from 'react';
import { addComment, createPost, getPosts, toggleLike } from '../../api/posts';
import styles from './Feed.module.css';

function getInitials(name) {
  return name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';
}

function getUsername(email) {
  return email?.split('@')[0] || 'unknown';
}

function formatTimestamp(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export default function Feed() {
  const currentUser = JSON.parse(localStorage.getItem('authUser') ?? 'null');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState('');

  // which post's comment panel is open (null = none)
  const [openCommentsId, setOpenCommentsId] = useState(null);
  // draft text per post id
  const [commentDrafts, setCommentDrafts] = useState({});

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data.posts))
      .catch((fetchError) => setError(fetchError.message));
  }, []);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    const content = newPost.trim();
    if (!content || !currentUser) {
      return;
    }
    try {
      const { post } = await createPost({ authorId: currentUser._id, content });
      setPosts((currentPosts) => [post, ...currentPosts]);
      setNewPost('');
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const handleLike = async (postId) => {
    if (!currentUser) {
      return;
    }
    try {
      const { post } = await toggleLike(postId, currentUser._id);
      setPosts((currentPosts) => currentPosts.map((p) => (p._id === postId ? post : p)));
    } catch (likeError) {
      setError(likeError.message);
    }
  };

  const toggleComments = (postId) => {
    setOpenCommentsId((current) => (current === postId ? null : postId));
  };

  const handleCommentDraftChange = (postId, value) => {
    setCommentDrafts((drafts) => ({ ...drafts, [postId]: value }));
  };

  const handleAddComment = async (postId) => {
    const text = (commentDrafts[postId] || '').trim();
    if (!text || !currentUser) {
      return;
    }
    try {
      const { post } = await addComment(postId, { authorId: currentUser._id, content: text });
      setPosts((currentPosts) => currentPosts.map((p) => (p._id === postId ? post : p)));
      setCommentDrafts((drafts) => ({ ...drafts, [postId]: '' }));
    } catch (commentError) {
      setError(commentError.message);
    }
  };

  return (
    <section className={styles.feed}>
      <header className={styles.feedHeader}>
        <h1>Home</h1>
      </header>

      {error && <p className={styles.error} role="alert">{error}</p>}

      <form className={styles.composer} onSubmit={handleCreatePost}>
        <div className={styles.avatar}>{getInitials(currentUser?.name)}</div>
        <div className={styles.composerContent}>
          <textarea
            value={newPost}
            onChange={(event) => setNewPost(event.target.value)}
            placeholder="What's happening?"
            maxLength={280}
          />
          <div className={styles.composerFooter}>
            <span>{newPost.length}/280</span>
            <button type="submit" disabled={!newPost.trim()}>
              Post
            </button>
          </div>
        </div>
      </form>

      <div>
        {posts.map((post) => {
          const liked = currentUser ? post.likes.includes(currentUser._id) : false;
          return (
            <article className={styles.post} key={post._id}>
              <div className={styles.avatar}>{getInitials(post.author?.name)}</div>
              <div className={styles.postContent}>
                <header className={styles.postHeader}>
                  <strong>{post.author?.name}</strong>
                  <span>
                    @{getUsername(post.author?.email)} · {formatTimestamp(post.createdAt)}
                  </span>
                </header>

                <p className={styles.postText}>{post.content}</p>

                <div className={styles.actions}>
                  <button type="button" onClick={() => toggleComments(post._id)}>
                    💬 <span>{post.comments.length}</span>
                  </button>

                  <button type="button">
                    ↻ <span>0</span>
                  </button>

                  <button
                    type="button"
                    className={liked ? styles.liked : ''}
                    onClick={() => handleLike(post._id)}
                  >
                    {liked ? '♥' : '♡'} <span>{post.likes.length}</span>
                  </button>

                  <button type="button">↗</button>
                </div>

                {openCommentsId === post._id && (
                  <div className={styles.comments}>
                    {post.comments.map((comment) => (
                      <div className={styles.comment} key={comment._id}>
                        <strong>{comment.author?.name}</strong>
                        <span>{comment.content}</span>
                      </div>
                    ))}

                    <div className={styles.commentForm}>
                      <input
                        type="text"
                        value={commentDrafts[post._id] || ''}
                        onChange={(event) =>
                          handleCommentDraftChange(post._id, event.target.value)
                        }
                        placeholder="Write a comment..."
                        maxLength={280}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddComment(post._id)}
                        disabled={!(commentDrafts[post._id] || '').trim()}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}