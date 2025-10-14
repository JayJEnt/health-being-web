import { useState, useEffect } from "react";
import type { RefrigeratorResponse } from "../../api/models/refrigerator";
import { refrigeratorApi } from "../../api/endpoints/user_role/refrigerator";

const Fridge: React.FC = () => {
  const [productsList, setProductsList] = useState<RefrigeratorResponse[]>([]);
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
  return (
    <div
      className="border w-60
                        lg:col-start-2"
    >
      {productsList.map((product, index) => (
        <div key={index} className="grid grid-cols-2">
          <span>{product.name}</span>
          <span>
            {product.amount} {product.measure_unit}{" "}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Fridge;
