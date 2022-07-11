import React from 'react';
import './style.css';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}

export class Welcome extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

export function Square(props) {
  return (
    <button
      className="square"
      onClick={() => {
        // this.setState({ value: this.clickLetter() })
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
}

export function SimpleButton(props) {
  return (
    <button
      className="SimpleButton"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
}

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderButton(text) {
    return (
      <SimpleButton value={text} onClick={() => this.props.onButtonCLick()} />
    );
  }

  render() {
    return (
      <div>
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
        {this.renderButton('<<')}
      </div>
    );
  }
}

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      oddClick: true,
    };
  }

  // Handle the back button
  handleButtonClick() {
    if (this.state.history.length <= 1) {
      // window.prompt("Can't go back anymore");
      window.alert("Can't go back anymore");
      return;
    }
    const reducedHistory = this.state.history.slice(
      0,
      this.state.history.length - 1
    );
    console.log(reducedHistory);
    this.setState({
      history: reducedHistory,
      oddClick: !this.state.oddClick,
    });
  }

  // Handle a click on square
  handleCLick(i) {
    // console.log("**theSquares: " + i)

    const history = this.state.history;
    const current = history[history.length - 1];
    const theSquares = current.squares.slice();

    // prevent editing the square after occupied or game finsih
    if (calculateWinner(theSquares) || theSquares[i]) {
      return;
    }

    theSquares[i] = this.state.oddClick ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares: theSquares,
        },
      ]),
      oddClick: !this.state.oddClick,
    });

    console.log(this.state.history);
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to the game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}> {desc} </button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status =
        'Next player: ' +
        (this.props.oddClick ? 'First Player' : 'Second Player');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleCLick(i)}
            onButtonCLick={() => this.handleButtonClick()}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  // console.log("Calculating the winner")
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] != null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
