import { Component, JSX } from 'solid-js';

type OtherProps = Omit<JSX.InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onInput' | 'onChange'>
type Value = JSX.InputHTMLAttributes<HTMLInputElement>['value'];
type Props = {
  value: Value | (() => Value),
  onChange: (value: string) => void,
  preprocess?: (value: string) => any,
};

const Textarea: Component<Props & OtherProps> = ({ value, onChange, ...props }) => (
  <textarea
    value={typeof value === 'function' ? value() : value}
    onInput={v => onChange(props.preprocess ? props.preprocess(v.currentTarget.value) : v.currentTarget.value)}
    {...props}
  />
);

export default Textarea;
