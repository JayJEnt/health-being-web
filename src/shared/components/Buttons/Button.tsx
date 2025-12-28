type Props = {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
	// "aria-label"?: string;
	// "aria-busy"?: boolean | "true" | "false";
	// title?: string;
	// key?: string;
};

const GenericButton: React.FC<Props> = ({
	onClick = () => {},
	children,
	className = "",
	disabled = false,
	// ...rest
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`text-black ${className}`}
			disabled={disabled}
			// {...rest}
		>
			{children}
		</button>
	);
};

export default GenericButton;
