import React from 'react';

type Props = {
  handler?: () => void;
  children: React.ReactNode;
  className?: string;
  buttonType?: 'submit' | 'cancel' | 'default';
  disabled?: boolean;
};

const ButtonComponent: React.FC<Props> = ({
  handler = () => {},
  children,
  className = '',
  buttonType = 'default',
  disabled = false,
}) => {
  const baseStyles = `px-4 py-2 border rounded-md font-semibold`;

  const buttonStylesMap: Record<string, string> = {
    submit: 'bg-blue-500 text-white',
    cancel: 'bg-red-400 text-white',
    default: 'bg-gray-300 text-black',
  };

  const buttonClasses = `${baseStyles} ${buttonStylesMap[buttonType]} ${className}`;

  const buttonAttrType = buttonType === 'submit' ? 'submit' : 'button';

  return (
    <button onClick={handler} className={buttonClasses} type={buttonAttrType} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonComponent;
