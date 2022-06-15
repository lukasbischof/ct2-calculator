use wasm_bindgen::prelude::*;
use crate::time::Time;

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct ADCTiming {
    pub input_frequency: u32,
    pub prescaler: u32,
    pub sample_time_cycles: u16,
    pub conversion_time_cycles: u16,
}

#[wasm_bindgen]
impl ADCTiming {
    pub fn new() -> Self {
        Self {
            input_frequency: 0,
            prescaler: 1,
            sample_time_cycles: 1,
            conversion_time_cycles: 1,
        }
    }

    pub fn updated_input_frequency(&self, input_frequency: u32) -> Self {
        ADCTiming {
            input_frequency,
            ..self.clone()
        }
    }

    pub fn updated_prescaler(&self, prescaler: u32) -> Self {
        ADCTiming {
            prescaler,
            ..self.clone()
        }
    }

    pub fn updated_sample_time_cycles(&self, sample_time_cycles: u16) -> Self {
        ADCTiming {
            sample_time_cycles,
            ..self.clone()
        }
    }

    pub fn updated_conversion_time_cycles(&self, conversion_time_cycles: u16) -> Self {
        ADCTiming {
            conversion_time_cycles,
            ..self.clone()
        }
    }

    pub fn updated_prescaled_frequency(&self, prescaled_frequency: u32) -> Self {
        self.updated_prescaler(self.input_frequency / prescaled_frequency)
    }

    pub fn prescaled_frequency(&self) -> u32 {
        self.input_frequency / self.prescaler
    }

    pub fn total_time(&self) -> Time {
        let input_freq = Time::from_hertz(self.prescaled_frequency() as f64);
        let conversion_cycles = (self.sample_time_cycles + self.conversion_time_cycles) as f64;
        Time::from_microseconds(
            conversion_cycles * input_freq.microseconds()
        )
    }

    pub fn sample_rate(&self) -> f64 {
        1.0 / self.total_time().seconds()
    }
}
