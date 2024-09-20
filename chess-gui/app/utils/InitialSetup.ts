import { generalAxis } from "../types/axis";
import GameSetup from "../types/gameSetup";

export const initialClassicalSetup: GameSetup = {
    11: { type: 'rook', color: 'white' },
    21: { type: 'knight', color: 'white'},
    31: { type: 'bishop', color: 'white'},
    41: { type: 'queen', color: 'white'},
    51: { type: 'king', color: 'white'},
    61: { type: 'bishop', color: 'white'},
    71: { type: 'knight', color: 'white'},
    81: { type: 'rook', color: 'white'},
    18: { type: 'rook', color: 'black' },
    28: { type: 'knight', color: 'black'},
    38: { type: 'bishop', color: 'black'},
    48: { type: 'queen', color: 'black'},
    58: { type: 'king', color: 'black'},
    68: { type: 'bishop', color: 'black'},
    78: { type: 'knight', color: 'black'},
    88: { type: 'rook', color: 'black'},

    ...Object.fromEntries(generalAxis.map(col => [`${col}2`, { type: 'pawn', color: 'white'}])),
    ...Object.fromEntries(generalAxis.map(col => [`${col}7`, { type: 'pawn', color: 'black'}]))
};