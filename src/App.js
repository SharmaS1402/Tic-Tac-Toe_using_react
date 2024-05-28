import './App.css';
import {useState} from 'react';

function Square({value , onsquareClick}){
  return(
    <>
    <button className="square" onClick = {onsquareClick}>{value} </button>
    </>
  );
 
}
function App({xIsNext , squares , onPlay}) {


  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
     nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "0";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "winner " + winner;
  } else{
    status = "Next Player : " + (xIsNext ? "X" : "0");
  }
  return (
   <>
   <div className="status">{status}</div>
    <div className="board-row">
      <Square value = {squares[0]} onsquareClick={()=> handleClick(0)}/>
      <Square value = {squares[1]} onsquareClick = {()=> handleClick(1)}/>
      <Square value = {squares[2]} onsquareClick = {()=> handleClick(2)}/>
      </div>
    <div className="board-row">
      <Square value = {squares[3]} onsquareClick = {()=> handleClick(3)}/>
      <Square value = {squares[4]} onsquareClick = {()=> handleClick(4)}/>
      <Square value = {squares[5]} onsquareClick = {()=> handleClick(5)}/>
      </div>
    <div className="board-row">
      <Square value = {squares[6]} onsquareClick = {()=> handleClick(6)}/>
      <Square value = {squares[7]} onsquareClick = {()=> handleClick(7)}/>
      <Square value = {squares[8]} onsquareClick = {()=> handleClick(8)}/>
      </div>

   </>
  );
}
export default function Game() {
  const [currentMove , setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [history,setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove + 1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
 
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((sqares,move) =>{
    let description;
    if(move > 0){
      description = 'go to move #' + move;
    } else{
      description = 'Go to game start';
    }
    return (
      <li key = {move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <App xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
  ];
  for(let i=0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
