import type { ChangeEventHandler } from "react";

type TextareaProps = {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export function Textarea({
  label,
  name,
  required = false,
  rows = 5,
  defaultValue,
  value,
  onChange,
}: TextareaProps) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="text-slate-200">{label}</span>
      <textarea
        className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-sky-400/40 focus:ring"
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
