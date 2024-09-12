"use client";

import { PieceProps } from "../ui/piece";
import GameSetup from "../types/gameSetup";

interface MoveParams {
    from: number;
    to: number;
    color: 'white' | 'black';
    isPositionEmpty: boolean;
}

type MoveValidator = (params: MoveParams) => boolean;

const moveValidators: { [key: string]: MoveValidator } = {
    'pawn': validatePawnMove,
    'rook': validateRookMove,
    'bishop': validateBishopMove,
    'queen': (params: MoveParams) =>
        validateRookMove(params) || validateBishopMove(params),
    'king': validateKingMove,
    'knight': validateKnightMove,
};

export const isMoveValid = (from: number, to: number, piece: PieceProps, gamePosition: GameSetup) : boolean => {
    const isPositionEmpty = !gamePosition[to];
    const validator = moveValidators[piece.type];

    if (!validator) {
        console.log("Suitable validator not found.")
        return false
    }

    const params: MoveParams = {from, to, color: piece.color, isPositionEmpty}

    return validator ? validator(params) : false;
    
}

function getCoordinates (position: number) : [number, number] {
    return [Math.floor(position / 10), position % 10];
}

function validatePawnMove({ from, to, color, isPositionEmpty }: MoveParams): boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);
    const deltaY = toY - fromY;
    const isVerticalMove = fromX === toX;

    if (isVerticalMove && isPositionEmpty) {
        if ((color === 'white' && deltaY === 1) || 
            (color === 'black' && deltaY === -1)) {
            return true;
        }

        const initialRow = color === 'white' ? 2 : 7;
        if (fromY === initialRow && Math.abs(deltaY) === 2) {
            return true;
        }
    }

    return false;
}

function validateRookMove ({from, to, color, isPositionEmpty} : MoveParams) : boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);

    const isDiagonalMove = Math.abs(fromX - toX) === Math.abs(fromY - toY);

    return !isDiagonalMove && isPositionEmpty;
}

function validateBishopMove ({from, to, color, isPositionEmpty} : MoveParams) : boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);
    
    const isDiagonalMove = Math.abs(fromX - toX) === Math.abs(fromY - toY);

    return isDiagonalMove && isPositionEmpty;
}

function validateKingMove ({from, to, color, isPositionEmpty} : MoveParams) : boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);

    const isKingPattern = Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1;

    return isKingPattern && isPositionEmpty;
}

function validateKnightMove ({from, to, color, isPositionEmpty} : MoveParams) : boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);

    const isKnightPattern = (Math.abs(fromX - toX) === 2 && Math.abs(fromY - toY) === 1) || (Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 2);

    return isKnightPattern && isPositionEmpty;
}