const initialState = {
    checkout: false
};

const checkout = (state=initialState, action) => {
    switch (action.type) {
        case "PROCEED_TO_CHECKOUT":
            return {
                ...state,
                checkout: action.payload.bool
            }
        
        default: return state
        }
    };
    
export default checkout;