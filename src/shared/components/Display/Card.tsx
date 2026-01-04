import type { FC, ReactNode } from "react";

type Props = {
	title: string;
	children: ReactNode;
	className?: string;
};

const Card: FC<Props> = ({ title, children, className = "" }) => (
	<section className={`bg-white/60 border border-gray-200 rounded-lg p-5 ${className}`}>
		<h2 className="text-lg font-semibold mb-4">{title}</h2>
		{children}
	</section>
);

export default Card;
