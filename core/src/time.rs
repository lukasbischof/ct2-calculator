use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy)]
#[wasm_bindgen]
pub struct Time {
    pub seconds: f64,
    pub milliseconds: f64,
    pub nanoseconds: f64,
    pub microseconds: f64,
    pub hertz: f64,
}

const MILLISECONDS: f64 = 1000.0;
const MICROSECONDS: f64 = 1_000_000.0;
const NANOSECONDS: f64 = 1_000_000_000.0;

#[wasm_bindgen]
impl Time {
    pub fn from_seconds(seconds: f64) -> Self {
        Self {
            seconds,
            milliseconds: seconds * MILLISECONDS,
            microseconds: seconds * MICROSECONDS,
            nanoseconds: seconds * NANOSECONDS,
            hertz: 1.0 / seconds,
        }
    }

    pub fn from_milliseconds(milliseconds: f64) -> Self {
        Self {
            seconds: milliseconds / MILLISECONDS,
            milliseconds,
            microseconds: milliseconds * MILLISECONDS,
            nanoseconds: milliseconds * MICROSECONDS,
            hertz: MILLISECONDS / milliseconds,
        }
    }

    pub fn from_microseconds(microseconds: f64) -> Self {
        Self {
            seconds: microseconds / MICROSECONDS,
            milliseconds: microseconds / MILLISECONDS,
            microseconds,
            nanoseconds: microseconds * MILLISECONDS,
            hertz: MICROSECONDS / microseconds,
        }
    }

    pub fn from_nanoseconds(nanoseconds: f64) -> Self {
        Self {
            seconds: nanoseconds / NANOSECONDS,
            milliseconds: nanoseconds / MICROSECONDS,
            microseconds: nanoseconds / MILLISECONDS,
            nanoseconds,
            hertz: NANOSECONDS / nanoseconds,
        }
    }

    pub fn from_hertz(hertz: f64) -> Self {
        Self {
            seconds: 1.0 / hertz,
            milliseconds: MILLISECONDS / hertz,
            microseconds: MICROSECONDS / hertz,
            nanoseconds: NANOSECONDS / hertz,
            hertz,
        }
    }
}
