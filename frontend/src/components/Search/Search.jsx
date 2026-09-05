import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { addFriend, getUsers } from '../../api/users';
import styles from './Search.module.css';

function getUsername(email) {
  return email?.split('@')[0] || 'unknown';
}

export default function Search({ onSignOut }) {
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem('authUser') ?? 'null'),
  );
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    getUsers(currentUser._id)
      .then((data) => setUsers(data.users))
      .catch(() => setUsers([]));
  }, [currentUser]);

  const handleFollow = async (friendId) => {
    if (!currentUser) {
      return;
    }
    const { user } = await addFriend(currentUser._id, friendId);
    localStorage.setItem('authUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const visibleUsers = trimmedQuery
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(trimmedQuery) ||
          user.email.toLowerCase().includes(trimmedQuery),
      )
    : users;

  return (
    <div className={styles.page}>
      <aside className={styles.leftSidebar}>
        <div className={styles.brand}>CS628</div>

        <nav className={styles.nav}>
          <NavLink to="/home">Home</NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Search
          </NavLink>
          <NavLink to="/friends">Friends</NavLink>
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
          <h1>Search users</h1>
          <p>Browse everyone registered on CS628.</p>
        </header>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by name or email"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className={styles.userList}>
          {visibleUsers.length === 0 && <p className={styles.emptyState}>No users found.</p>}

          {visibleUsers.map((user) => {
            const isFriend = currentUser?.friends?.includes(user._id);
            return (
              <div className={styles.userRow} key={user._id}>
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
        </div>
      </main>
    </div>
  );
}
