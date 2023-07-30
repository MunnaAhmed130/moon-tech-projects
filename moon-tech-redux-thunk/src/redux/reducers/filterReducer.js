import {
    CLEAR_ALL,
    SEARCH_KEY,
    TOGGLE_BRAND,
    TOGGLE_STOCK,
} from "../actionTypes/actionTypes";

export const initialState = {
    filters: {
        brands: [],
        stock: false,
        clear: false,
    },
    keyword: "",
};

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_KEY:
            return {
                ...state,
                keyword: action.payload,
            };
        case CLEAR_ALL:
            return {
                ...state,
                filters: {
                    brands: [],
                    stock: false,
                    clear: !state.filters.clear,
                },
            };
        case TOGGLE_BRAND:
            if (!state.filters.brands.includes(action.payload)) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        brands: [...state.filters.brands, action.payload],
                        clear: false,
                    },
                };
            } else {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        brands: state.filters.brands.filter(
                            (brand) => brand !== action.payload
                        ),
                    },
                };
            }

        case TOGGLE_STOCK:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    stock: !state.filters.stock,
                    clear: false,
                },
            };
        default:
            return state;
    }
};

// export default filterReducer;
