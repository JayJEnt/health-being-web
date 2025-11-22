import type { IngredientQuantity } from '../../api/models/ingredient';
import ButtonComponent from '../GenericComponents/ButtonComponent';

type Props = {
  items: IngredientQuantity[];
  onDelete: (index: number) => void | Promise<void>;
  deletingIndex?: number | null;
  title?: string;
};

export default function IngredientsList({
  items,
  onDelete,
  deletingIndex,
  title = 'Ingredients',
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="space-y-2 mb-3">
        {items.map((it, index) => (
          <div key={`${it.name}-${index}`} className="flex gap-3 items-center text-sm">
            <span className="font-medium">{it.name}</span>
            <span>{Number.isFinite(it.amount) ? it.amount : 0}</span>
            <span>{it.measure_unit ?? ''}</span>
            <ButtonComponent
              handler={() => void onDelete(index)}
              disabled={deletingIndex === index}
              className={`ml-2 font-bold px-2 rounded ${
                deletingIndex === index ? 'text-gray-400' : 'text-red-600 hover:text-red-800'
              }`}
            >
              ×
            </ButtonComponent>
          </div>
        ))}
      </div>
    </div>
  );
}
