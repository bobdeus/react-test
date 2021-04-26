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
    const [history, setHistory] = useState(() => [Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [step, setStep] = useState(0);

    const handleClick = (i) => {
        const squares = history[step];
        if (squares[i] || winner) return;
        const squaresCopy = squares.slice();
        squaresCopy[i] = xIsNext ? 'X' : 'O';

        const winnerCopy = calculateWinner(squaresCopy);
        const historyCopy = history.concat([squaresCopy]);

        setHistory(historyCopy);
        setXIsNext(!xIsNext);
        setWinner(winnerCopy);
        setStep(step + 1);
    }

    const jumpTo = (move) => {
        setStep(move);
        setXIsNext(move % 2 === 0);
        setWinner(null);
        const updatedHistory = JSON.parse(JSON.stringify(history.slice(0, move + 1)));
        debugger;
        setHistory(updatedHistory);
    }

    const moves = history.map((step, move) => {
       const description = move ? `Go to move # ${move}` : "Go to game state";
       return (
           <li key={move}>
               <button onClick={() => jumpTo(move)}>{description}</button>
           </li>
       )
    });

    let status;
    if (winner) {
        status = `The Winner is: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    console.log(history);
    console.log(step);
    return (
        <div className="game">
            <div className="game-board">
                <div className="status">{status}</div>
                <Board
                    squares={history[step]}
                    clickHandler={handleClick}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
