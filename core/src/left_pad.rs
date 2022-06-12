use std::borrow::{Borrow, Cow};

pub fn left_pad_with<'a, S>(string: S, codepoints: usize, pad_char: char) -> Cow<'a, str>
    where S: Into<Cow<'a, str>>
{
    let cow = string.into();

    let cow_codepoints = cow.chars().count();
    if codepoints <= cow_codepoints {
        return cow;
    }

    let to_pad = codepoints - cow_codepoints;
    let mut padded = String::with_capacity(cow.len() + to_pad);

    for _ in 0..to_pad {
        padded.push(pad_char);
    }

    padded.push_str(cow.borrow());

    padded.into()
}
