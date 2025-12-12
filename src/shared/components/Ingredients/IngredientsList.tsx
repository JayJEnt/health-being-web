import type { IngredientQuantity } from "../../api/models/ingredient";

type Variant = "default" | "fridge";

type VariantStyles = {
	wrapper: string;
	title?: string;
	list: string;
	row: string;
	deleteButton: string;
};

const VARIANT_STYLES: Record<Variant, VariantStyles> = {
	default: {
		wrapper: "",
		title: "text-xl font-semibold mb-2",
		list: "space-y-2 mb-3",
		row: "flex gap-3 items-center text-sm",
		deleteButton:
			"ml-2 font-bold px-2 rounded text-red-600 hover:text-red-800 disabled:text-gray-400",
	},
	fridge: {
		wrapper: "",
		title: undefined,
		list: "space-y-2 pt-1",
		row: "flex items-center justify-between text-sm px-4 py-2 rounded-lg bg-white shadow-[0_1px_4px_rgba(15,23,42,.25)]",
		deleteButton: "ml-1 text-sm font-bold text-red-600 hover:text-red-800 disabled:text-gray-400",
	},
};

type Props = {
	items: IngredientQuantity[];
	onDelete: (index: number) => void | Promise<void>;
	deletingIndex?: number | null;
	title?: string;
	variant?: Variant;
	className?: string;
};

export default function IngredientsList({
	items,
	onDelete,
	deletingIndex,
	title = "Ingredients",
	variant = "default",
	className = "",
}: Props) {
	const styles = VARIANT_STYLES[variant];

	return (
		<div className={`${styles.wrapper} ${className}`}>
			{styles.title && <h2 className={styles.title}>{title}</h2>}

			<div className={styles.list}>
				{items.map((it, index) => (
					<div key={`${it.name}-${index}`} className={styles.row}>
						<span className="font-medium truncate">{it.name}</span>

						<span className="ml-auto mr-3 whitespace-nowrap">
							{Number.isFinite(it.amount) ? it.amount : 0} {it.measure_unit ?? ""}
						</span>

						<button
							type="button"
							onClick={() => void onDelete(index)}
							disabled={deletingIndex === index}
							className={styles.deleteButton}
							aria-busy={deletingIndex === index}
							aria-label={`Delete ${it.name}`}
						>
							×
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
