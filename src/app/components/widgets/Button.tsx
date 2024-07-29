import clsx from "clsx";
import React from "react";

export enum ButtonType {
  Default = 'default',
  DefaultDisabled = 'defaultDisabled',
  Primary = 'primary',
  Text = 'text',
  TextActive = 'textActive',
}

const BASE_BUTTON_STYLES = 'flex items-center gap-2 text-left';
const BASE_BUTTONNY_STYLES = 'font-bold py-1 px-2 rounded';

const BUTTON_TYPE_STYLES = {
  [ButtonType.Default]: 'text-white bg-black hover:bg-gray-800 border border-gray-700',
  [ButtonType.DefaultDisabled]: 'bg-gray-900 text-gray-700 border-gray-900 hover:bg-gray-900',
  [ButtonType.Primary]: '',
  [ButtonType.Text]: 'text-light-gray-900 hover:text-white hover:underline',
  [ButtonType.TextActive]: 'text-white font-bold hover:underline',

};

type ButtonPropsBase = {
  children: React.ReactNode;
  type?: ButtonType;
  isDisabled?: boolean;
  className?: string;
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
  const { 
    children, 
    type = ButtonType.Default, 
    isDisabled = false,
    className = '',
    onClick 
  } = props;

  const buttonDisabledStyles = BUTTON_TYPE_STYLES[`${type}Disabled` as ButtonType];

  const isTextButton = type === ButtonType.Text || type === ButtonType.TextActive;

  const buttonClasses = clsx(
    BASE_BUTTON_STYLES,
    !isTextButton ? BASE_BUTTONNY_STYLES : '',
    className,
    {
      [BUTTON_TYPE_STYLES[type]]: !isDisabled,
      [buttonDisabledStyles]: isDisabled,
    }
  );

  return (
    <button 
      className={buttonClasses} 
      onClick={isDisabled ? undefined : onClick} 
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
