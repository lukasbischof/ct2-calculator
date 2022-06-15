import { JSX } from 'solid-js';

type OtherProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput' | 'onChange'>
type Value = JSX.InputHTMLAttributes<HTMLInputElement>['value'];
type Props<T> = {
  value: Value | (() => Value),
  onChange: (value: T) => void,
  preprocess?: (value: string) => T,
};

function Input<T>({ value, onChange, ...props }: Props<T> & OtherProps) {
  const preprocess = (input: any) => {
    if (props.preprocess) {
      let result = props.preprocess(input);
      if (result === undefined || (typeof result === 'number' && isNaN(result))) {
        return input;
      }

      return result;
    }

    return input;
  };

  return (
    <input type='text' autocomplete="off" value={typeof value === 'function' ? value() : value}
           onInput={v => {
             onChange(preprocess(v.currentTarget.value) as unknown as T);
           }}
           {...props}
    />
  );
}

export default Input;
