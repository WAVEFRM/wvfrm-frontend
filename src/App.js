import { Routes, Route } from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider';

import Landing from './pages/LandingPage/LandingPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SignUp from './pages/SignUp/SignUp';
import HomePage from './pages/HomePage/HomePage';
import Profile from './pages/Profile/Profile';
import Predict from './pages/Predict/Predict';
import Results from './pages/Results/Results';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import TestPage from './pages/TestPage/TestPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test-page" element={<TestPage />} />
          </Route>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
