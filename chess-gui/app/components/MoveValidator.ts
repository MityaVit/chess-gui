"use client";

import { PieceProps } from "../ui/piece";
import GameSetup from "../types/gameSetup";

interface MoveParams {
    from: number;
    to: number;
    gamePosition: GameSetup;
    isDestinationValid: boolean;
}

type MoveValidator = (params: MoveParams,
    lastMove?: {from: number, to: number, piece: PieceProps}) => boolean;

const moveValidators: { [key: string]: MoveValidator } = {
    'pawn': validatePawnMove,
    'rook': validateRookMove,
    'bishop': validateBishopMove,
    'queen': (params: MoveParams) =>
        validateRookMove(params) || validateBishopMove(params),
    'king': validateKingMove,
    'knight': validateKnightMove,
};

export const isMoveValid = (
    from: number,
    to: number,
    piece: PieceProps,
    gamePosition: GameSetup,
    lastMove?: {from: number, to: number, piece: PieceProps}
): boolean => {

    const isDestinationValid = gamePosition[from].type === 'pawn' 
        ? !gamePosition[to] 
        : (!gamePosition[to] || gamePosition[to].color !== piece.color);

    const isClear = isPathClear(from, to, gamePosition, piece);
    
    const validator = moveValidators[piece.type];
    
    if (!validator) {
        console.error("Suitable validator not found.");
        return false;
    }

    const params: MoveParams = { from, to, isDestinationValid, gamePosition };
    
    return validator(params, lastMove) && isClear;
}

function getCoordinates(position: number): [number, number] {
    return [Math.floor(position / 10), position % 10];
}

function isPathClear(from: number, to: number, gamePosition: GameSetup, piece: PieceProps): boolean {
    if (piece.type === 'knight') return true;

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
        if (gamePosition[currentPos]) return false;
        currentX += stepX;
        currentY += stepY;
    }
    
    return true;
}

function validatePawnMove({ from, to, isDestinationValid, gamePosition }: MoveParams,
                           lastMove?: { from: number; to: number; piece: PieceProps }): boolean {
    
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);
    
    const deltaY = toY - fromY;
    
    // Regular pawn's move
    if (fromX === toX && isDestinationValid) {
        if ((gamePosition[from].color === 'white' && deltaY === 1) || 
            (gamePosition[from].color === 'black' && deltaY === -1)) {
            return true;
        }
        
        if ((fromY === 2 && gamePosition[from].color === 'white' && deltaY === 2) ||
            (fromY === 7 && gamePosition[from].color === 'black' && deltaY === -2)) {
            return true;
        }
        
        return false; // Not a valid move
    }

    // Opponent's pawn capture logic
    if (Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 1 && 
        gamePosition[to] && gamePosition[to].color !== gamePosition[from].color) {
        return true;
    }

    // En passant logic
    if (Math.abs(fromX - toX) === 1 && !gamePosition[to] && lastMove?.piece.type === 'pawn') {
        const pawnDirection = gamePosition[from].color === 'white' ? 1 : -1;

        if (Math.abs(lastMove.to - lastMove.from) === 2 && lastMove.to === to - pawnDirection) {
            return true;
        }
    }

    return false; // Not a valid move
}

function validateRookMove({ from, to, isDestinationValid }: MoveParams): boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);
    
    return (fromX !== toX && fromY === toY || fromX === toX && fromY !== toY) && isDestinationValid;
}

function validateBishopMove({ from, to, isDestinationValid }: MoveParams): boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);
    
    return Math.abs(fromX - toX) === Math.abs(fromY - toY) && isDestinationValid;
}

function validateKingMove({ from, to, isDestinationValid }: MoveParams): boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);
    
    return Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1 && isDestinationValid;
}

function validateKnightMove({ from, to, isDestinationValid }: MoveParams): boolean {
    const [fromX, fromY] = getCoordinates(from);
    const [toX, toY] = getCoordinates(to);

    return ((Math.abs(fromX - toX) === 2 && Math.abs(fromY - toY) === 1) ||
            (Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 2)) && isDestinationValid;
}