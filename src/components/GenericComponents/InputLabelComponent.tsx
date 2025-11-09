import React from 'react';

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  divClassName?: string;
  labelStyles?: string;
  inputBaseStyles?: string;
};

const InputLabelComponent: React.FC<Props> = ({
  label,
  type = 'text',
  value = '',
  onChange,
  placeholder = '',
  className = '',
  divClassName = 'flex flex-col mb-4',
  labelStyles = `block text-sm font-medium text-gray-700`,
  inputBaseStyles = `w-full px-3 py-2 border rounded-md`,
}) => {
  const inputClasses = `${inputBaseStyles} ${className}`;

  return (
    <div className={divClassName}>
      <label className={labelStyles}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
      />
    </div>
  );
};

export default InputLabelComponent;
