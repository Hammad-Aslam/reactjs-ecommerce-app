import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
  increment,
  decrement,
  setOpen,
} from "../../redux/actions";
import { toast } from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import Checkout from "../Checkout/Checkout";

export let totalBill = 0;

function Cart() {
  const cartItems = useSelector((state) => state.cart.cart);
  const input = useSelector((state) => state.input.userInput);
  const dispatch = useDispatch();
  let bill = 0;

  const filteredProducts = cartItems.filter((product) =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  const addToCartWithToast = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCartWithToast = (id, name) => {
    dispatch(removeFromCart(id));
    toast.error(`${name} removed from cart!`);
  };

  const incrementItem = (id, quantity, stock) => {
    if (quantity === stock) {
      toast.error("Sorry! But we are out of stock for this item.");
    } else {
      dispatch(increment(id));
    }
  };

  const decrementItem = (id, quantity) => {
    if (quantity === 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(decrement(id));
    }
  };

  const clearItems = () => {
    toast
      .promise(
        new Promise((resolve, reject) => {
          toast
            .promise(
              () => {
                return new Promise((resolve) => {
                  const confirm = window.confirm("Are you sure?");
                  if (confirm) {
                    resolve();
                  }
                });
              },
              {
                loading: "Clearing cart...",
                success: "Cart cleared!",
                error: "Action canceled!",
              }
            )
            .then(resolve)
            .catch(reject);
        })
      )
      .then(() => dispatch(clearCart()));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col m-1 items-center border-8 border-blue-900 border-dotted">
        <h1 className="text-2xl sm:text-5xl font-medium leading-tight mt-0 mb-2 text-neutral-600 px-2">
          🛒 Your Cart 🛒
        </h1>
        {filteredProducts.map((item) => {
          bill += item.price * item.quantity;
          totalBill = bill;
          return (
            <div
              key={item.id}
              className="shadow-lg w-64 sm:w-72 m-6 p-5 border-2 flex flex-col items-center bg-neutral-300 rounded-lg hover:shadow-xl"
            >
              <div
                onClick={() => removeFromCartWithToast(item.id, item.name)}
                className="ml-auto cursor-pointer text-red-500 text-xl"
              >
                ❌
              </div>
              <div className="w-60 h-64 flex justify-center">
                <img
                  alt="product"
                  src={item.image}
                  className="object-contain h-full"
                />
              </div>
              <div className="text-center mt-2">
                <div className="text-gray-500">Product ID:</div>
                <div className="font-semibold">{item.id}</div>
                <div className="text-gray-500">Product Name:</div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-500">Product Quantity:</div>
                <div className="flex items-center justify-center">
                  <span
                    onClick={() => {
                      decrementItem(item.id, item.quantity);
                    }}
                    className="cursor-pointer bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1 px-2 rounded-l"
                  >
                    -
                  </span>
                  <span className="bg-white px-4">{item.quantity}</span>
                  <span
                    onClick={() => {
                      incrementItem(item.id, item.quantity, item.stock);
                    }}
                    className="cursor-pointer bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1 px-2 rounded-r"
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {cartItems.length ? (
          <div className="text-center">
            <button
              onClick={clearItems}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            >
              Clear Cart
            </button>
            <h2 className="text-3xl sm:text-4xl font-medium leading-tight mt-8 mb-4 text-black">
              Total Bill: <span className="font-semibold">{bill}</span>
            </h2>
            <h3
              onClick={() => dispatch(setOpen(true))}
              className="text-2xl sm:text-3xl font-medium leading-tight mt-0 mb-6 text-blue-600 hover:text-blue-400 cursor-pointer"
            >
              Proceed to Checkout
            </h3>
          </div>
        ) : (
          <h2 className="text-4xl font-medium leading-tight mt-8 mb-4 text-black">
            Your cart is empty 🙂
          </h2>
        )}
      </div>
      <Checkout />
    </div>
  );
}

export default Cart;
