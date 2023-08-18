// import './App.css';
import { Route, BrowserRouter, Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
    <Route path='/' exact element={<Login/>} />
    <Route path='/register' exact element={<Register/>} />
    <Route path='/home' exact element={<Home  />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
