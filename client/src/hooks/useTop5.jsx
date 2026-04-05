import { useState, useEffect, useCallback } from "react";

export default function useTop5() {
    const [top5, setTop5] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("top5")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("top5", JSON.stringify(top5));
    }, [top5]);

    const isInTop5 = useCallback((gameId) => {
        return top5.some((game) => game.id === gameId);
    }, [top5]);

    const toggleInTop5 = useCallback((game) => {
        setTop5((prev) => {
            if (prev.some((g) => g.id === game.id)) {
                return prev.filter((g) => g.id !== game.id);
            } else {
                if (prev.length >= 5) {
                    return [...prev.slice(1), game];
                } else {
                    return [...prev, game];
                }
            }
        });
    }, []);
   
    const removeFromTop5 = useCallback((index) => {
        setTop5((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const moveUp = useCallback((index) => {
        if (index === 0) return;
        setTop5((prev) => {
            const newTop5 = [...prev];
            [newTop5[index - 1], newTop5[index]] = [newTop5[index], newTop5[index - 1]];
            return newTop5;
        });
    }, []);

    const moveDown = useCallback((index) => {
        setTop5((prev) => {
            if (index === prev.length - 1) return prev;
            const newTop5 = [...prev];
            [newTop5[index], newTop5[index + 1]] = [newTop5[index + 1], newTop5[index]];
            return newTop5;
        });
    }, []);

    const clearTop5 = useCallback(() => {
        setTop5([]);
    }, []);

    const pick = useCallback((game, index) => {
        setTop5((prev) => {
            const newTop5 = [...prev];
            newTop5[index] = game;
            return newTop5;
        });
    }, []);
   
    return { top5, toggleInTop5, isInTop5, removeFromTop5, moveUp, pick, moveDown, clearTop5 };
}