import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { useAuth } from "../context/AuthContext";

import { authHeader, API_URL } from "../utils/authHeader";

export default function useRatings() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: ratings = {} } = useQuery({
    queryKey: ["ratings"],
    queryFn: async () => {
      if (!user) return {};
      const res = await fetch(`${API_URL}/reviews/myReviews`, {
        method: "GET",
        headers: authHeader(),
      });
      if (!res.ok) {
        throw new Error("Error al obtener las reseñas");
      }
      const data = await res.json();
      const ratingsMap = {};
      data.data.forEach((review) => {
        ratingsMap[review.gameId] = review.stars;
      });
      return ratingsMap;
    },
    enabled: !!user,
  });

  const getRating = (id) => ratings[id] ?? 0;

  const AddRating = useMutation({
    mutationFn: async ({ gameId, stars }) => {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ gameId, stars }),
      });
      if (!res.ok) {
        throw new Error("Error al agregar la reseña");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });

  return { ratings, AddRating, getRating };
}
