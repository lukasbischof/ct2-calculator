import { ADCTiming, Time } from 'ct2-calculator';
import { Component, createMemo, createSignal } from 'solid-js';
import { FormRow } from './FormRow';
import Input from './Input';

const ADCTimingCalculator: Component = () => {
  const [adcTiming, setAdcTiming] = createSignal(ADCTiming.new());

  const handleChange = (field: keyof ADCTiming, value: number) => {
    setAdcTiming((adcTiming()[field] as Function)(value));
  };

  const inputFrequencyConversion = createMemo(() => Time.from_hertz(adcTiming().input_frequency));
  const prescaledFrequencyConversion = createMemo(() => Time.from_hertz(adcTiming().prescaled_frequency()));

  return (
    <div>
      <h1>ADC Timing</h1>
      <form>
        <FormRow label="Eingabefrequenz" labelFor={'hertz'}>
          <div class="input-group">
            <Input type="number" autocomplete="off" class="form-control" id="hertz"
                   value={() => adcTiming().input_frequency}
                   preprocess={parseInt}
                   onChange={(change) => handleChange('updated_input_frequency', change)} />
            <span class="input-group-text">Hz</span>
          </div>
          <div class="form-text mb-1">
            {`= ${inputFrequencyConversion().megahertz()} MHz, ${inputFrequencyConversion().kilohertz()} kHz`}
          </div>
          <button class="btn btn-outline-dark btn-sm me-1"
                  onclick={() => handleChange('updated_input_frequency', adcTiming().input_frequency * 1e6)}>
            MHz
          </button>
        </FormRow>
        <FormRow label="Prescaler" labelFor={'prescaler'}>
          <Input type="number" autocomplete="off" class="form-control" id="prescaler"
                 value={() => adcTiming().prescaler}
                 preprocess={parseInt}
                 onChange={(change) => handleChange('updated_prescaler', change)} />
        </FormRow>
        <hr />
        <FormRow label="= ADCCLK" labelFor="prescaled_frequency">
          <div class="input-group">
            <Input class="form-control" type="text" autocomplete="off" id="prescaled_frequency"
                   value={() => adcTiming().prescaled_frequency()}
                   preprocess={parseInt}
                   onChange={(change) => handleChange('updated_prescaled_frequency', change)} />
            <span class="input-group-text">Hz</span>
          </div>
          <div class="form-text mb-1">
            {`= ${prescaledFrequencyConversion().megahertz()} MHz, ${prescaledFrequencyConversion().kilohertz()} kHz`}
          </div>
        </FormRow>
        <FormRow label="Sampling Time" labelFor={'sample_time_cycles'}>
          <div class="input-group">
            <Input type="number" autocomplete="off" class="form-control" id="sample_time_cycles"
                   value={() => adcTiming().sample_time_cycles}
                   preprocess={parseInt}
                   onChange={(change) => handleChange('updated_sample_time_cycles', change)} />
            <span class="input-group-text">cycles</span>
          </div>
        </FormRow>
        <FormRow label="Conversion Time" labelFor={'conversion_time_cycles'}>
          <div class="input-group">
            <Input type="number" autocomplete="off" class="form-control" id="conversion_time_cycles"
                   value={() => adcTiming().conversion_time_cycles}
                   preprocess={parseInt}
                   onChange={(change) => handleChange('updated_conversion_time_cycles', change)} />
            <span class="input-group-text">cycles</span>
          </div>
          <div class="form-text mb-1">
            T<sub>conv</sub> hängt von der Auflösung ab und ist vergleichbar. 12 bits Auflösung entsprechen idr. 12 ADCCLK
            cycles.
          </div>
        </FormRow>
        <hr />
        <FormRow label={<span>T<sub>total</sub></span>} labelFor={'total_time'}>
          <div class="input-group">
            <Input type="number" autocomplete="off" class="form-control" id="total_time" readOnly={true}
                   value={() => adcTiming().total_time().microseconds()}
                   onChange={(_change) => {}} />
            <span class="input-group-text">μs</span>
          </div>
        </FormRow>
      </form>
    </div>
  );
};

export default ADCTimingCalculator;
