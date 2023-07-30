import {
    CLEAR_ALL,
    SEARCH_KEY,
    TOGGLE_BRAND,
    TOGGLE_STOCK,
} from "../actionTypes/actionTypes";

export const toggleBrand = (brandName) => {
    return {
        type: TOGGLE_BRAND,
        payload: brandName,
    };
};

export const toggleStock = () => {
    return {
        type: TOGGLE_STOCK,
    };
};

export const clearAll = () => {
    return {
        type: CLEAR_ALL,
    };
};

export const searchKey = (modelName) => {
    return {
        type: SEARCH_KEY,
        payload: modelName,
    };
};
