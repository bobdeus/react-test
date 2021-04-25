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
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const renderSquare = (i) => {
        return (
            <Square squareValue={squares[i]}
                    onClick={() => handleClick(i)}
            />
        );
    }

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
