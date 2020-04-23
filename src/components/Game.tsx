import React from "react";
import { Mark } from "../types";
import Board from "./Board";
import { jumpToPast, clickSquare } from "../actions";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import { GameState } from "../reducers/game";

type GameProps = {
  clickSquare: (index: number) => void;
  jumpToPast: (step: number) => void;
  game: GameState;
};
export class Game extends React.Component<GameProps, {}> {
  static defaultProps: any = {};
  render() {
    console.log(this.props);

    const history = this.props.game.history;
    const current = history[this.props.game.stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner
      ? `winner: ${winner}`
      : `Next player: ${this.props.game.xIsNext ? "X" : "O"}`;

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.props.jumpToPast(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={index => this.props.clickSquare(index)}
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
const mapStateToProps = (state: AppState) => ({ game: state.game });
const mapDispatchToProps = { clickSquare, jumpToPast };

export default connect(mapStateToProps, mapDispatchToProps)(Game);

const calculateWinner = (squares: Mark[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
