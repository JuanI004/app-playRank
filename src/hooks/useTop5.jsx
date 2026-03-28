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
   
    return { top5, toggleInTop5, isInTop5 };
}