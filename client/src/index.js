import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import ModelForm from "./components/ModelForm";
import Auth from './pages/Auth';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import ImageGallery from './pages/ImageGallery';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route path='*' element={<NotFound />}></Route>
        <Route path="/auth" element={<Auth />}>
          <Route path='login' element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<App />}>
          <Route path='model' element={
            <ProtectedRoute>
              <ModelForm />
            </ProtectedRoute>
          } />
        </Route>
        <Route path='gallery' element={
            <ProtectedRoute>
              <ImageGallery />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
