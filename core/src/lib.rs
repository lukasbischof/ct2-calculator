extern crate wasm_bindgen;
extern crate num_bigint;
extern crate num_format;
extern crate num_traits;
extern crate num_integer;

use wasm_bindgen::prelude::*;
use num_format::{Locale, ToFormattedString};
use num_bigint::BigInt;
use num_traits::Num;
use num_integer::Integer;

mod big_int;
mod left_pad;

use crate::big_int::BigIntToFormattedString;
use crate::left_pad::left_pad_with;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

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

#[wasm_bindgen]
pub fn hex_to_bin(input: &str) -> Option<String> {
    if input.len() == 0 || input == "0x" {
        return Some(String::from(""));
    }

    let hex = input
        .replace(" ", "")
        .replace("0x", "")
        .replace("'", "");

    let x = BigInt::from_str_radix(hex.as_str(), 16);
    if x.is_ok() {
        let binary_string = x.unwrap().to_str_radix(2);

        if binary_string.len() > 4 {
            Some(format_binary_string(&binary_string))
        } else {
            Some(format!("{:0>4}", binary_string))
        }
    } else {
        None
    }
}

fn format_binary_string(binary_string: &String) -> String {
    const BITS_PER_GROUP: usize = 4;

    let str_len = binary_string.len();
    let pad_len = str_len + ((BITS_PER_GROUP - (str_len % BITS_PER_GROUP)) % BITS_PER_GROUP);
    let padded_string = left_pad_with(binary_string, pad_len, '0').to_string();
    let mut output = String::from("");

    for i in 0..(padded_string.len() / BITS_PER_GROUP) {
        output.push(' ');
        output.push_str(&padded_string[(i * BITS_PER_GROUP)..((i + 1) * BITS_PER_GROUP)]);
    }

    output.trim_start().to_string()
}
