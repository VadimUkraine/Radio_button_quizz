import React, { FC, ReactElement } from 'react';
import './Button.scss';

export type ButtonProps = {
  customText?: string;
  buttonClass: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  customText = 'Click me',
  buttonClass,
  onClick,
  disabled = false,
}: ButtonProps): ReactElement => (
  <button
    className={buttonClass}
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {customText}
  </button>
);
