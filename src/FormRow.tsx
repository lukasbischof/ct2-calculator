import { JSX } from 'solid-js';

type Props = { label: string | JSX.Element, labelFor: string, children: any };

export function FormRow({ label, labelFor, children }: Props) {
  return (
    <div class="row mb-3">
      <label for={labelFor} class="col-sm-2 col-form-label">{label}</label>
      <div class="col-sm-10">
        {children}
      </div>
    </div>
  );
}
