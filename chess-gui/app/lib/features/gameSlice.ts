import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PieceProps } from "../../ui/piece";
import { initialClassicalSetup } from "../../utils/InitialSetup";

interface GameState {
    gamePosition: {[key: number]: PieceProps};
    currentTurn: PieceProps["color"];
    moveHistory: {from: number, to: number, piece: PieceProps}[];
}

const initialState: GameState = {
    gamePosition: initialClassicalSetup,
    currentTurn: 'white',
    moveHistory: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        MAKE_MOVE: (state, action: PayloadAction<{from: number; to: number; newGamePosition: {[key: number]: PieceProps};}>) => {
            const { from, to, newGamePosition } = action.payload;
            state.gamePosition = newGamePosition;
            const movedPiece = newGamePosition[to];
            state.moveHistory.push({ from, to, piece: movedPiece });
            state.currentTurn = state.currentTurn === 'white' ? 'black' : 'white';
        },
    },
});

export const { MAKE_MOVE } = gameSlice.actions;
export default gameSlice.reducer;