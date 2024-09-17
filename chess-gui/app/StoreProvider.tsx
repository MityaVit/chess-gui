"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { gameStore, GameStore } from "./lib/store";

export default function StoreProvider ({
    children
} : {
    children: React.ReactNode
}) {
    const storeRef = useRef<GameStore>()
    if (!storeRef.current) {
        // Create the store instance the first time it renders
        storeRef.current = gameStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}