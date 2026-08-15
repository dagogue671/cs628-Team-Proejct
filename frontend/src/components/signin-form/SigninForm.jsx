import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SigninForm.module.css';

export default function SigninForm({ onSubmit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit?.(formData);
    } catch (submitError) {
      setError(submitError.message || 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container} aria-labelledby="signin-title">
      <div className={styles.card}>
        <button className={styles.backButton} type="button" onClick={() => navigate('/')}>
          <span aria-hidden="true">&lt;-</span> Back to home
        </button>
        <p className={styles.eyebrow}>CS628 Social Media</p>
        <h1 id="signin-title" className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to continue the conversation.</p>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="signin-email">Email address</label>
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="signin-password">Password</label>
            <input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className={styles.footer}>
          New to CS628? <a href="/sign-up">Create an account</a>
        </p>
      </div>
    </section>
  );
}
