export default function gameReducer(state, action) {
    switch (action.type) {
        case "empty":
            return {...state, xIsNext: action.data};
        case "add":
            return [];
        default:
            throw new Error("Unhandled action " + action.type);
    }
}
