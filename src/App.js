import './App.css';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> {/* This should be outside the Routes, as it needs to be always visible */}
        <Routes>
          <Route  path="/" element={<Create />} />
          <Route  path="/all" element={<Read />} />
          <Route  path="/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
