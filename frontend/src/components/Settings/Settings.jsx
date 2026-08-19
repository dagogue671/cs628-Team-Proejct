import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Settings.module.css';

export default function Settings() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={styles.page}>
      <aside className={styles.leftSidebar}>
        <div className={styles.brand}>CS628</div>

        <nav className={styles.nav}>
          <NavLink to="/home">Home</NavLink>
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
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Settings</h1>
          <p>Manage how CS628 looks and behaves.</p>
        </header>

        <section className={styles.settingsCard}>
          <div>
            <h2>Appearance</h2>
            <p>Choose between light and dark mode.</p>
          </div>

          <div className={styles.themeOptions}>
            <button
              type="button"
              className={theme === 'light' ? styles.selected : ''}
              onClick={() => setTheme('light')}
            >
              <span className={styles.previewLight} />
              Light
            </button>

            <button
              type="button"
              className={theme === 'dark' ? styles.selected : ''}
              onClick={() => setTheme('dark')}
            >
              <span className={styles.previewDark} />
              Dark
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}