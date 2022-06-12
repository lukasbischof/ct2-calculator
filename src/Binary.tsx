import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import TextArea from './TextArea';
import { bin_to_hex, hex_to_bin } from 'ct2-calculator';

const Binary: Component = () => {
  const [binary, setBinary] = createSignal('0');
  const [hex, setHex] = createSignal('0x0');

  const binaryChanged = (value: string) => {
    const hexValue = bin_to_hex(value) || '0x0';
    setBinary(value);
    setHex(hexValue);
  };

  const hexChanged = (value: string) => {
    const binaryValue = hex_to_bin(value) || '0';
    setHex(value);
    setBinary(binaryValue);
  };

  return (
    <div>
      <h1>Binär/Hex</h1>

      <div class="row">
        <div class="col-md-6">
          <h3>Binär</h3>
          <TextArea value={binary} onChange={binaryChanged} placeholder="Binär" />
        </div>
        <div class="col-md-6">
          <h3>Hex</h3>
          <TextArea value={hex} onChange={hexChanged} placeholder="Hex" />
        </div>
      </div>
    </div>
  );
};

export default Binary;
