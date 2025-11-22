import { useMemo, useState } from 'react';

import { ApiError } from '../../api/client';
import type { MeasureUnit } from '../../api/models/enum_utils';
import { MeasureUnit as MU } from '../../api/models/enum_utils';
import type { IngredientQuantity } from '../../api/models/ingredient';
import ButtonComponent from '../GenericComponents/ButtonComponent';
import IngredientPicker, { type IngredientSelection } from './IngredientPicker';
import IngredientsList from './IngredientsList';

type Props = {
  items: IngredientQuantity[];
  onAdd: (row: IngredientQuantity) => void | Promise<void>;
  onDelete: (index: number, row: IngredientQuantity) => void | Promise<void>;
  title?: string;
};

export default function IngredientsInput({ items, onAdd, onDelete, title = 'Ingredients' }: Props) {
  const [selection, setSelection] = useState<IngredientSelection>({
    ingredient: null,
    name: '',
    amount: 0,
    measure_unit: MU.unit as MeasureUnit,
  });

  const [adding, setAdding] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canAdd = useMemo(
    () => !!selection.ingredient && Number.isFinite(selection.amount) && selection.amount > 0,
    [selection.ingredient, selection.amount],
  );

  const handleAdd = async (): Promise<void> => {
    if (!canAdd || adding) return;
    setAdding(true);
    setErrorMsg(null);

    const row: IngredientQuantity = {
      name: selection.name.trim(),
      amount: selection.amount,
      measure_unit: selection.measure_unit,
    };

    try {
      await onAdd(row);
      setSelection({
        ingredient: null,
        name: '',
        amount: 0,
        measure_unit: MU.unit as MeasureUnit,
      });
    } catch (err: unknown) {
      setErrorMsg(err instanceof ApiError ? err.message : 'Unexpected error');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (index: number): Promise<void> => {
    if (deletingIndex !== null) return;
    const row = items[index];
    if (!row) return;

    setDeletingIndex(index);
    setErrorMsg(null);

    try {
      await onDelete(index, row);
    } catch (err: unknown) {
      setErrorMsg(err instanceof ApiError ? err.message : 'Unexpected error');
    } finally {
      setDeletingIndex(null);
    }
  };

  return (
    <div>
      <IngredientsList
        items={items}
        onDelete={(i) => void handleDelete(i)}
        deletingIndex={deletingIndex}
        title={title}
      />

      <IngredientPicker value={selection} onChange={setSelection} disabled={adding} />

      <ButtonComponent
        disabled={!canAdd || adding}
        handler={() => void handleAdd()}
        className={`mt-2 px-4 py-2 rounded text-white ${
          !canAdd || adding ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {adding ? 'Adding…' : 'Add'}
      </ButtonComponent>

      {errorMsg && <div className="mt-2 text-sm text-red-600">{errorMsg}</div>}
    </div>
  );
}
