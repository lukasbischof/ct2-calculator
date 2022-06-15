extern crate num_bigint;
extern crate num_format;
extern crate num_traits;

use crate::big_int::BigIntToFormattedString;
use num_bigint::BigInt;
use num_format::{Locale, ToFormattedString};
use num_traits::Num;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn power2(exp: u32) -> String {
    const BASE: u32 = 2;
    if exp < 32 {
        let result = BASE.checked_pow(exp);
        if result.is_some() {
            result.unwrap().to_formatted_string(&Locale::de_CH)
        } else {
            "overflow".to_string()
        }
    } else {
        let x = BigInt::from(BASE);
        x.pow(exp).to_formatted_string(&Locale::de_CH)
    }
}

#[wasm_bindgen]
pub fn bin_to_hex(input: &str) -> Option<String> {
    if input.len() == 0 {
        return Some(String::from(""));
    }

    let bin = input.replace(" ", "");

    let x = BigInt::from_str_radix(bin.as_str(), 2);
    if x.is_ok() {
        let hex = x.unwrap().to_str_radix(16).to_string();
        Some(format!("0x{}", hex))
    } else {
        None
    }
}
