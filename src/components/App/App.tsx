import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// import Hello from '@components/Hello';
// import World from '@components/World';

const Party = lazy(() => import('@components/Party'));
const World = lazy(() => import('@components/World'));

import style from './App.scss';

export const App = (): JSX.Element => (
  <div>
    <h2>LM Pay</h2>
    <BrowserRouter>
      <nav className={style.routingWrapper}>
        <Link to="/">Party</Link>
        <Link to="/transaction">Transaction</Link>
      </nav>
      <Suspense fallback={<div>Page is Loading...</div>}>
        <Routes>
          <Route path="/" element={<Party />} />
          <Route path="/world" element={<World />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </div>
);
