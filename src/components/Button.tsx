import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = '', ...props }: Props) {
  return (
    <button
      className={`px-4 py-3 rounded-lg font-medium bg-primary hover:bg-primary-dark text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
