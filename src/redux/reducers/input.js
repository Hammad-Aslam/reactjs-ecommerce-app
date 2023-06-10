const initialState = {
    userInput: ''
};

const input = (state=initialState, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                userInput: action.payload.inputValue
            }
        
        default: return state
        }
    };

export default input;