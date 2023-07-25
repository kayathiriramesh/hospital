//import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../src/sb-admin-2.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Portal from './Portal/Dashboard';
import Reception from './Reception';
import Doctor from './Doctor';



function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portal/dashboard" element={<Portal/>} />
        <Route path="/reception" element={<Reception/>} />
        <Route path="/doctor" element={<Doctor/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
