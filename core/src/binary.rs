extern crate num_bigint;
extern crate num_format;
extern crate num_traits;

use crate::left_pad_with;
use num_bigint::BigInt;
use num_traits::Num;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn hex_to_bin(input: &str) -> Option<String> {
    if input.len() == 0 || input == "0x" {
        return Some(String::from(""));
    }

    let hex = input.replace(" ", "").replace("0x", "").replace("'", "");

    let x = BigInt::from_str_radix(hex.as_str(), 16);
    if x.is_ok() {
        let binary_string = x.unwrap().to_str_radix(2);

        if binary_string.len() > 4 {
            Some(fmt_binary_string(&binary_string, true))
        } else {
            Some(format!("{:0>4}", binary_string))
        }
    } else {
        None
    }
}

fn fmt_binary_string(binary_string: &String, pad_str: bool) -> String {
    const BITS_PER_GROUP: usize = 4;

    let padded_string = if pad_str {
        let str_len = binary_string.len();
        let pad_len = str_len + ((BITS_PER_GROUP - (str_len % BITS_PER_GROUP)) % BITS_PER_GROUP);
        left_pad_with(binary_string, pad_len, '0').to_string()
    } else {
        binary_string.clone()
    };

    let mut output = String::from("");

    for (i, c) in padded_string.chars().enumerate() {
        if i > 0 && i % BITS_PER_GROUP == 0 {
            output.push(' ');
        }
        output.push(c);
    }

    output.trim_start().to_string()
}

#[wasm_bindgen]
pub fn format_binary_string(string: String, pad_str: bool) -> String {
    let compact_str: String = string.chars().filter(|c| !c.is_whitespace()).collect();
    fmt_binary_string(&compact_str, pad_str)
}
