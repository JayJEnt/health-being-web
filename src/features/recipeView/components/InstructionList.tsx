type InstructionListProps = {
	instructionList: string[];
};

const InstructionList: React.FC<InstructionListProps> = ({ instructionList }) => {
	return (
		<div>
			<div className="flex items-center justify-between px-5 py-4">
				<h2 className="text-xl font-semibold">Instructions</h2>
				<span
					className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                        text-gray-700 dark:text-gray-200"
				>
					{instructionList.length ?? 0} steps
				</span>
			</div>

			<hr className="border-t border-gray-200 dark:border-gray-700" />

			{instructionList.length > 0 && (
				<ol className="px-5 py-4 space-y-4">
					{instructionList.map((step, idx) => (
						<li key={`${idx}-${step.slice(0, 40)}`} className="flex items-start gap-3">
							<span
								className="flex-none w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold
                                    grid place-items-center mt-0.5"
							>
								{idx + 1}
							</span>
							<p className="text-gray-700 dark:text-gray-200 leading-relaxed">{step}</p>
						</li>
					))}
				</ol>
			)}
		</div>
	);
};

export default InstructionList;
