const Product = ({ image, name, price, oldprice, quantity, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[190px] h-[320px] rounded-lg shadow-md bg-white cursor-pointer transform transition-transform duration-300  hover:shadow-xl flex flex-col"
    >
      <div className="w-full h-[190px] overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h2 className="px-3 py-2 font-semibold text-lg h-[70px] line-clamp-2 text-gray-900">
        {name}
      </h2>
      <div className="flex items-center px-3 mt-auto mb-3">
        <span className="text-red-600 font-bold text-lg">${price}</span>
        {oldprice && (
          <span className="ml-2 text-gray-400 line-through text-sm">
            ${oldprice}
          </span>
        )}
        <span className="ml-auto text-gray-500 text-xs">Qty: {quantity}</span>
      </div>
    </div>
  );
};

export default Product;
