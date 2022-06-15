use wasm_bindgen::prelude::*;
use crate::time::Time;

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct TimerCounter {
    pub input_frequency: u32,
    pub prescaler: u32,
    pub arr: u32,
    pub effective_arr: u32,
}

#[wasm_bindgen]
impl TimerCounter {
    pub fn new() -> Self {
        Self { input_frequency: 0, prescaler: 1, arr: 1, effective_arr: 0 }
    }

    pub fn updated_input_frequency(&self, input_frequency: u32) -> Self {
        TimerCounter { input_frequency, ..self.clone() }
    }

    pub fn updated_prescaler(&self, prescaler: u32) -> Self {
        TimerCounter { prescaler, ..self.clone() }
    }

    pub fn updated_arr(&self, arr: u32) -> Self {
        TimerCounter { arr, effective_arr: arr - 1, ..self.clone() }
    }

    pub fn updated_prescaled_frequency(&self, prescaled_frequency: u32) -> Self {
        self.updated_prescaler(self.input_frequency / prescaled_frequency)
    }

    pub fn updated_interrupt_frequency(&self, interrupt_frequency: u32) -> Self {
        self.updated_arr((self.prescaled_frequency() / interrupt_frequency) + 1)
    }

    pub fn updated_interrupt_period(&self, interrupt_period_ms: u32) -> Self {
        let prescaler_time = Time::from_hertz(self.prescaled_frequency() as f64).milliseconds();
        let x = interrupt_period_ms as f64 / prescaler_time;

        self.updated_arr((x as u32) + 1)
    }

    pub fn prescaled_frequency(&self) -> u32 {
        self.input_frequency / self.prescaler
    }

    pub fn interrupt_frequency(&self) -> f64 {
        if self.effective_arr == 0 {
            return 0.0;
        }

        self.prescaled_frequency() as f64 / self.effective_arr as f64
    }

    pub fn interrupt_period_ms(&self) -> f64 {
        if self.interrupt_frequency() == 0.0 {
            return 0.0;
        }

        Time::from_hertz(self.interrupt_frequency()).milliseconds()
    }
}
