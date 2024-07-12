import classNames from "classnames";
import React from "react";

export enum ButtonType {
  Default = 'default',
  DefaultDisabled = 'defaultDisabled',
  Primary = 'primary',
  Secondary = 'secondary',
  Tag = 'tag',
  TagActive = 'tagActive',
}

const BASE_BUTTON_STYLES = 'font-bold py-1 px-2 rounded flex items-center gap-2';

const BUTTON_TYPE_STYLES = {
  [ButtonType.Default]: 'text-white bg-black hover:bg-gray-800 border border-gray-700',
  [ButtonType.DefaultDisabled]: 'bg-gray-900 text-gray-700 border-gray-900 hover:bg-gray-900',
  [ButtonType.Primary]: '',
  [ButtonType.Secondary]: '',
  [ButtonType.Tag]: 'bg-blue-100 text-black hover:bg-light-blue-700',
  [ButtonType.TagActive]: ''
};

type ButtonPropsBase = {
  children: React.ReactNode;
  type?: ButtonType;
  isDisabled?: boolean;
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
    onClick 
  } = props;

  const buttonDisabledStyles = BUTTON_TYPE_STYLES[`${type}Disabled` as ButtonType];

  const buttonClasses = classNames(
    BASE_BUTTON_STYLES,
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
