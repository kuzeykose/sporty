import { InputHTMLAttributes } from 'react';

interface Checkbox extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Checkbox = ({ label, ...rest }: Checkbox) => {
  return (
    <div className="flex items-center">
      <input
        {...rest}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label className="ml-2 block text-sm text-gray-900">{label}</label>
    </div>
  );
};
