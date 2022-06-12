import { Component, createSignal, onCleanup } from 'solid-js';
import { Time } from 'ct2-calculator/ct2_calculator';
import Input from './Input';

function FormRow({ label, labelFor, children }: { label: string, labelFor: string, children: any }) {
  return (
    <div class="row mb-3">
      <label for={labelFor} class="col-sm-2 col-form-label">{label}</label>
      <div class="col-sm-10">
        {children}
      </div>
    </div>
  );
}

const timeFromKey = (key: keyof Time, value: number): Time => {
  switch (key) {
    case 'seconds':
      return Time.from_seconds(value);
    case 'milliseconds':
      return Time.from_milliseconds(value);
    case 'microseconds':
      return Time.from_microseconds(value);
    case 'nanoseconds':
      return Time.from_nanoseconds(value);
    case 'hertz':
      return Time.from_hertz(value);
    default:
      throw new Error(`Unknown key: ${key}`);
  }
};

const TimeCalculator: Component = () => {
  const [time, setTime] = createSignal<Time>(Time.from_seconds(0));

  const convert = (key: keyof Time, value: number) => {
    setTime(timeFromKey(key, value));
  };

  onCleanup(() => time().free());

  return (
    <div>
      <h1>Zeitrechner</h1>
      <form>
        <FormRow label="Sekunden" labelFor={'seconds'}>
          <Input type="number"
                 step="0.00000000001"
                 class="form-control"
                 id="seconds"
                 value={() => time().seconds}
                 preprocess={parseFloat}
                 onChange={(change) => convert('seconds', change)} />
        </FormRow>
        <FormRow label="Millisekunden" labelFor="milliseconds">
          <Input type="number"
                 class="form-control"
                 id="milliseconds"
                 value={() => time().milliseconds}
                 preprocess={parseFloat}
                 onChange={change => convert('milliseconds', change)} />
        </FormRow>
        <FormRow label="Mikrosekunden" labelFor="microseconds">
          <Input type="number"
                 class="form-control"
                 id="microseconds"
                 value={() => time().microseconds}
                 preprocess={parseFloat}
                 onChange={change => convert('microseconds', change)} />
        </FormRow>
        <FormRow label="Nanosekunden" labelFor="nanoseconds">
          <Input type="number"
                 class="form-control"
                 id="nanoseconds"
                 value={() => time().nanoseconds}
                 preprocess={parseFloat}
                 onChange={change => convert('nanoseconds', change)} />
        </FormRow>
        <FormRow label="Hertz" labelFor="hertz">
          <Input type="number"
                 class="form-control"
                 id="hertz"
                 value={() => time().hertz}
                 preprocess={parseFloat}
                 onChange={change => convert('hertz', change)} />
        </FormRow>
      </form>
    </div>
  );
};

export default TimeCalculator;
