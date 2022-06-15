import { Time, TimerCounter } from 'ct2-calculator';
import { Component, createMemo, createSignal, Show } from 'solid-js';
import { FormRow } from './FormRow';
import Input from './Input';

const TimerCounterCalculator: Component = () => {
  const [timerCounter, setTimerCounter] = createSignal(TimerCounter.new());

  const handleChange = (field: keyof TimerCounter, value: number) => {
    setTimerCounter((timerCounter()[field] as Function)(value));
  };

  const inputFrequencyConversion = createMemo(() => Time.from_hertz(timerCounter().input_frequency));
  const prescaledFrequencyConversion = createMemo(() => Time.from_hertz(timerCounter().prescaled_frequency()));
  const interruptPeriodConversion = createMemo(() => Time.from_hertz(timerCounter().interrupt_frequency()));

  return (
    <div>
      <h1 class="mb-2">Timer / Counter</h1>
      <small class="text-muted mb-3 d-block">TIM3 und TIM4 sind dabei 16-bit Timer und TIM2 sowie TIM5 32-bit</small>
      <form>
        <FormRow label="Eingabefrequenz" labelFor={'hertz'}>
          <div class="input-group">
            <Input type="number" class="form-control" id="hertz"
                   value={() => timerCounter().input_frequency}
                   preprocess={parseInt}
                   onChange={(change) => handleChange('updated_input_frequency', change)} />
            <span class="input-group-text">Hz</span>
          </div>
          <div
            class="form-text mb-1">{`= ${inputFrequencyConversion().megahertz()} MHz, ${inputFrequencyConversion().kilohertz()} kHz`}</div>
          <button class="btn btn-outline-dark btn-sm me-1"
                  onclick={() => handleChange('updated_input_frequency', timerCounter().input_frequency * 1e6)}>
            MHz
          </button>
        </FormRow>
        <FormRow label="Prescaler" labelFor={'prescaler'}>
          <Input type="number" class="form-control" id="prescaler"
                 value={() => timerCounter().prescaler}
                 preprocess={parseInt}
                 onChange={(change) => handleChange('updated_prescaler', change)} />
        </FormRow>
        <hr />
        <FormRow label="= Prescaled Frequency" labelFor="prescaled_frequency">
          <div class="input-group">
            <Input class="form-control" type="text" id="prescaled_frequency"
              value={() => timerCounter().prescaled_frequency()}
              preprocess={parseInt}
              onChange={(change) => handleChange('updated_prescaled_frequency', change)} />
            <span class="input-group-text">Hz</span>
          </div>
          <div class="form-text mb-1">
            {`= ${prescaledFrequencyConversion().megahertz()} MHz, ${prescaledFrequencyConversion().kilohertz()} kHz`}
          </div>
        </FormRow>
        <FormRow label="Auto Reload Register ARR" labelFor={'arr'}>
          <Input type="number" class="form-control" id="arr"
                 value={() => timerCounter().arr}
                 preprocess={parseInt}
                 onChange={(change) => handleChange('updated_arr', change)} />
          <div class="form-text">{`Effektiv im ARR Register = ${timerCounter().arr_register_value()}`}</div>
        </FormRow>
        <hr />
        <FormRow label="= Interrupt Period" labelFor="interrupt_period">
          <div class="row">
            <div class="col-6">
              <div class="input-group">
                <Input class="form-control" type="text" id="interrupt_period"
                  value={() => timerCounter().interrupt_period_ms()}
                  preprocess={parseInt}
                  onChange={(change) => {
                    handleChange('updated_interrupt_period', change);
                  }} />
                <span class="input-group-text">ms</span>
              </div>
              <Show when={interruptPeriodConversion().seconds() !== Infinity}>
                <div class="form-text">{`= ${interruptPeriodConversion().seconds()}s`}</div>
              </Show>
            </div>
            <div class="col-6">
              <div class="input-group">
                <Input class="form-control" type="text" id="interrupt_period"
                  value={() => timerCounter().interrupt_frequency()}
                  preprocess={parseInt}
                  onChange={(change) => {
                    handleChange('updated_interrupt_frequency', change);
                  }} />
                <span class="input-group-text">Hz</span>
              </div>
            </div>
          </div>
        </FormRow>
      </form>
    </div>
  );
};

export default TimerCounterCalculator;
