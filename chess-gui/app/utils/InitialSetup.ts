import { horizontalAxis } from "./axis";

export const initialClassicalSetup: { [ key: string ] : { type: string, color: 'white' | 'black' } } = {
    'a1': { type: 'rook', color: 'white' },
    'b1': { type: 'knight', color: 'white'},
    'c1': { type: 'bishop', color: 'white'},
    'd1': { type: 'queen', color: 'white'},
    'e1': { type: 'king', color: 'white'},
    'f1': { type: 'bishop', color: 'white'},
    'g1': { type: 'knight', color: 'white'},
    'h1': { type: 'rook', color: 'white'},
    'a8': { type: 'rook', color: 'black' },
    'b8': { type: 'knight', color: 'black'},
    'c8': { type: 'bishop', color: 'black'},
    'd8': { type: 'queen', color: 'black'},
    'e8': { type: 'king', color: 'black'},
    'f8': { type: 'bishop', color: 'black'},
    'g8': { type: 'knight', color: 'black'},
    'h8': { type: 'rook', color: 'black'},

    ...Object.fromEntries(horizontalAxis.map(col => [`${col}2`, { type: 'pawn', color: 'white'}])),
    ...Object.fromEntries(horizontalAxis.map(col => [`${col}7`, { type: 'pawn', color: 'black'}]))
};