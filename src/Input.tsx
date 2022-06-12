import { JSX } from 'solid-js';

type OtherProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput' | 'onChange'>
type Value = JSX.InputHTMLAttributes<HTMLInputElement>['value'];
type Props<T> = {
  value: Value | (() => Value),
  onChange: (value: T) => void,
  preprocess?: (value: string) => T,
};

function Input<T>({ value, onChange, ...props }: Props<T> & OtherProps) {
  return (
    <input value={typeof value === 'function' ? value() : value}
           onInput={v => {
             onChange(props.preprocess ? props.preprocess(v.currentTarget.value) : v.currentTarget.value as unknown as T);
           }}
           {...props}
    />
  );
}

export default Input;
