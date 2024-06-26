import React from "react";

export enum ButtonType {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
}

const BUTTON_TYPE_STYLES = {
  [ButtonType.Default]: 'bg-blue-500 hover:bg-blue-700',
  [ButtonType.Primary]: '',
  [ButtonType.Secondary]: '',
};

const BASE_BUTTON_STYLES = 'text-white font-bold py-2 px-4 rounded flex items-center gap-2';

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
