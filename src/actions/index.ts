import actionCreateFactory from "typescript-fsa";

const actionCreator = actionCreateFactory();

export const CLICK_SQUARE = "CLICK_SQUARE";
export const JUMP_TO_PAST = "JUMP_TO_PAST";

// 従来の ActionCreator
// export const clickSquare = (index: number) => ({ type: CLICK_SQUARE, index });
// export const jumpToPast = (step: number) => ({ type: JUMP_TO_PAST, step });

// typescript-fsa で書き換えた ActionCreator
// actionCreator<Payloadの型>(Action)
export const clickSquare = actionCreator<number>(CLICK_SQUARE);
export const jumpToPast = actionCreator<number>(JUMP_TO_PAST);
