import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/sports-trivia" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
