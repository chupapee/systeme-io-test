/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  opened: boolean;
  title: string;
  close: () => void;
  wrapper?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  content?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export const Modal = ({
  children,
  opened,
  title,
  close,
  wrapper,
  content,
}: ModalProps) => {
  const modalRoot = document.querySelector('#modal-root')!;

  if (!opened) return null;
  return createPortal(
    <div
      onClick={close}
      className={clsx(
        'fixed left-0 top-0 right-0 bottom-0 bg-black/50',
        'flex items-center justify-center',
        wrapper?.className
      )}
      {...wrapper}
    >
      <div
        className={'bg-white p-6 rounded-md ' + content?.className}
        onClick={(e) => e.stopPropagation()}
        {...content}
      >
        <div className="flex justify-between mb-6">
          <span>{title}</span>
          <button onClick={close}>X</button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
