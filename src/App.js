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

export class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Name: '',
      player2Name: '',
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  player1UserInput(event) {
    this.setState({ player1Name: event.target.value });
    console.log('Player 1: ' + event.target.value);
  }
  player2UserInput(event) {
    this.setState({ player2Name: event.target.value });
    console.log('Player 2: ' + event.target.value);
  }

  render() {
    return (
      <form className="userForm">
        <label className="Userlabel">
          Player 1:
          <input
            className="UserInput"
            type="text"
            name="player1Name"
            value={this.state.value}
            onChange={(event) => this.props.onChange(event)}
          />
        </label>
        <label className="Userlabel">
          Player 2:
          <input
            className="UserInput"
            type="text"
            name="player2Name"
            value={this.state.value}
            onChange={(event) => this.props.onChange(event)}
          />
        </label>
      </form>
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
      player1Name: '',
      player2Name: '',
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
    this.setState({
      history: reducedHistory,
      oddClick: !this.state.oddClick,
    });
  }

  // Handle a click on square
  handleCLick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const theSquares = current.squares.slice();

    // prevent editing the square after occupied or game finsih
    if (calculateWinner(theSquares)) {
      window.alert('Game finsihed!');
      return;
    }
    if (theSquares[i]) {
      window.alert('This grid has been ocuppied.');
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
  }

  jumpTo(index) {
    this.setState({
      history: this.state.history.slice(0, index),
    });
  }

  onUserNameChange(event) {
    let theEvent = {};
    theEvent[event.target.name] = event.target.value;
    this.setState(theEvent);
  }

  // the render function
  render() {
    // init
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    // map the moves
    const moves = history.map((step, index) => {
      const desc = index ? 'Go to move #' + index : 'Go to the game start';
      if (index + 1 >= history.length) {
        return;
      }
      return (
        <li key={index}>
          <button step={step} onClick={() => this.jumpTo(index + 1)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status =
        'Next player: ' +
        (this.state.oddClick ? this.state.player1Name : this.state.player2Name);
    }
    return (
      <div className = "contentBlock">
        <UserForm onChange={(event) => this.onUserNameChange(event)} />
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
            <ul>{moves}</ul>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
