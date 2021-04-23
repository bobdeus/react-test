import React from 'react';
import ReactDOM from 'react-dom';
import calculateWinner from './helpers/gameLogic';
import './index.css';

class Game extends React.Component {
    render() {
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
}

class Board extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
        }
    }

    renderSquare(i) {
        return (
            <Square squareValue={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        if(this.state.winner || this.state.squares[i]) return;
        const squares = this.state.squares.slice();
        squares[i] = i ? (this.state.xIsNext ? 'X' : 'O') : null;

        const winner = calculateWinner(squares);

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            winner: winner,
        });
    }

    render() {
        const winner = this.state.winner;
        let status;
        if(winner) {
            status = `The Winner is: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function Square(props) {
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
