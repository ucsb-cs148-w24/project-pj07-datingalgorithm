import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Cards from './Cards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import firebase from './firebase';

// Sign in with Google
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider)
  .then((result) => {
    var token = result.credential.accessToken;
    var user = result.user;
    // ...
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    // ...
  });

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header />
      <Router >
        <Routes>
          <Route path='/' element={<Cards/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;



        
        

        

{/* Tinder Cards */}

{/* Profile Cards */}

{/* Buttons */}