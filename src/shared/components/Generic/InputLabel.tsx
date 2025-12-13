import type React from "react";

type Props = {
	id: string;
	label: string;
	divClassName?: string;
	labelStyles?: string;
	inputBaseStyles?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const GenericInputLabel: React.FC<Props> = ({
	id,
	label,
	type = "text",
	className = "",
	divClassName = "flex flex-col mb-4",
	labelStyles = "block text-sm font-medium text-gray-700",
	inputBaseStyles = "w-full px-3 py-2 border rounded-md",
	...rest
}) => {
	const inputClasses = `${inputBaseStyles} ${className}`;

	return (
		<div className={divClassName}>
			<label htmlFor={id} className={labelStyles}>
				{label}
			</label>
			<input id={id} type={type} className={inputClasses} {...rest} />
		</div>
	);
};

export default GenericInputLabel;
