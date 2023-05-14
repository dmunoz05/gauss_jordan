import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <header className="header">
      <div className="div-header">
        <p className='p-header'>
          Metodo Gauss Jordan - Algebra Líneal
        </p>
      </div>
    </header>
    <App />
  </>
); 
