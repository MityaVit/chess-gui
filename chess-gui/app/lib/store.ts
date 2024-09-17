import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/gameSlice";

export const gameStore = () => {
    return configureStore({
        reducer: {
            game: gameReducer,
        },
    });
}

export type GameStore = ReturnType<typeof gameStore>;
export type RootState = ReturnType<GameStore['getState']>;
export type GameDispatch = ReturnType<GameStore['dispatch']>;