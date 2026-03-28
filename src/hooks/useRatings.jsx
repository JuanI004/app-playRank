import { useState, useEffect, useCallback } from "react";

export default function useRatings() {
    const [ratings, setRatings] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("ratings")) || [];
        } catch {
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem("ratings", JSON.stringify(ratings));
        console.log(ratings)
    }, [ratings]);

    const getRating = (id) => ratings[id] ?? 0

    const AddRating = useCallback((gameId, rating) => {
        setRatings((prev) => ({...prev, [gameId]: rating}))
    }, []);
   
    return { ratings, AddRating, getRating };
}
