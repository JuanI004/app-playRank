import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.API_URL || "http://127.0.0.1:3000/api/v1";

function authHeader() {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : {};
}

export default function usePlaylist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: playlist = [] } = useQuery({
    queryKey: ["playlist"],
    queryFn: async () => {
      if (!user) return [];
      const res = await fetch(`${API_URL}/playlist`, {
        headers: authHeader(),
      });
      if (!res.ok) {
        throw new Error("Error al obtener el top 5");
      }
      const data = await res.json();
      return data.data.map((entry) => {
        const game = entry.game
          ? {
              ...entry.game,
              id: entry.game.id ?? entry.game.gameId,
            }
          : null;
        return game;
      });
    },
    enabled: !!user,
  });

  const setPlaylist = useMutation({
    mutationFn: async ({ gameId }) => {
      const res = await fetch(`${API_URL}/playlist`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ gameId }),
      });
      if (!res.ok) {
        throw new Error("Error al actualizar la playlist");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
    },
  });

  const removeFromPlaylist = useMutation({
    mutationFn: async ({ gameId }) => {
      const res = await fetch(`${API_URL}/playlist/${gameId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      if (!res.ok) {
        throw new Error("Error al remover elemento de la playlist");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
    },
  });

  const isInPlaylist = (gameId) => {
    return playlist.some((game) => game.id === gameId);
  };

  const toggleInPlaylist = (game) => {
    if (isInPlaylist(game.id)) {
      removeFromPlaylist.mutate({ gameId: game.id });
    } else {
      setPlaylist.mutate({ gameId: game.id });
    }
  };

  return { playlist, toggleInPlaylist, isInPlaylist };
}
