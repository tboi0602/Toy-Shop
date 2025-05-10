const Product = ({image,name,price,oldprice,sales}) => {
  return (
    <div className="w-[190px] h-[300px] rounded-lg shadow-lg text-[18px] hover:scale-105 cursor-pointer bg-white">
      <div className="w-full h-[188px]">
        <img className="fix-img rounded-t-lg" src={image} alt="product" />
      </div>
      <h1 className="px-3 py-2 font-medium h-[70px] line-clamp-2">{name}</h1>
      <div className="flex items-center">
        <h1 className=" px-3 font-medium text-red-600 text-[18px]">${price}/</h1>
        <p className="pt-1 ml-[-8px]  text-gray-400 line-through">
          ${oldprice}
        </p>
        <p className="text-[13px] pl-4 text-gray-500">|Sales: {sales}k</p>
      </div>
    </div>
  );
};

export default Product;
