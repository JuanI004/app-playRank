import { useState, useEffect,useCallback } from "react";

export default function usePlaylist() {
    const [playlist, setPlaylist] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("playlist")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("playlist", JSON.stringify(playlist));
    }, [playlist]);

    const isInPlaylist = useCallback((gameId) => {
        return playlist.some((game) => game.id === gameId);
    }, [playlist]);

    const toggleInPlaylist = useCallback((game) => {
        setPlaylist((prev) => {
            if (prev.some((g) => g.id === game.id)) {
                return prev.filter((g) => g.id !== game.id);
            } else {
                return [...prev, game];
            }
        });
    }, []);
   
    return { playlist, toggleInPlaylist, isInPlaylist };
}