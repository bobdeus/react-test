export default function gameReducer(game, action) {
    switch (action.type) {
        case "empty":
            return {xIsNext: action.data};
        case "add":
            return [];
        default:
            throw new Error("Unhandled action " + action.type);
    }
}
