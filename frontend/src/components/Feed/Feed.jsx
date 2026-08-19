import { useState } from 'react';
import styles from './Feed.module.css';

const initialPosts = [
  {
    id: 1,
    name: 'Eric Hall',
    username: 'ehall',
    initials: 'EH',
    content: 'Just deployed my first Docker container 🎉',
    timestamp: '4m',
    likes: 18,
    replies: 4,
    reposts: 3,
    liked: false,
  },
  {
    id: 2,
    name: 'David William Gogue',
    username: 'dwgogue',
    initials: 'DWG',
    content: 'Anyone else using React Router for their project?',
    timestamp: '15m',
    likes: 7,
    replies: 6,
    reposts: 1,
    liked: false,
  },
  {
    id: 3,
    name: 'Lanxi Luo',
    username: 'lanxi',
    initials: 'LL',
    content:
      'MongoDB aggregation pipelines are finally starting to make sense!',
    timestamp: '32m',
    likes: 23,
    replies: 2,
    reposts: 5,
    liked: false,
  },
  {
    id: 4,
    name: 'Alex Morgan',
    username: 'alexm',
    initials: 'AM',
    content:
      'Finished connecting our Express API to the React frontend today',
    timestamp: '1h',
    likes: 14,
    replies: 3,
    reposts: 2,
    liked: false,
  },
];

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');

  const handleCreatePost = (event) => {
    event.preventDefault();

    const content = newPost.trim();

    if (!content) {
      return;
    }

    const post = {
      id: Date.now(),
      name: 'Current User',
      username: 'currentuser',
      initials: 'CU',
      content,
      timestamp: 'now',
      likes: 0,
      replies: 0,
      reposts: 0,
      liked: false,
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
                <button type="button">
                  💬 <span>{post.replies}</span>
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
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}