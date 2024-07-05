import React from "react";

export enum ButtonType {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
}

const BUTTON_TYPE_STYLES = {
  [ButtonType.Default]: 'bg-black hover:bg-gray-800 border border-gray-600',
  [ButtonType.Primary]: '',
  [ButtonType.Secondary]: '',
};

const BASE_BUTTON_STYLES = 'text-white font-bold py-1 px-2 rounded flex items-center gap-2';

type ButtonPropsBase = {
  children: React.ReactNode;
  type?: ButtonType;
};

type ButtonPropsWithClick = ButtonPropsBase & {
  onClick: () => void;
  onMouseDown?: never;
};

type ButtonPropsWithMouseDown = ButtonPropsBase & {
  onMouseDown: () => void;
  onClick?: never;
};

type ButtonProps = ButtonPropsWithClick | ButtonPropsWithMouseDown;

export function Button (props: ButtonProps) {
  const { children, type = ButtonType.Default, onClick } = props;

  const buttonClasses = `${BASE_BUTTON_STYLES} ${BUTTON_TYPE_STYLES[type]}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}
