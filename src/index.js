import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <header className="header">
      <div className="div-header">
        <h1 className='h1-header'>
          Metodo Gauss Jordan - Algebra Líneal
        </h1>
      </div>
    </header>
    <App />
    <footer className="footer">
      <div className="div-footer">
        <h1 className='h1-footer'>
          Daniel Muñoz Holguin © 2023. All rights reserved.
        </h1>
      </div>
    </footer>
  </>
); 
