import type { Category } from "../../../shared/models/enum_utils";

type CategoryListProps = {
	categoryList: Category[] | null | undefined;
};

const CategoryList: React.FC<CategoryListProps> = ({ categoryList }) => {
	if (!categoryList || categoryList?.length < 1) return;
	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Categories</h2>

			<ul className="flex flex-wrap gap-2">
				{categoryList.map((category) => (
					<li
						key={category}
						className="px-3 py-1 bg-orange-100 dark:bg-green-800 text-sm rounded-full"
					>
						{category}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryList;
