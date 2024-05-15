import React, { createContext, useReducer } from "react";
const CardContext = createContext();

const cardReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            if (state.find((card) => card.cardUid == action.payload.cardUid))
                return state;
            return [...state, action.payload];
        case 'DEL':
            return state.filter(card => card.cardUid !== action.payload);
        default:
            return state;
    }
};

const CardProvider = ({ children }) => {
    const [cards, dispatch] = useReducer(cardReducer, []);

    return (
        <CardContext.Provider value={{ cards, dispatch }}>
            {children}
        </CardContext.Provider>
    );
};

export { CardContext, CardProvider };
