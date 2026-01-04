import type { FC } from "react";

export type StatusMessageData = {
	text: string;
	type: "success" | "error";
} | null;

type Props = {
	msg: StatusMessageData;
	className?: string;
};

const StatusMessage: FC<Props> = ({ msg, className = "" }) => {
	if (!msg) return null;

	const color = msg.type === "error" ? "text-red-600" : "text-green-600";
	return <p className={`text-sm mt-3 ${color} ${className}`}>{msg.text}</p>;
};

export default StatusMessage;
