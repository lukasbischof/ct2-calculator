use crate::log;
use regex::Regex;
use wasm_bindgen::prelude::*;

/*
hiding really ugly code in a WASM module, check!!
*/

#[derive(Debug, Clone, Copy)]
#[wasm_bindgen]
pub struct Time {
    microseconds: f64,
}

const STEP: f64 = 1e3;
const STEP2: f64 = 1e6;
const KILOHERTZ: f64 = 1000.0;
const MEGAHERTZ: f64 = 1_000_000.0;

#[wasm_bindgen]
impl Time {
    pub fn from_seconds(seconds: f64) -> Self {
        Self {
            microseconds: seconds * STEP2,
        }
    }

    pub fn from_milliseconds(milliseconds: f64) -> Self {
        Self {
            microseconds: milliseconds * STEP,
        }
    }

    pub fn from_microseconds(microseconds: f64) -> Self {
        Self { microseconds }
    }

    pub fn from_nanoseconds(nanoseconds: f64) -> Self {
        Self {
            microseconds: nanoseconds / STEP,
        }
    }

    pub fn from_hertz(hertz: f64) -> Self {
        Self::from_seconds(1.0 / hertz)
    }
    pub fn from_kilohertz(kilohertz: f64) -> Self {
        Self::from_milliseconds(1.0 / kilohertz)
    }
    pub fn from_megahertz(megahertz: f64) -> Self {
        Self::from_microseconds(1.0 / megahertz)
    }

    pub fn seconds(&self) -> f64 {
        self.microseconds / STEP2
    }
    pub fn milliseconds(&self) -> f64 {
        self.microseconds / STEP
    }
    pub fn microseconds(&self) -> f64 {
        self.microseconds
    }
    pub fn nanoseconds(&self) -> f64 {
        self.microseconds * STEP
    }
    pub fn hertz(&self) -> f64 {
        1.0 / self.seconds()
    }
    pub fn kilohertz(&self) -> f64 {
        self.hertz() / KILOHERTZ
    }
    pub fn megahertz(&self) -> f64 {
        self.hertz() / MEGAHERTZ
    }
}

#[wasm_bindgen]
pub struct TimeConversion {
    seconds: String,
    milliseconds: String,
    microseconds: String,
    nanoseconds: String,
    hertz: String,
    kilohertz: String,
    megahertz: String,
}

// I know, I know, it's ugly, but it works.
#[wasm_bindgen]
impl TimeConversion {
    pub fn new(time: &Time) -> Self {
        let mut this = Self {
            seconds: "".to_string(),
            milliseconds: "".to_string(),
            microseconds: "".to_string(),
            nanoseconds: "".to_string(),
            hertz: "".to_string(),
            kilohertz: "".to_string(),
            megahertz: "".to_string(),
        };
        this.update_fields(time);
        this
    }

    pub fn update(&self, field: &str, value: &str) -> TimeConversion {
        let value_float = Self::parse_input(value);
        log(&format!(
            "parsed: {}, raw: {}",
            value_float.unwrap_or_default(),
            value
        ));

        if value_float.is_ok() {
            let time = match field {
                "seconds" => Time::from_seconds(value_float.unwrap()),
                "milliseconds" => Time::from_milliseconds(value_float.unwrap()),
                "microseconds" => Time::from_microseconds(value_float.unwrap()),
                "nanoseconds" => Time::from_nanoseconds(value_float.unwrap()),
                "hertz" => Time::from_hertz(value_float.unwrap()),
                "kilohertz" => Time::from_kilohertz(value_float.unwrap()),
                "megahertz" => Time::from_megahertz(value_float.unwrap()),
                _ => Time::from_seconds(0.0),
            };
            log(&format!("time: {:?}", time));
            return Self::new(&time);
        }

        // todo: Remove repetition
        Self {
            seconds: if field == "seconds" {
                value.to_string()
            } else {
                self.seconds.clone()
            },
            milliseconds: if field == "milliseconds" {
                value.to_string()
            } else {
                self.milliseconds.clone()
            },
            microseconds: if field == "microseconds" {
                value.to_string()
            } else {
                self.microseconds.clone()
            },
            nanoseconds: if field == "nanoseconds" {
                value.to_string()
            } else {
                self.nanoseconds.clone()
            },
            hertz: if field == "hertz" {
                value.to_string()
            } else {
                self.hertz.clone()
            },
            kilohertz: if field == "kilohertz" {
                value.to_string()
            } else {
                self.kilohertz.clone()
            },
            megahertz: if field == "megahertz" {
                value.to_string()
            } else {
                self.megahertz.clone()
            },
        }
    }

    fn parse_input(value: &str) -> Result<f64, &'static str> {
        let matcher = Regex::new(r"^\s*(\d+(?:\.\d+)?)\s*$").unwrap();
        if !matcher.is_match(value) {
            return Err("invalid input");
        }

        if value.ends_with(".") {
            Err("Value must not end with a period.")
        } else {
            match value.parse::<f64>() {
                Ok(value_float) => Ok(value_float),
                Err(_) => Err("Value must be a number."),
            }
        }
    }

    pub fn seconds(&self) -> String {
        self.seconds.clone()
    }

    pub fn milliseconds(&self) -> String {
        self.milliseconds.clone()
    }

    pub fn microseconds(&self) -> String {
        self.microseconds.clone()
    }

    pub fn nanoseconds(&self) -> String {
        self.nanoseconds.clone()
    }

    pub fn hertz(&self) -> String {
        self.hertz.clone()
    }

    pub fn kilohertz(&self) -> String {
        self.kilohertz.clone()
    }

    pub fn megahertz(&self) -> String {
        self.megahertz.clone()
    }

    fn update_fields(&mut self, time: &Time) {
        self.seconds = format!("{}", time.seconds());
        self.milliseconds = format!("{}", time.milliseconds());
        self.microseconds = format!("{}", time.microseconds());
        self.nanoseconds = format!("{}", time.nanoseconds());
        self.hertz = format!("{}", time.hertz());
        self.kilohertz = format!("{}", time.kilohertz());
        self.megahertz = format!("{}", time.megahertz());
    }
}
