import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page';
import SigninForm from './components/signin-form';
import SignupForm from './components/signup-form';

export default function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
