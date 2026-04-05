import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GameCard from "../components/GameCard";

const MOODS = [
  {
    id: "adrenalina",
    label: "ADRENALINA",
    desc: "Acción pura, ritmo frenético",
    color: "#f59e0b",
    genres: "action,shooter",
    ordering: "-ratings_count",
    tags: "action,fps,fast-paced,gore",
  },
  {
    id: "historia",
    label: "HISTORIA",
    desc: "Narrativa profunda, personajes",
    color: "#4169e1",
    genres: "adventure,role-playing-games-rpg",
    ordering: "-ratings_count",
    tags: "story-rich,narrative",
  },
  {
    id: "explorar",
    label: "EXPLORAR",
    desc: "Mundo abierto, descubrir",
    color: "#10b981",
    genres: "adventure,indie",
    ordering: "-ratings_count",
    tags: "open-world,exploration",
  },
  {
    id: "desafio",
    label: "DESAFÍO",
    desc: "Difícil, recompensante",
    color: "#a78bfa",
    genres: "action,role-playing-games-rpg",
    ordering: "-ratings_count",
    tags: "difficult,souls-like",
  },
  {
    id: "relajar",
    label: "RELAJARME",
    desc: "Sin presión, a tu ritmo",
    color: "#06b6d4",
    genres: "indie,puzzle,simulation",
    ordering: "-ratings_count",
    tags: "relaxing",
  },
  {
    id: "diversion",
    label: "DIVERSIÓN",
    desc: "Reírme, jugar con amigos",
    color: "#f472b6",
    genres: "arcade,fighting,family",
    ordering: "-ratings_count",
    tags: "co-op,multiplayer,funny,cooperative,split-screen,local-co-op",
  },
  {
    id: "terror",
    label: "TERROR",
    desc: "Suspenso, miedo, adrenalina",
    color: "#ef4444",
    genres: "action,adventure",
    ordering: "-ratings_count",
    tags: "horror,survival-horror,psychological-horror",
  },
  {
    id: "estrategia",
    label: "ESTRATEGIA",
    desc: "Pensar, planificar, conquistar",
    color: "#fbbf24",
    genres: "strategy,simulation",
    ordering: "-ratings_count",
    tags: "strategy,turn-based",
  },
];

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [page, setPage] = useState(1);
  const [mostrarRecomendaciones, setMostrarRecomendaciones] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["moodGames", selectedMood, page],
    queryFn: async () => {
      if (!selectedMood) return [];
      const mood = MOODS.find((m) => m.id === selectedMood);
      const today = new Date().toISOString().split("T")[0];
      const params = new URLSearchParams({
        key: import.meta.env.VITE_RAWG_API_KEY,
        tags: mood.tags,
        genres: mood.genres,
        ordering: mood.ordering,
        dates: `2010-01-01,${today}`,
        metacritic: "80,100",
        page_size: 8,
        page: page,
      });
      const res = await fetch(`https://api.rawg.io/api/games?${params}`);
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      return data.results.sort(() => Math.random() - 0.5);
    },
    enabled: !!selectedMood && mostrarRecomendaciones,
    staleTime: 0,
  });

  return (
    <div className="w-screen min-h-screen bg-[#050508] p-4 pt-21.25 pb-5">
      <main className="max-w-300 mx-auto flex flex-col justify-center items-center gap-4">
        <h1 className="font-pixel text-primary text-center text-xl mt-10">
          {">> " + "¿QUE MOOD TIENES HOY?" + " <<"}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {MOODS.map((mood) => (
            <div
              key={mood.id}
              onClick={() => {
                setMostrarRecomendaciones(false);
                setSelectedMood(mood.id);
                setPage(1);
              }}
              className=" cursor-pointer flex flex-col items-center text-center p-7 bg-[#0a0e19] border border-[#444] hover:scale-102 transition-transform duration-200"
              style={{
                backgroundColor:
                  selectedMood === mood.id ? mood.color + "20" : "#0a0e19",
                boxShadow:
                  selectedMood === mood.id
                    ? `4px 4px 0 ${mood.color}5b`
                    : "4px 4px 0 #4444445b",
                borderColor: selectedMood === mood.id ? mood.color : "#333",
              }}
            >
              <h2
                className="font-pixel text-md  text-primary"
                style={{
                  color: selectedMood === mood.id ? mood.color : "#aaa",
                }}
              >
                {mood.label}
              </h2>
              <p className="font-inter text-sm text-secondary mt-2">
                {mood.desc}
              </p>
            </div>
          ))}
        </div>

        {selectedMood ? (
          <button
            onClick={() => {
              setPage(Math.floor(Math.random() * 5) + 1);
              setMostrarRecomendaciones(true);
            }}
            className="font-pixel text-xs p-4 mt-10 cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{
              backgroundColor: MOODS.find((m) => m.id === selectedMood).color,
              boxShadow: `4px 4px 0 ${MOODS.find((m) => m.id === selectedMood).color}5b`,
            }}
          >
            ENCONTRAR JUEGOS
          </button>
        ) : (
          <p className="font-inter text-lg text-[#555] mt-6">
            Selecciona un mood para ver recomendaciones de juegos.
          </p>
        )}

        {mostrarRecomendaciones && isLoading && (
          <div className="w-10 h-10 border-1 border-primary border-t-0 border-r-0 animate-spin mt-10 rounded-full" />
        )}
        {mostrarRecomendaciones && error && (
          <p className="font-pixel text-[#ff6b6b] text-md mt-10">
            ERROR AL CARGAR RECOMENDACIONES
          </p>
        )}
        {mostrarRecomendaciones && data && data.length > 0 && (
          <div className="mt-6 w-full">
            <h2 className="font-pixel text-secondary text-lg mb-4">
              Recomendaciones para "
              <span
                style={{
                  color: MOODS.find((m) => m.id === selectedMood).color,
                }}
              >
                {MOODS.find((m) => m.id === selectedMood).label}
              </span>
              "
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
              {data?.map((juego) => (
                <GameCard key={juego.id} juego={juego} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
