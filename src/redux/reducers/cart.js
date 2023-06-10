const initialState = {
    cart: []
};

const cart = (state=initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, { ...action.payload.product, quantity: 1 }]
            }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((product) => product.id !== action.payload.id)
            }

        case "INCREMENT_ITEM":
            return {
                ...state,
                cart: state.cart.map((item) => {
                    if (item.id === action.payload.id) {
                        // return item.quantity += 1
                        return {...item, quantity: item.quantity+1}
                    }
                    return item
                })
            }

        case "DECREMENT_ITEM":
            return {
                ...state,
                cart: state.cart.map((item) => {
                    if (item.id === action.payload.id) {
                        return {...item, quantity: item.quantity-1}
                    }
                    return item
                })
            }

            case "CLEAR_CART":
                return {
                    ...state,
                    cart: []
                }

        default: return state
    }
};

export default cart;