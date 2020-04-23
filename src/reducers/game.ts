import { clickSquare, jumpToPast } from "../actions";
import { Mark } from "../types";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export type GameState = {
  history: { squares: Mark[] }[];
  stepNumber: number;
  xIsNext: boolean;
};

const initialState: GameState = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true
};

// typescript-fsa-reducers を使った書き方
export default reducerWithInitialState(initialState)
  .case(clickSquare, (state, index) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return state;
    }

    squares[index] = state.xIsNext ? "X" : "O";

    return {
      history: history.concat([{ squares }]),
      xIsNext: !state.xIsNext,
      stepNumber: history.length
    };
  })
  .case(jumpToPast, (state, step) => {
    return {
      ...state,
      stepNumber: step,
      xIsNext: step % 2 === 0
    };
  });

// 従来の reducer の書き方
// export const gameReducer = (state: GameState = initialState, action: any) => {
//   switch (action.type) {
//     case CLICK_SQUARE:
//       const history = state.history.slice(0, state.stepNumber + 1);
//       const current = history[history.length - 1];
//       const squares = current.squares.slice();

//       if (calculateWinner(squares) || squares[action.index]) {
//         return;
//       }

//       squares[action.index] = state.xIsNext ? "X" : "O";

//       return {
//         history: history.concat([{ squares }]),
//         xIsNext: !state.xIsNext,
//         stepNumber: history.length
//       };
//     case JUMP_TO_PAST:
//       return {
//         stepNumber: action.step,
//         xIsNext: action.step % 2 === 0
//       };
//     default:
//       return state;
//   }
// };

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
