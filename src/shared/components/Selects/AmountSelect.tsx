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
				className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white shadow-[0_1px_2px_rgba(15,23,42,.15)] focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-slate-100"
			/>
		</div>
	);
};

export default AmountSelect;
