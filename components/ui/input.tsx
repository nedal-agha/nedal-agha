import type { ChangeEventHandler } from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export function Input({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  value,
  onChange,
}: InputProps) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="text-slate-200">{label}</span>
      <input
        className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-sky-400/40 focus:ring"
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
