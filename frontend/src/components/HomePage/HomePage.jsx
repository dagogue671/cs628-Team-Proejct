import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { addFriend, getUsers } from '../../api/users';
import styles from './HomePage.module.css';
import Feed from '../Feed';

function getUsername(email) {
  return email?.split('@')[0] || 'unknown';
}

export default function HomePage({ onSignOut }) {
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem('authUser') ?? 'null'),
  );
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    getUsers(currentUser._id)
      .then((data) => setSuggestedUsers(data.users))
      .catch(() => setSuggestedUsers([]));
  }, [currentUser]);

  const handleFollow = async (friendId) => {
    if (!currentUser) {
      return;
    }
    const { user } = await addFriend(currentUser._id, friendId);
    localStorage.setItem('authUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const friendsToSuggest = suggestedUsers.filter(
    (user) => !currentUser?.friends?.includes(user._id),
  );

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const searchResults = trimmedQuery
    ? suggestedUsers
        .filter(
          (user) =>
            user.name.toLowerCase().includes(trimmedQuery) ||
            user.email.toLowerCase().includes(trimmedQuery),
        )
        .slice(0, 20)
    : [];

  return (
    <div className={styles.page}>
      <aside className={styles.leftSidebar}>
        <div className={styles.brand}>CS628</div>

        {currentUser && (
          <div className={styles.currentUser}>
            <strong>{currentUser.name}</strong>
          </div>
        )}

        <nav className={styles.nav}>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>

          <NavLink to="/search">Search</NavLink>
          <NavLink to="/friends">Friends</NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
          <NavLink to="/profile">Profile</NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Settings
          </NavLink>

          <button type="button" className={styles.signOutButton} onClick={onSignOut}>
            Sign out
          </button>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <Feed />
      </main>

      <aside className={styles.rightSidebar}>
        <section className={styles.sidebarCard}>
          <h2>Search</h2>

          <input
            type="text"
            placeholder="Search CS628"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          {trimmedQuery && searchResults.length === 0 && (
            <p className={styles.emptyState}>No users found.</p>
          )}

          {searchResults.map((user) => {
            const isFriend = currentUser?.friends?.includes(user._id);
            return (
              <div className={styles.followUser} key={user._id}>
                <div>
                  <strong>{user.name}</strong>
                  <p>@{getUsername(user.email)}</p>
                </div>

                {!isFriend && (
                  <button type="button" onClick={() => handleFollow(user._id)}>
                    Follow
                  </button>
                )}
              </div>
            );
          })}
        </section>

        <section className={styles.sidebarCard}>
          <h2>Trending</h2>

          <div className={styles.trend}>
            <span>Technology</span>
            <strong>#React</strong>
            <small>1,284 posts</small>
          </div>

          <div className={styles.trend}>
            <span>Development</span>
            <strong>#MERN</strong>
            <small>932 posts</small>
          </div>

          <div className={styles.trend}>
            <span>College</span>
            <strong>#WebDevelopment</strong>
            <small>615 posts</small>
          </div>
        </section>

        <section className={styles.sidebarCard}>
          <h2>Who to Follow</h2>

          {friendsToSuggest.length === 0 && <p className={styles.emptyState}>No suggestions right now.</p>}

          {friendsToSuggest.map((user) => (
            <div className={styles.followUser} key={user._id}>
              <div>
                <strong>{user.name}</strong>
                <p>@{getUsername(user.email)}</p>
              </div>

              <button type="button" onClick={() => handleFollow(user._id)}>
                Follow
              </button>
            </div>
          ))}
        </section>
      </aside>
    </div>
  );
}