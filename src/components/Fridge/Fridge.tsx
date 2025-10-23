import { useState, useEffect } from 'react';
import type { RefrigeratorCreate, RefrigeratorResponse } from '../../api/models/refrigerator';
import { refrigeratorApi } from '../../api/endpoints/user_role/refrigerator';
import { MeasureUnit } from '../../api/models/enum_utils';
const Fridge: React.FC = () => {
  const [productsList, setProductsList] = useState<RefrigeratorResponse[]>([]);
  const [newProduct, setNewProduct] = useState<RefrigeratorCreate>({
    name: '',
    amount: 0,
    measure_unit: '',
  });

  useEffect(() => {
    async function fetchProductsList() {
      try {
        const fetchResponse = await refrigeratorApi.getAll();
        setProductsList(fetchResponse);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProductsList();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  }

  async function handleSubmit() {
    try {
      const createResponse = await refrigeratorApi.create(newProduct);
      if (createResponse) {
        setProductsList((prev) => [
          ...prev,
          { ...createResponse, ingredient_id: createResponse.id },
        ]);
        setNewProduct({
          name: '',
          amount: 0,
          measure_unit: '',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id: number) {
    try {
      const deleteResponse = await refrigeratorApi.delete(id);
      if (deleteResponse) {
        const newProductsList = productsList.filter((product) => {
          product.ingredient_id != id;
        });
        setProductsList(newProductsList);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="border w-60 lg:col-start-2 p-2">
      {productsList.map((product, index) => (
        <div key={index} className="grid grid-cols-2">
          <span>{product.name}</span>
          <span>
            {product.amount} {product.measure_unit}
          </span>
          <button onClick={() => handleDelete(product.ingredient_id)}>x</button>
        </div>
      ))}

      <div className="flex flex-col gap-2 mt-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Name"
          className="border rounded p-1"
        />

        <input
          type="number"
          name="amount"
          value={newProduct.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border rounded p-1"
        />

        <select
          name="measure_unit"
          value={newProduct.measure_unit}
          onChange={handleChange}
          className="border rounded p-1"
        >
          {Object.entries(MeasureUnit).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default Fridge;
