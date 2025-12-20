import type React from "react";

const buttonStylesMap = {
	submit:
		"bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold px-6 py-2 rounded flex items-center justify-center",
	cancel: "ml-2 font-bold px-2 rounded text-red-600 hover:text-red-800 disabled:text-gray-400",
	add: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700",
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
	const defaultChildren = type === "cancel" ? "×" : null;

	return (
		<button
			type={buttonAttrType}
			onClick={onClick}
			className={`${buttonClassName} ${className}`}
			disabled={disabled}
			{...rest}
		>
			{defaultChildren ? defaultChildren : children}
		</button>
	);
};

export default GenericButton;
