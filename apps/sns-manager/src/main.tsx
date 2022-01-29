import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './app/app';
import { CookiePolicy } from './app/cookie-policy';

ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/policy" element={<CookiePolicy />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
