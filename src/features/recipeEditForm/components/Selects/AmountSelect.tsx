type AmountSelectProps = {
	amount: number;
	onSelect: (e: number) => void;
};

const AmountSelect: React.FC<AmountSelectProps> = ({ amount, onSelect }) => {
	return (
		<div className="flex flex-col gap-1 w-28">
			<label className="text-xs sm:text-sm font-medium text-slate-700" htmlFor="amount">
				Amount
			</label>

			<input
				type="number"
				placeholder="e.g. 500"
				value={Number.isFinite(amount) ? amount : 0}
				onChange={(e) => onSelect(Number(e.target.value))}
			/>
		</div>
	);
};

export default AmountSelect;
