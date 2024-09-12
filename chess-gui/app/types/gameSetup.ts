"use client";

export default interface GameSetup {
    [key: number] : {type: 'pawn' | 'rook' | 'king' | 'queen' | 'knight' | 'bishop', color: 'white' | 'black'},
}