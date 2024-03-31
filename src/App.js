import { Routes, Route } from 'react-router-dom';
import Landing from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import HomePage from './pages/HomePage/HomePage';
import Profile from './pages/Profile/Profile';
import Predict from './pages/Predict/Predict';
import Results from './pages/Results/Results';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './App.css';

import AuthProvider from './hooks/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
