import ProductsList from './ProductsList.ts';

const Fridge: React.FC = () => {
  const productList = ProductsList; //Products from users fridge will be fetch from api (right now static from file)
  return (
    <div
      className="border w-60
                        lg:col-start-2"
    >
      {productList.map((product, index) => (
        <div key={index} className="grid grid-cols-2">
          <span>{product.name}</span>
          <span>
            {product.amount} {product.unit}{' '}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Fridge;
