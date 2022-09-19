import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ONE_FROM_CART, TOTAL_COST } from "../actions/Action";

const initialState = {
    productCart: [],
    totalCost:0,
};

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const productIndex = state.productCart.findIndex((item) => item.id === action.payload.id);
            if (productIndex >= 0) {
                state.productCart[productIndex].qty += 1
                return {
                    ...state,
                    productCart:
                        [...state.productCart]
                }
            }
            else {
                const temp = { ...action.payload, qty: 1 }
                return { ...state, productCart: [...state.productCart, temp] }
            }

        case REMOVE_FROM_CART:
            const updatedProducts = state.productCart.filter((product) => product.id !== action.payload.id);
            return {
                ...state,
                productCart: updatedProducts
            }

        case REMOVE_ONE_FROM_CART:
            const itemIndexDec = state.productCart.findIndex((item) => item.id === action.payload.id);
            if (state.productCart[itemIndexDec].qty > 1) {
                state.productCart[itemIndexDec].qty -= 1;
                return {
                    ...state,
                    productCart: [...state.productCart]
                }
            } else if (state.productCart[itemIndexDec].qty === 1) {
                const data = state.productCart.filter((p1) => p1.id !== action.payload.id);
                return {
                    ...state,
                    productCart: data
                }
            }
        case TOTAL_COST:
            const totalCost = state.productCart.reduce((acc, val) => val.price + acc, 0)
            state.totalCost = totalCost;
            return totalCost

        default:
            return state;
    }
}