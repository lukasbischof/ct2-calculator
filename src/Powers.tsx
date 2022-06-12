import { Component, createMemo, createSignal } from 'solid-js';
import { power2 } from 'ct2-calculator';
import Input from './Input';

const Powers: Component = () => {
  const [value, setValue] = createSignal(0);

  const result = createMemo(() => power2(value()));

  return (
    <div>
      <h1>Potenzen</h1>

      2^<Input type="number" value={value()} onChange={setValue} preprocess={parseInt} />
      =
      {result()}
    </div>
  );
}

export default Powers;
