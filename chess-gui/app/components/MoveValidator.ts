"use client";

import { PieceProps } from "../ui/piece";
import GameSetup from "../types/gameSetup";

interface MoveParams {
    from: number;
    to: number;
    gamePosition: GameSetup;
    isDestinationValid: boolean;
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

    // Pawns can't capture pieces in front of them, thus there is an additional check first
    const isDestinationValid = gamePosition[from].type === 'pawn' ? (!gamePosition[to]) : (!gamePosition[to] || gamePosition[to].color !== piece.color);
    const isClear = isPathClear(from, to, gamePosition, piece);

    const validator = moveValidators[piece.type];

    if (!validator) {
        console.log("Suitable validator not found.")
        return false
    }

    const params: MoveParams = {from, to, isDestinationValid, gamePosition};

    return validator ? validator(params) && isClear : false;
    
}

function getCoordinates (position: number) : [number, number] {
    return [Math.floor(position / 10), position % 10];
}

function isPathClear(from: number, to: number, gamePosition: GameSetup, piece: PieceProps): boolean {
    // Knight doesn't care if the path is clear
    if (piece.type === 'knight') {
        return true;
    }
    else {
        const [fromX, fromY] = getCoordinates(from);
        const [toX, toY] = getCoordinates(to);

        const deltaX = toX - fromX;
        const deltaY = toY - fromY;

        const stepX = deltaX === 0 ? 0 : deltaX / Math.abs(deltaX);
        const stepY = deltaY === 0 ? 0 : deltaY / Math.abs(deltaY);

        let currentX = fromX + stepX;
        let currentY = fromY + stepY;

        while (currentX !== toX || currentY !== toY) {
            const currentPos = currentX * 10 + currentY;
            if (gamePosition[currentPos]) {
                return false;
            }
            currentX += stepX;
            currentY += stepY;
        }

        return true;
    }
}


function validatePawnMove({ from, to, isDestinationValid, gamePosition }: MoveParams): boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);
    const deltaY = toY - fromY;
    const isVerticalMove = fromX === toX;
    const isDiagonalMove = Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 1;

    if (isVerticalMove && isDestinationValid) {
        if ((gamePosition[from].color === 'white' && deltaY === 1) || 
            (gamePosition[from].color === 'black' && deltaY === -1)) {
            return true;
        }

        const initialRow = gamePosition[from].color === 'white' ? 2 : 7;
        if (fromY === initialRow && Math.abs(deltaY) === 2) {
            return true;
        }
    }

    if (isDiagonalMove && gamePosition[to] && gamePosition[to].color !== gamePosition[from].color) {
        return true;
    }

    return false;
}

function validateRookMove ({from, to, isDestinationValid} : MoveParams) : boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);

    const isDiagonalMove = Math.abs(fromX - toX) === Math.abs(fromY - toY);

    return !isDiagonalMove && isDestinationValid;
}

function validateBishopMove ({from, to, isDestinationValid} : MoveParams) : boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);
    
    const isDiagonalMove = Math.abs(fromX - toX) === Math.abs(fromY - toY);

    return isDiagonalMove && isDestinationValid;
}

function validateKingMove ({from, to, isDestinationValid} : MoveParams) : boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);

    const isKingPattern = Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1;

    return isKingPattern && isDestinationValid;
}

function validateKnightMove ({from, to, isDestinationValid} : MoveParams) : boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);

    const isKnightPattern = (Math.abs(fromX - toX) === 2 && Math.abs(fromY - toY) === 1) || (Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 2);

    return isKnightPattern && isDestinationValid;
}