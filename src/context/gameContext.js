import React, { useReducer, useEffect, useContext } from "react";
import gameReducer from "./gameReducer";

const GameContext = React.createContext(null);

const initialGame = {
    "xIsNext": true,
    "stuff": ["hi"],
    "otherStuff": "yes"
};

const GameProvider = (props) => {
    const [game, dispatch] = useReducer(gameReducer, initialGame, undefined);
    useEffect(() => localStorage.setItem("game", JSON.stringify(game)), [game]);
    const contextValue = {
        game,
        dispatch,
    };
    return (
        <GameContext.Provider value={contextValue}>
            {props.children}
        </GameContext.Provider>
    );
}
export default GameProvider;

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error(
            "useGame must be used within a GameProvider. Wrap a parent component in <GameProvider> to fix this error."
        );
    }
    return context;
}
