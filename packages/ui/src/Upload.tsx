import { PhotoIcon } from '@heroicons/react/24/outline';
import { InputHTMLAttributes } from 'react';

interface Upload extends InputHTMLAttributes<HTMLInputElement> {
  imageName?: string;
  title: string;
  icon: React.ReactNode;
}

export function Upload({ children, icon, imageName, title, ...rest }: Upload) {
  return (
    <label className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none cursor-pointer">
      {icon && <div className="mx-auto h-12 w-12 text-gray-400">{icon}</div>}
      {title && <span className="mt-2 block text-sm font-semibold">{title}</span>}
      {imageName && (
        <div className="flex gap-2 items-center justify-center mt-4">
          <PhotoIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400">{imageName}</span>
        </div>
      )}
      <input {...rest} className="hidden" type="file" />
    </label>
  );
}
