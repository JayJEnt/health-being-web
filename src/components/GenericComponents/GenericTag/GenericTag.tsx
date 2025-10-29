import React from 'react';

type Props = {
  label: string;
  tagType?: 'default' | 'info' | 'warning';
  className?: string;
  baseStyles?: string;
};

const GenericTag: React.FC<Props> = ({
  label,
  tagType = 'default',
  className = '',
  baseStyles = `inline-block px-3 py-1 rounded-full text-sm font-medium border`,
}) => {
  const tagStylesMap: Record<string, string> = {
    default: 'bg-gray-200 text-gray-800 border-gray-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  const tagClasses = `${baseStyles} ${tagStylesMap[tagType]} ${className}`;

  return <span className={tagClasses}>{label}</span>;
};

export default GenericTag;
