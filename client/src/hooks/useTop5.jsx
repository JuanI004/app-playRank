import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.API_URL || "http://127.0.0.1:3000/api/v1";

function authHeader() {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : {};
}

export default function useTop5() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: top5 = [] } = useQuery({
    queryKey: ["top5"],
    queryFn: async () => {
      if (!user) return [];
      const res = await fetch(`${API_URL}/top-5`, {
        headers: authHeader(),
      });
      if (!res.ok) {
        throw new Error("Error al obtener el top 5");
      }
      const data = await res.json();
      const top = Array(5).fill(null);
      data.data.forEach((entry) => {
        top[entry.position - 1] = entry.gameId;
      });
      return top;
    },
    enabled: !!user,
  });

  const setEntrada = useMutation({
    mutationFn: async ({ gameId, position }) => {
      const res = await fetch(`${API_URL}/top-5`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ gameId, position }),
      });
      if (!res.ok) {
        throw new Error("Error al actualizar el top 5");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top5"] });
    },
  });

  const removeEntrada = useMutation({
    mutationFn: async (position) => {
      const res = await fetch(`${API_URL}/top-5/${position}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      if (!res.ok) {
        throw new Error("Error al eliminar del top 5");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top5"] });
    },
  });

  const reordenar = useMutation({
    mutationFn: async (entries) => {
      const res = await fetch(`${API_URL}/top-5/reorder`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) {
        throw new Error("Error al reordenar el top 5");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top5"] });
    },
  });

  const isInTop5 = (gameId) => {
    return top5.some((g) => g?.gameId === gameId);
  };

  const toggleInTop5 = (game) => {
    if (isInTop5(game.id)) {
      const index = top5.findIndex((g) => g.gameId === game.id);
      removeEntrada.mutate(index + 1);
    } else {
      const emptyIndex = top5.findIndex((g) => g === null);
      if (emptyIndex !== -1) {
        setEntrada.mutate({ gameId: game.id, position: emptyIndex + 1 });
      }
    }
  };

  const removeFromTop5 = (index) => {
    removeEntrada.mutate(index + 1);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newTop5 = [...top5];
    [newTop5[index], newTop5[index - 1]] = [newTop5[index - 1], newTop5[index]];
    reordenar.mutate(newTop5.map((gameId, i) => ({ gameId, position: i + 1 })));
  };

  const moveDown = (index) => {
    if (index === top5.length - 1) return;
    const newTop5 = [...top5];
    [newTop5[index], newTop5[index + 1]] = [newTop5[index + 1], newTop5[index]];
    reordenar.mutate(newTop5.map((gameId, i) => ({ gameId, position: i + 1 })));
  };

  const clearTop5 = () => {
    top5.forEach((_, index) => {
      removeEntrada.mutate(index + 1);
    });
  };

  const pick = (game, index) => {
    setEntrada.mutate({ gameId: game.id, position: index + 1 });
  };

  return {
    top5,
    toggleInTop5,
    isInTop5,
    removeFromTop5,
    moveUp,
    pick,
    moveDown,
    clearTop5,
  };
}
