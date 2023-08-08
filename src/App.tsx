import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/main/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';

import './App.css';
import { CreatePost } from './pages/create post/CreatePost';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path='/createpost' element={<CreatePost/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
