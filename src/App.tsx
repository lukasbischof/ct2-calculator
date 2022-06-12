import type { Component } from 'solid-js';

import styles from './App.module.css';
import { NavLink, Route, Routes } from 'solid-app-router';
import { lazy } from 'solid-js';
import useSuspense from './useSuspense';
const Binary = lazy(() => import('./Binary'));
const Powers = lazy(() => import('./Powers'));

const App: Component = () => {
  return (
    <div class={`container ${styles.App}`}>
      <div class="container-fluid">
        <nav class="nav nav-pills flex-column flex-sm-row">
          <NavLink class="flex-sm-fill text-sm-center nav-link" href="/powers">Potenzen</NavLink>
          <NavLink class="flex-sm-fill text-sm-center nav-link" href="/bin">Binär/Hex</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Choose your calc</h1>} />
          <Route path="/powers" element={useSuspense(Powers)}></Route>
          <Route path="/bin" element={useSuspense(Binary)}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
