import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './routes/Login';
import Register from './routes/Register';
import About from './routes/About';
import Dashboard from './routes/Dashboard';
import CreatePost from './routes/dashboard_routes/CreatePost';
import ViewPosts from './routes/dashboard_routes/ViewPosts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />}/>
      <Route path="about-us" element={<About />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="dashboard/create-post" element={<CreatePost />}/>
      <Route path="dashboard/view-user-posts" element={<ViewPosts />}/>
    </Routes>
  </BrowserRouter>
);

