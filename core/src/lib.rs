extern crate wasm_bindgen;
extern crate num_bigint;
extern crate num_format;

use wasm_bindgen::prelude::*;
use num_format::{Locale, ToFormattedString};
use num_bigint::{BigInt, Sign};

mod big_int;
use crate::big_int::BigIntToFormattedString;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

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
