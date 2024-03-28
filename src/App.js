import './App.css';
import {Routes,Route} from 'react-router-dom'
import Landing from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import SpotifyDetails from './Pages/SpotifyDetails';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/suggestions' element={<SpotifyDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
