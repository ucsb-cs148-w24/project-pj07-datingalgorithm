import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header />
      <Router >
        <Routes>
          <Route path='/' element={<h1>Yo</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



        
        

        

{/* Tinder Cards */}

{/* Profile Cards */}

{/* Buttons */}