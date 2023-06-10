import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cart from "./reducers/cart";
import input from "./reducers/input";
import checkout from "./reducers/checkout";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['input', 'checkout']
};

const rootReducer = combineReducers({
    input,
    cart,
    checkout
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store)