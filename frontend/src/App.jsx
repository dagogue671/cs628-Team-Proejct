import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { signIn, signUp } from './api/auth';
import LandingPage from './components/landing-page';
import SigninForm from './components/signin-form';
import SignupForm from './components/signup-form';
import HomePage from './components/HomePage';
import Settings from './components/Settings';

function AppRoutes() {
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    const { user } = await signUp(formData);
    localStorage.setItem('authUser', JSON.stringify(user));
    navigate('/home');
  };

  const handleSignIn = async (formData) => {
    const { user } = await signIn(formData);
    localStorage.setItem('authUser', JSON.stringify(user));
    navigate('/home');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SigninForm onSubmit={handleSignIn} />} />
      <Route path="/sign-up" element={<SignupForm onSubmit={handleSignUp} />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}