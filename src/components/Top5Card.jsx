import useRatings from "../hooks/useRatings";
import { useNavigate } from "react-router";

export default function Top5Card({
  juego,
  index,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) {
  const metacriticColor =
    juego?.metacritic >= 90
      ? "text-[#00ff88] border-[#00ff88]"
      : juego?.metacritic >= 75
        ? "text-[#ffd700] border-[#ffd700]"
        : "text-[#ff6b6b] border-[#ff6b6b]";

  const { getRating } = useRatings();
  const ratingJuego = getRating(juego?.id);

  const rating =
    index + 1 === 1
      ? "text-primary"
      : index + 1 === 2
        ? "text-secondary"
        : index + 1 === 3
          ? "text-[#a96b37]"
          : "text-[#333]";

  const navigate = useNavigate();

  return (
    <div
      key={juego?.id}
      className={`group relative bg-bg border border-[#2b2b2b] ${!juego && "border-dashed hover:border-[#ffd70056] hover:bg-[#ffd90009]"}  hover:scale-102 transition-transform duration-200 flex gap-3`}
      style={{
        background: juego
          ? index + 1 <= 3
            ? `rgba(255,215,0,0.0${4 - index + 1})`
            : "#0a0a14"
          : null,
        boxShadow:
          juego && index + 1 === 1
            ? "3px 3px 0 rgba(255,215,0,0.15)"
            : "3px 3px 0 transparent",
      }}
    >
      <div className="flex p-4 py-6 justify-center items-center gap-4">
        <h1 className={`text-[2.5rem] font-pixel ${rating}`}>#{index + 1}</h1>

        {juego?.background_image ? (
          <div className="h-25 w-20 overflow-hidden shrink-0 cursor-pointer">
            <img
              onClick={() => navigate(`/juegos/${juego.id}`)}
              src={juego?.background_image}
              alt={juego?.name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
            />
          </div>
        ) : (
          <span className="flex justify-center items-center h-25 w-20 border border-dashed text-[#444] text-2xl border-[#444]">
            +
          </span>
        )}
      </div>
      {juego ? (
        <div className="pr-4 flex w-full justify-between items-center">
          <div className="flex flex-col">
            <div className="flex flex-col gap-3 p-3 flex-1">
              <div className=" flex flex-col gap-3">
                <h2
                  onClick={() => navigate(`/juegos/${juego.id}`)}
                  className={`font-pixel text-[0.7rem] cursor-pointer leading-relaxed ${rating}`}
                >
                  {juego?.name}
                </h2>

                {juego?.genres?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {juego?.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="border-1 border-[#333] text-secondary  text-[0.6rem] font-pixel px-2 py-1"
                      >
                        {genre.name}
                      </span>
                    ))}
                    {juego?.metacritic && (
                      <p
                        className={`px-2 py-1 bg-[#050508] font-pixel text-[0.7rem] leading-relaxed border ${metacriticColor}`}
                      >
                        {juego?.metacritic}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <p className="font-pixel text-[0.5rem] text-secondary">
                    COMUNIDAD
                  </p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className="text-sm"
                        style={{
                          color:
                            s <= Math.round(juego?.rating) ? "#ffd700" : "#333",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-inter text-xs text-secondary">
                    {juego?.rating?.toFixed(1)} (
                    {juego?.ratings_count?.toLocaleString()} votos)
                  </span>
                </div>

                {ratingJuego > 0 ? (
                  <div className="flex items-center gap-2">
                    <p className="font-pixel text-[0.5rem] text-secondary">
                      MI RATING
                    </p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className="text-sm"
                          style={{
                            color: s <= ratingJuego ? "#ffd700" : "#333",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="font-pixel text-[0.5rem] text-[#5c5c5c]">
                    SIN RATING
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="flex flex-col gap-1 shrink-0">
              <button
                onClick={onMoveUp}
                disabled={isFirst}
                className="flex  justify-center font-pixel cursor-pointer text-[1rem] w-8 h-8 border border-[#ffffff10] text-[#555] hover:border-[#ffd70055] hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                ▲
              </button>
              <button
                onClick={onRemove}
                className="flex items-center pl-[0.1rem] cursor-pointer  justify-center font-pixel text-[1rem] w-8 h-8  border border-[#ff6b6b22] text-[#ff6b6b44] hover:border-[#ff6b6b] hover:text-[#ff6b6b] transition-colors shrink-0"
              >
                X
              </button>
              <button
                onClick={onMoveDown}
                disabled={isLast}
                className="flex  justify-center font-pixel cursor-pointer  text-[1rem] w-8 h-8 border border-[#ffffff10] text-[#555] hover:border-[#ffd70055] hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                ▼
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="font-pixel flex justify-center items-center text-sm text-[#444]">
          AGREGAR JUEGO
        </p>
      )}
    </div>
  );
}
