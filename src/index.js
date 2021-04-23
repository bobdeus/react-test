import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import calculateWinner from './helpers/gameLogic';
import './index.css';

const Game = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

const Board = () => {
    const [state, setState] = useState({
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: null,
    });

    const renderSquare = (i) => {
        return (
            <Square squareValue={state.squares[i]}
                    onClick={() => handleClick(i)}
            />
        );
    }

    const handleClick = (i) => {
        if (state.squares[i] || state.winner) return;
        const squares = state.squares.slice();
        squares[i] = state.xIsNext ? 'X' : 'O';

        const winner = calculateWinner(squares);

        setState({
            squares: squares,
            xIsNext: !state.xIsNext,
            winner: winner,
        });
    }

    let status;
    if (state.winner) {
        status = `The Winner is: ${state.winner}`;
    } else {
        status = `Next player: ${state.xIsNext ? 'X' : 'O'}`;
    }
    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.squareValue}
        </button>
    );
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
