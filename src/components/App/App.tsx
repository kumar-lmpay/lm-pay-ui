import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Hello from '@components/Hello';
import World from '@components/World';
import Transaction from '@components/Transaction';

import style from './App.scss';

export const App = (): JSX.Element => (
  <div className={style.componentWrapper}>
    {/* <h2>Hello App</h2> */}
    <BrowserRouter>
      <nav className={style.routingWrapper}>
        <b>Routing: </b>
        <Link to="/">Hello component</Link>
        <Link to="/world">World component</Link>
        <Link to="/transaction">Transaction</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/world" element={<World />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  </div>
);
