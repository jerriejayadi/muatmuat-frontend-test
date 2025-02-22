import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: string;
  groupClassname?: string;
  label?: string;
  errorMessage?: React.ReactNode;
}

export default function Input({
  label,
  className,
  groupClassname,
  startAdornment,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${groupClassname}`}>
      {label && <label htmlFor="name">{label}</label>}
      <div
        className={`flex items-center w-full border rounded-lg overflow-hidden focus-within:outline focus-within:outline-blue-600  ${
          errorMessage
            ? "border-red-500 focus-within:outline-red-500"
            : "border-neutral-300 focus-within:outline-blue-600"
        } `}
      >
        {startAdornment && (
          <div className="px-3 border-r border-neutral-300  py-2 text-neutral-500">
            {startAdornment}
          </div>
        )}
        <input
          className={`rounded-lg px-3 py-2  w-full focus:outline-none ${className}`}
          {...props}
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
