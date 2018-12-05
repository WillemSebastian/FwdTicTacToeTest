import React, { Component } from 'react';
import './App.css';

class Board extends Component {
  renderSquare(i){
    return <Square 
            value = {this.props.squares[i]}
            onClick = {()=> this.props.onClick(i)} />;
  }

  render(){
    return(
      <div>
        <div className = "board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className ="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className ="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

function Square(props){
    return(
        <button id="one" className="btn square" onClick={props.onClick}>{props.value}</button>
    )
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      o_win: 0,
      x_win: 0,
    }
  }
  _handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[this.state.stepNumber]
    const squares = current.squares.slice()


    if (squares[i]) {
      alert('Already Selected')
    }
    if (calculateWinner(squares)){
      return ''
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  _restart(){
    document.location.reload()
  }

  render() {
    const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)
    let status = null
    let x_win = 0
    let o_win = 0

    if (winner) {
      status = 'Winner ' + winner
      if(winner == 'X'){
        x_win = x_win + 1
      }
      else{
        o_win = o_win + 1
      }
    }
    else {
      status = 'Next player ' + (this.state.xIsNext ? 'X' : 'O')
    }
    
    return (
      <div id="tic-tac-toe">
        <div className="span3 new_span">
          <div className="row">
            <h1 className="span3">Tic Tac Toe</h1>
            <div className="flex1">
              <span className="btn btn-dark marginRight">O won</span>
              <strong id="o_win" className="btn btn-info marginLeft">{o_win}</strong>
              <span className="btn btn-dark marginLeft">time(s)</span>

              <span className="btn btn-dark marginRight">X won</span>
              <strong id="x_win" className="btn btn-info marginLeft">{x_win}</strong>
              <span className="btn btn-dark marginLeft">time(s)</span>
            </div>
          </div>
          <strong>{status}</strong>
          <Board
          squares = {current.squares}
          onClick = {(i) => this._handleClick(i)} />
          <div className="row">
            <a id="reset" className="btn-success btn flex1" onClick = {this._restart}>Restart</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}


