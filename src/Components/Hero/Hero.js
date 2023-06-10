import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/actions";
import Products from "./Products";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function Hero() {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.input.userInput);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const filteredProducts = Products.filter((product) =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  const addItem = (product) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    dispatch(addToCart(product));
    toast.success("Item added!");
  };

  const inCart = (product) => {
    if (cart.length === 0) return false;
    const itemInCart = cart.find((item) => item.id === product.id);

    if (itemInCart) {
      toast.error("Item already in cart!");
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-wrap justify-center pt-14">
      <Toaster />
      {filteredProducts.map((product) => {
        return (
          <div
            key={product.id}
            className="shadow-md w-64 sm:w-72 m-6 p-5 border-2 bg-white rounded-lg transform hover:scale-105 transition-transform duration-300"
          >
            <div className="w-60 h-64 flex justify-center">
              <img
                alt="product"
                src={product.image}
                className="object-contain h-full"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-500">Product ID:</div>
              <div className="text-lg font-semibold">{product.id}</div>
              <div className="text-sm text-gray-500">Product Name:</div>
              <div className="text-lg font-semibold">{product.name}</div>
              <div className="text-sm text-gray-500">Product Price:</div>
              <div className="text-lg font-semibold">{product.price}</div>
            </div>
            {inCart(product) ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/ecomm-reactapp/cart");
                }}
                className="mt-4 bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1.5 px-3.5 rounded-full w-full"
              >
                View in Cart
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                }}
                className="mt-4 bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1.5 px-3.5 rounded-full w-full"
              >
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Hero;
