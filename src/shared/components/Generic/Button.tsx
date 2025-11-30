import type React from "react";
import { NavLink } from "react-router-dom";

const buttonStylesMap = {
	submit: "bg-blue-500 text-white",
	cancel: "bg-red-400 text-white",
	default: "bg-gray-300 text-black",
} as const;

type Props = {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	buttonType?: keyof typeof buttonStylesMap;
	disabled?: boolean;
	"aria-label"?: string;
	title?: string;
	as?: "button" | "NavLink";
	to?: string;
	icon?: React.ElementType;
	label?: string;
};

const GenericButton: React.FC<Props> = ({
	onClick = () => {},
	children,
	className = "",
	buttonType = "default",
	disabled = false,
	as = "button",
	to,
	icon: Icon,
	label,
	...rest
}) => {
	const buttonClasses = `
    flex items-center gap-3 px-4 py-3 rounded-xl transition
    ${buttonStylesMap[buttonType]}
    ${className}
  `;
	const iconStyle = "w-5 h-5 text-current";
	const spanStyle = "text-sm font-medium";

	const buttonAttrType = buttonType === "submit" ? "submit" : "button";

	if (as === "NavLink" && to) {
		return (
			<NavLink
				to={to}
				className={({ isActive }) =>
					`
            ${buttonClasses}
            ${isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}
          `
				}
				onClick={onClick}
				{...rest}
			>
				{Icon && <Icon className={iconStyle} />}
				{label && <span className={spanStyle}>{label}</span>}
				{children}
			</NavLink>
		);
	}

	return (
		<button
			type={buttonAttrType}
			onClick={onClick}
			className={buttonClasses}
			disabled={disabled}
			{...rest}
		>
			{Icon && <Icon className={iconStyle} />}
			{label && <span className={spanStyle}>{label}</span>}
			{children}
		</button>
	);
};

export default GenericButton;
