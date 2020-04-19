import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

type SquareProps = {
  value: number;
  onClick: () => void;
};

type SquareState = {
  value: number | "X";
};
class Square extends React.Component<SquareProps, SquareState> {
  readonly state: SquareState = {
    value: 0
  };

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

type BoardState = {
  squares: any;
};
class Board extends React.Component<{}, BoardState> {
  readonly state: BoardState = {
    squares: Array(9).fill(null)
  };

  handleClick(i: number): void {
    const squares = this.state.squares.slice();

    squares[i] = "X";
    console.log(squares);
    this.setState({ squares: squares });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = "Next player: X";

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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
