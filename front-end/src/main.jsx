import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBwdICmncnCP61npiiP2B-ZQgkyUNqgJ7c",
  authDomain: "full-stack-react-ddc47.firebaseapp.com",
  projectId: "full-stack-react-ddc47",
  storageBucket: "full-stack-react-ddc47.firebasestorage.app",
  messagingSenderId: "5058911746",
  appId: "1:5058911746:web:668049ed820ab6931e111b"
};

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
