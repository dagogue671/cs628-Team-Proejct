import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getFriends, removeFriend } from '../../api/users';
import styles from './Friends.module.css';

function getUsername(email) {
  return email?.split('@')[0] || 'unknown';
}

export default function Friends({ onSignOut }) {
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem('authUser') ?? 'null'),
  );
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    getFriends(currentUser._id)
      .then((data) => setFriends(data.friends))
      .catch(() => setFriends([]));
  }, [currentUser?._id]);

  const handleUnfollow = async (friendId) => {
    if (!currentUser) {
      return;
    }
    const { user } = await removeFriend(currentUser._id, friendId);
    localStorage.setItem('authUser', JSON.stringify(user));
    setCurrentUser(user);
    setFriends((currentFriends) => currentFriends.filter((friend) => friend._id !== friendId));
  };

  return (
    <div className={styles.page}>
      <aside className={styles.leftSidebar}>
        <div className={styles.brand}>CS628</div>

        <nav className={styles.nav}>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink
            to="/friends"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Friends
          </NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/settings">Settings</NavLink>

          <button type="button" className={styles.signOutButton} onClick={onSignOut}>
            Sign out
          </button>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Friends</h1>
          <p>Everyone you've followed on CS628.</p>
        </header>

        <div className={styles.friendList}>
          {friends.length === 0 && (
            <p className={styles.emptyState}>You haven't added any friends yet.</p>
          )}

          {friends.map((friend) => (
            <div className={styles.friendRow} key={friend._id}>
              <div>
                <strong>{friend.name}</strong>
                <p>@{getUsername(friend.email)}</p>
              </div>

              <button type="button" onClick={() => handleUnfollow(friend._id)}>
                Unfollow
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
