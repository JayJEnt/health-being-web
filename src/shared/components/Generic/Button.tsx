import type React from "react";

const buttonStylesMap = {
	submit:
		"bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold px-6 py-2 rounded flex items-center justify-center",
	cancel: "bg-red-400 text-white",
	button: "text-black",
} as const;

type Props = {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	type?: keyof typeof buttonStylesMap;
	disabled?: boolean;
	"aria-label"?: string;
	"aria-busy"?: boolean | "true" | "false";
	title?: string;
	key?: string;
};

const GenericButton: React.FC<Props> = ({
	onClick = () => {},
	children,
	className = "",
	type = "button",
	disabled = false,
	...rest
}) => {
	const buttonAttrType = type === "submit" ? "submit" : "button";
	const buttonClassName = buttonStylesMap[type];

	return (
		<button
			type={buttonAttrType}
			onClick={onClick}
			className={`${buttonClassName} ${className}`}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
};

export default GenericButton;
