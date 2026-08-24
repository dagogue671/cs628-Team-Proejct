import { useState } from 'react';
import styles from './Feed.module.css';

const initialPosts = [
  {
    id: 1, name: 'Eric Hall', username: 'ehall', initials: 'EH',
    content: 'Just deployed my first Docker container 🎉',
    timestamp: '4m', likes: 18, reposts: 3, liked: false,
    comments: [{ id: 101, author: 'David William Gogue', content: 'Nice work!' }],
  },
  {
    id: 2, name: 'David William Gogue', username: 'dwgogue', initials: 'DWG',
    content: 'Anyone else using React Router for their project?',
    timestamp: '15m', likes: 7, reposts: 1, liked: false, comments: [],
  },
  {
    id: 3, name: 'Lanxi Luo', username: 'lanxi', initials: 'LL',
    content: 'MongoDB aggregation pipelines are finally starting to make sense!',
    timestamp: '32m', likes: 23, reposts: 5, liked: false, comments: [],
  },
];

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');

  // which post's comment panel is open (null = none)
  const [openCommentsId, setOpenCommentsId] = useState(null);
  // draft text per post id
  const [commentDrafts, setCommentDrafts] = useState({});

  const handleCreatePost = (event) => {
    event.preventDefault();
    const content = newPost.trim();
    if (!content) {
      return;
    }
    const post = {
      id: Date.now(), name: 'Current User', username: 'currentuser',
      initials: 'CU', content, timestamp: 'now',
      likes: 0, reposts: 0, liked: false, comments: [],
    };
    setPosts((currentPosts) => [post, ...currentPosts]);
    setNewPost('');
  };

  const handleLike = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }),
    );
  };

  const toggleComments = (postId) => {
    setOpenCommentsId((current) => (current === postId ? null : postId));
  };

  const handleCommentDraftChange = (postId, value) => {
    setCommentDrafts((drafts) => ({ ...drafts, [postId]: value }));
  };

  const handleAddComment = (postId) => {
    const text = (commentDrafts[postId] || '').trim();
    if (!text) {
      return;
    }
    // author is a placeholder until auth wires up the current user
    const comment = { id: Date.now(), author: 'Current User', content: text };
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post,
      ),
    );
    setCommentDrafts((drafts) => ({ ...drafts, [postId]: '' }));
  };

  return (
    <section className={styles.feed}>
      <header className={styles.feedHeader}>
        <h1>Home</h1>
      </header>

      <form className={styles.composer} onSubmit={handleCreatePost}>
        <div className={styles.avatar}>CU</div>
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
        {posts.map((post) => (
          <article className={styles.post} key={post.id}>
            <div className={styles.avatar}>{post.initials}</div>
            <div className={styles.postContent}>
              <header className={styles.postHeader}>
                <strong>{post.name}</strong>
                <span>
                  @{post.username} · {post.timestamp}
                </span>
              </header>

              <p className={styles.postText}>{post.content}</p>

              <div className={styles.actions}>
                <button type="button" onClick={() => toggleComments(post.id)}>
                  💬 <span>{post.comments.length}</span>
                </button>

                <button type="button">
                  ↻ <span>{post.reposts}</span>
                </button>

                <button
                  type="button"
                  className={post.liked ? styles.liked : ''}
                  onClick={() => handleLike(post.id)}
                >
                  {post.liked ? '♥' : '♡'} <span>{post.likes}</span>
                </button>

                <button type="button">↗</button>
              </div>

              {openCommentsId === post.id && (
                <div className={styles.comments}>
                  {post.comments.map((comment) => (
                    <div className={styles.comment} key={comment.id}>
                      <strong>{comment.author}</strong>
                      <span>{comment.content}</span>
                    </div>
                  ))}

                  <div className={styles.commentForm}>
                    <input
                      type="text"
                      value={commentDrafts[post.id] || ''}
                      onChange={(event) =>
                        handleCommentDraftChange(post.id, event.target.value)
                      }
                      placeholder="Write a comment..."
                      maxLength={280}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddComment(post.id)}
                      disabled={!(commentDrafts[post.id] || '').trim()}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}