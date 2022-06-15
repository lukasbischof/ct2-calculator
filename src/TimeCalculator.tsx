import { Component, createSignal, onCleanup } from 'solid-js';
import { Time, TimeConversion } from 'ct2-calculator/ct2_calculator';
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

const TimeCalculator: Component = () => {
  const [time, setTime] = createSignal<TimeConversion>(TimeConversion.new(Time.from_seconds(0)));

  const convert = (key: keyof Time, value: string) => {
    setTime(time().update(key, value));
  };

  onCleanup(() => time().free());

  return (
    <div>
      <h1>Zeitrechner</h1>
      <form>
        <FormRow label="Sekunden" labelFor={'seconds'}>
          <Input<string> type="text"
                         step="0.00000000001"
                         class="form-control"
                         id="seconds"
                         value={() => time().seconds()}
                         onChange={(change) => convert('seconds', change)} />
        </FormRow>
        <FormRow label="Millisekunden" labelFor="milliseconds">
          <Input<string> type="text"
                         class="form-control"
                         id="milliseconds"
                         value={() => time().milliseconds()}
                         onChange={change => convert('milliseconds', change)} />
        </FormRow>
        <FormRow label="Mikrosekunden" labelFor="microseconds">
          <Input<string> type="text"
                         class="form-control"
                         id="microseconds"
                         value={() => time().microseconds()}
                         onChange={change => convert('microseconds', change)} />
        </FormRow>
        <FormRow label="Nanosekunden" labelFor="nanoseconds">
          <Input<string> type="text"
                         class="form-control"
                         id="nanoseconds"
                         value={() => time().nanoseconds()}
                         onChange={change => convert('nanoseconds', change)} />
        </FormRow>
        <FormRow label="Hertz" labelFor="hertz">
          <Input<string> type="text"
                         class="form-control"
                         id="hertz"
                         value={() => time().hertz()}
                         onChange={change => convert('hertz', change)} />
        </FormRow>
        <FormRow label="Kilohertz" labelFor="kilohertz">
          <Input<string> type="text"
                         class="form-control"
                         id="kilohertz"
                         value={() => time().kilohertz()}
                         onChange={change => convert('kilohertz', change)} />
        </FormRow>
        <FormRow label="Megahertz" labelFor="megahertz">
          <Input<string> type="text"
                         class="form-control"
                         id="megahertz"
                         value={() => time().megahertz()}
                         onChange={change => convert('megahertz', change)} />
        </FormRow>
      </form>
    </div>
  );
};

export default TimeCalculator;
