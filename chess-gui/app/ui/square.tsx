'use client';

import React from "react";

interface SquareProps {
    color: string,
    children?: React.ReactNode,
    position: number,
    onClick?(): void
}

export const Square: React.FC<SquareProps> = ({ color, children, onClick, position }) => {
    return(
        <div
            className={`w-[75px] h-[75px] ${color} flex items-center justify-content`}
            onClick={onClick}
        >
            {children}
        </div>
    )
};