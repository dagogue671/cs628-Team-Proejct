import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.css';
import Feed from '../Feed';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <aside className={styles.leftSidebar}>
        <div className={styles.brand}>CS628</div>

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
          />
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

          <div className={styles.followUser}>
            <div>
              <strong>David William Gogue</strong>
              <p>@dwgogue</p>
            </div>

            <button type="button">Follow</button>
          </div>

          <div className={styles.followUser}>
            <div>
              <strong>Lanxi Luo</strong>
              <p>@lanxi</p>
            </div>

            <button type="button">Follow</button>
          </div>
        </section>
      </aside>
    </div>
  );
}