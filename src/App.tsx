import type { Component } from 'solid-js';

import styles from './App.module.css';
import { NavLink, Route, Routes } from 'solid-app-router';
import { createSignal, lazy, onMount, Show } from 'solid-js';
import useSuspense from './useSuspense';
import init from 'ct2-calculator';

const Binary = lazy(() => import('./Binary'));
const Powers = lazy(() => import('./Powers'));
const TimeCalculator = lazy(() => import('./TimeCalculator'));
const TimerCounter = lazy(() => import('./TimerCounterCalculator'));
const ADCTiming = lazy(() => import('./ADCTimingCalculator'));

const App: Component = () => {
  const [isReady, setIsReady] = createSignal(false);

  onMount(() => {
    init().then(() => {
      setIsReady(true);
    });
  });

  return (
    <div class={`container ${styles.App}`}>
      <div class="container-fluid">
        <nav class="nav nav-pills flex-column flex-sm-row">
          <NavLink class="flex-sm-fill text-sm-center nav-link" href="/powers">Potenzen</NavLink>
          <NavLink class="flex-sm-fill text-sm-center nav-link" href="/bin">Binär/Hex</NavLink>
          <NavLink class="flex-sm-fill text-sm-center nav-link" href="/time">Zeit</NavLink>
          <NavLink class="flex-sm-fill text-sm-center nav-link" href="/counter-timer">Timer/Counter</NavLink>
          <NavLink class="flex-sm-fill text-sm-center nav-link" href="/adc">ADC Timing</NavLink>
        </nav>

        <Show when={isReady}>
          <Routes>
            <Route path="/" element={<h1>Choose your calc</h1>} />
            <Route path="/powers" element={useSuspense(Powers)}></Route>
            <Route path="/bin" element={useSuspense(Binary)}></Route>
            <Route path="/time" element={useSuspense(TimeCalculator)}></Route>
            <Route path="/counter-timer" element={useSuspense(TimerCounter)}></Route>
            <Route path="/adc" element={useSuspense(ADCTiming)}></Route>
          </Routes>
        </Show>
      </div>
    </div>
  );
};

export default App;
