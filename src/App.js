import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/home';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/sports-trivia" element={<Home />} />
          <Route path="/trivia" element={< Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
