import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page';
import SigninForm from './components/signin-form';
import SignupForm from './components/signup-form';
import HomePage from './components/HomePage';
import Settings from './components/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}