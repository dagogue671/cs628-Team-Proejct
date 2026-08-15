import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <section className={styles.page}>
      <nav className={styles.nav} aria-label="Main navigation">
        <a className={styles.logo} href="/" aria-label="CS628 Social Media home">
          CS628
        </a>
        <div className={styles.navActions}>
          <Link className={styles.signinLink} to="/sign-in">
            Sign in
          </Link>
          <Link className={styles.navButton} to="/sign-up">
            Sign up
          </Link>
        </div>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>A place to stay connected</p>
          <h1>Share what matters with your community.</h1>
          <p className={styles.description}>
            Create your profile, find your people, and make space for the
            conversations that keep you connected.
          </p>
          <Link className={styles.primaryButton} to="/sign-up">
            Create your account
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>

        <div className={styles.visual} aria-label="Community activity preview">
          <div className={styles.visualHeader}>
            <span className={styles.statusDot} />
            <span>Community feed</span>
            <span className={styles.signal}>LIVE</span>
          </div>
          <div className={styles.post}>
            <div className={styles.avatar}>AM</div>
            <div>
              <strong>Alex Morgan</strong>
              <p>Small moments are worth sharing.</p>
            </div>
          </div>
          <div className={styles.postAccent}>
            <span>48</span>
            <span>people joined the conversation</span>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>Built for real conversations.</span>
        <span>Profiles · Friends · Posts</span>
      </footer>
    </section>
  );
}
