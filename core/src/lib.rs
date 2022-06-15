extern crate wasm_bindgen;
extern crate num_bigint;
extern crate num_format;
extern crate num_traits;

use wasm_bindgen::prelude::*;

mod big_int;
mod left_pad;
mod power;
mod binary;
mod time;
mod timer_counter;

use crate::left_pad::left_pad_with;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn warn(warning: &str);
}
