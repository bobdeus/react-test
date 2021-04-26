import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import calculateWinner from './helpers/gameLogic';
import './index.css';

const Square = (props) => {
    return (
        <button className="square" onClick={props.clickHandler}>
            {props.squareValue}
        </button>
    );
}

const Board = (props) => {
    const renderSquare = (i) => {
        return (
            <Square squareValue={props.squares[i]}
                    clickHandler={() => props.clickHandler(i)}
            />
        );
    }

    return (
        <div>
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

const Game = () => {
    const [squares, setSquares] = useState(() => Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (i) => {
        if (squares[i] || winner) return;
        const squaresCopy = squares.slice();
        squaresCopy[i] = xIsNext ? 'X' : 'O';

        const winnerCopy = calculateWinner(squaresCopy);

        setSquares(squaresCopy);
        setXIsNext(!xIsNext);
        setWinner(winnerCopy);
    }

    let status;
    if (winner) {
        status = `The Winner is: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div className="game">
            <div className="game-board">
                <div className="status">{status}</div>
                <Board
                    squares={squares}
                    clickHandler={handleClick}
                />
            </div>
            <div className="game-info">
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
