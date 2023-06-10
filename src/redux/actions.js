export const inputChange = (inputValue) => {
    return {
        type: "INPUT_CHANGE",
        payload: {
            inputValue
        },
    }
};

export const addToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: {
            product
        }
    }
};

export const removeFromCart = (id) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: {
            id
        }
    }
};

export const increment = (id) => {
    return {
        type: "INCREMENT_ITEM",
        payload: {
            id
        }
    }
};

export const decrement = (id) => {
    return {
        type: "DECREMENT_ITEM",
        payload: {
            id
        }
    }
};

export const clearCart = () => {
    return {
        type: "CLEAR_CART"
    }
};

export const setOpen = (bool) => {
    return {
        type: "PROCEED_TO_CHECKOUT",
        payload: {
            bool
        }
    }
};