import { combineReducers } from "redux";
import game from "./game";
import { GameState } from "./game";

export type AppState = {
  game: GameState;
};

export const reducer = combineReducers<AppState>({ game });
