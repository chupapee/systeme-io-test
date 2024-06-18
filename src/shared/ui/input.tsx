import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = ({ className = '', ...props }: InputProps) => {
  return <input className={clsx(className, 'border-2 w-fit p-2')} {...props} />;
};
