import { Component, createSignal } from 'solid-js';
import TextArea from './TextArea';
import { bin_to_hex, format_binary_string, hex_to_bin } from 'ct2-calculator';
import styles from './App.module.css';

const getLines = (value: string) => value.split('\n');

const Binary: Component = () => {
  const [binary, setBinary] = createSignal('0');
  const [hex, setHex] = createSignal('0x0');

  const binaryChanged = (value: string) => {
    const hexValues = getLines(value).map(line => bin_to_hex(line) || '0x0').join('\n');
    setBinary(
      getLines(value).map(line => {
        return (
          format_binary_string(line, false)
        );
      }).join('\n'),
    );
    setHex(hexValues);
  };

  const hexChanged = (value: string) => {
    const binaryValues = getLines(value).map(line => hex_to_bin(line) || '0').join('\n');
    setHex(value);
    setBinary(binaryValues);
  };

  return (
    <div>
      <h1>Binär/Hex</h1>

      <div class="row">
        <div class="col-md-6">
          <h3>Binär</h3>
          <TextArea class={styles.code} value={binary} onChange={binaryChanged} placeholder="Binär" />
        </div>
        <div class="col-md-6">
          <h3>Hex</h3>
          <TextArea class={styles.code} value={hex} onChange={hexChanged} placeholder="Hex" />
        </div>
      </div>
    </div>
  );
};

export default Binary;
