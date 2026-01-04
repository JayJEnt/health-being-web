import { LoadingSpinner } from "../Loading/LoadingSpinner";

type AsyncStateProps = {
	isLoading: boolean;
	hasNoResults: boolean;
	error?: Error | null;
	children: React.ReactNode;
};

export function AsyncState({ isLoading, hasNoResults, error, children }: AsyncStateProps) {
	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<div className="py-8 text-center text-red-600">
				<p>{error.message}</p>
			</div>
		);
	}

	if (hasNoResults) {
		return (
			<div className="py-8 text-center text-gray-600">
				<p>No results!</p>
			</div>
		);
	}

	return <div>{children}</div>;
}
