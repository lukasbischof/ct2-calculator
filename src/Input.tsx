import { Component, JSX } from 'solid-js';

type OtherProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput' | 'onChange'>
type Props = {
  value: JSX.InputHTMLAttributes<HTMLInputElement>['value']
  onChange: (value: string) => void,
  preprocess?: (value: string) => any,
};

const Input: Component<Props & OtherProps> = ({ value, onChange, ...props }) => (
  <input value={value}
         onInput={v => onChange(props.preprocess ? props.preprocess(v.currentTarget.value) : v.currentTarget.value)}
         {...props}
  />
);

export default Input;
