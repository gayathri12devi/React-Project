import { useState } from "react";

function Square({val,onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>{val}</button>
    );
}

function Board({xIsNext,squares,onPlay}) {
    function handleClick(i) {
        if(squares[i] || calWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }
    const res = calWinner(squares);
    const isDraw = !res && squares.every(square => square !== null);
    let status;
    if(isDraw) {
        status = "Draw!!";
    } else if(isDraw) {
        status = "Winner: " + res;
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square val={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square val={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square val={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square val={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square val={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square val={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square val={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square val={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square val={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

export default function Game() {
    const [history,setHistory] = useState([Array(9).fill(null)]);
    const [currMove,setCurrMove] = useState(0);
    const xIsNext = currMove % 2 === 0;
    const currentSquares = history[currMove];
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0,currMove+1),nextSquares];
        setHistory(nextHistory);
        setCurrMove(nextHistory.length-1);
        // setXIsNext(!xIsNext);
        // setHistory([...history,nextSquares]);
    }
    function jumpTo(nextMove) {
        setCurrMove(nextMove);
        // setXIsNext(nextMove%2 === 0);
    }
    const moves = history.map((squares,move)=>{
        let description;
        if(move>0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
    return (
        <div className="game">
            <div className="game-board"> <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/> </div>
            <div className="game-info"> <ol>{moves}</ol> </div>
        </div>
    );
}

function calWinner(squares) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],[0,4,8],
        [0,3,6],[1,4,7],[2,5,8],[2,4,6]
    ];
    for(let i=0; i<lines.length; i++) {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
            return squares[a];
        }
    }
    return null;
}