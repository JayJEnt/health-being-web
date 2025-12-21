import type React from "react";

type LabelVariant = "sm" | "md" | "lg";

type Props = {
	id: string;
	label: string;

	containerClassName?: string;
	labelClassName?: string;

	labelVariant?: LabelVariant;
} & React.InputHTMLAttributes<HTMLInputElement>;

const labelVariantClasses: Record<LabelVariant, string> = {
	sm: "text-sm font-medium",
	md: "text-base font-semibold",
	lg: "text-lg font-semibold",
};

const defaultInputClasses =
	"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

const GenericInputLabel: React.FC<Props> = ({
	id,
	label,
	type = "text",

	containerClassName = "flex flex-col gap-1 mb-4",
	labelClassName = "text-gray-700",
	labelVariant = "md",

	className,
	...rest
}) => {
	const inputClasses = className ?? defaultInputClasses;
	const labelClasses = `${labelVariantClasses[labelVariant]} ${labelClassName}`;

	return (
		<div className={containerClassName}>
			<label htmlFor={id} className={labelClasses}>
				{label}
			</label>

			<input id={id} type={type} className={inputClasses} {...rest} />
		</div>
	);
};

export default GenericInputLabel;
