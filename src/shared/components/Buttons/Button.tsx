type Props = {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
};

const GenericButton: React.FC<Props> = ({
	onClick = () => {},
	children,
	className = "",
	disabled = false,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`text-black ${className}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default GenericButton;
