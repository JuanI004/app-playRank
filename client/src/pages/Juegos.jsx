import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";
import CardVacia from "../components/CardVacia";
import Filter from "../components/Filter";
import useFetchJuegos from "../hooks/useFetchJuegos";
import { useState, useEffect } from "react";
import { GENRES, PLATFORMS, ORDERING } from "../utils/categorias";
import bannerImg from "../assets/banner.avif";
import { useNavigate } from "react-router";

const juegosXPagina = 20;

export default function Juegos() {
  const navigate = useNavigate();
  const [fetchInfo, setFetchInfo] = useState({ orden: "-ratings_count" });
  const [pagina, setPagina] = useState(1);
  const { data, isLoading, error } = useFetchJuegos({
    search: fetchInfo.search,
    genero: fetchInfo.genero,
    plataforma: fetchInfo.plataforma,
    orden: fetchInfo.orden,
    page: pagina,
    page_size: juegosXPagina,
  });
  const hasNext = data ? pagina < Math.ceil(data.count / juegosXPagina) : false;

  useEffect(() => {
    setPagina(1);
  }, [fetchInfo]);

  return (
    <div className="w-screen min-h-screen bg-[#050508] p-4 pt-21.25 pb-5">
      <main className="max-w-300 mx-auto flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
          <h1 className="font-pixel text-[#00ffff] text-md text-shadow-[0_5px_35px_rgba(0,255,255,0.50)]">
            {">> " + "EXPLORAR" + " <<"}
          </h1>
          <SearchBar
            onSearch={(search) => setFetchInfo({ ...fetchInfo, search })}
          />
        </div>

        <div className="relative h-60 w-full overflow-hidden mt-4 flex flex-col gap-2 items-center justify-center">
          <div
            className="absolute inset-0 background-radial z-10 "
            style={{
              background:
                "radial-gradient(ellipse at center, #0505082f 40%, #050508 99%)",
            }}
          />
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-full object-cover object-center absolute brightness-40"
          />
          <h1 className="font-pixel text-primary text-[1.3rem] z-10">
            NO SABES QUE JUGAR?
          </h1>
          <p className="font-inter text-secondary text-sm z-10">
            Decinos tu mood y te recomendamos el juego perfecto para hoy.
          </p>
          <button
            className="py-4 mt-4 px-8 border-3 bg-[#7564022d] border-primary text-primary text-xs font-pixel uppercase cursor-pointer hover:bg-[#ffc400] hover:text-bg hover:scale-105 transition-transform duration-200 cursor-pointer z-10"
            style={{ boxShadow: "4px 4px 0 #aa8800" }}
            onClick={() => navigate("/recomendacion")}
          >
            Play Now
          </button>
        </div>

        <div className="flex flex-wrap gap-6 mt-6">
          <Filter
            label="Genero"
            items={GENRES}
            onSelect={(value) => {
              setFetchInfo({ ...fetchInfo, genero: value });
            }}
          />
          <Filter
            label="Plataforma"
            items={PLATFORMS}
            onSelect={(value) =>
              setFetchInfo({ ...fetchInfo, plataforma: value })
            }
          />
          <Filter
            label="Ordenar"
            items={ORDERING}
            onSelect={(value) => setFetchInfo({ ...fetchInfo, orden: value })}
          />
          {(fetchInfo.search ||
            fetchInfo.genero ||
            fetchInfo.plataforma ||
            fetchInfo.orden !== "-ratings_count") && (
            <button
              onClick={() => {
                setFetchInfo({ orden: "-ratings_count" });
                setPagina(1);
              }}
              className="font-pixel text-[8px] text-[#ff6b6b] border border-[#ff6b6b33] px-2 py-1 hover:bg-[#ff6b6b11] transition-colors"
            >
              {" "}
              ✕ LIMPIAR{" "}
            </button>
          )}
        </div>

        {data && data.count !== 0 && !isLoading && (
          <p className="font-pixel text-secondary text-[0.6rem] uppercase">
            {data.count} juegos encontrados
          </p>
        )}

        {data && data.count === 0 && !isLoading && (
          <p className="mt-6 text-center font-pixel text-secondary text-md uppercase">
            No se encontraron juegos
          </p>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 py-20">
            <p className="font-pixel text-[#ff6b6b] text-xs">ERROR AL CARGAR</p>
            <p className="font-inter text-secondary text-sm">{error.message}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {isLoading
            ? Array.from({ length: 20 }).map((_, i) => <CardVacia key={i} />)
            : data?.results.map((game) => (
                <GameCard key={game.id} juego={game} />
              ))}
        </div>

        {data && data.count > 0 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => setPagina((prev) => prev - 1)}
              disabled={pagina === 1}
              className="font-pixel text-[9px] px-5 py-3 border border-[#ffd700] text-[#ffd700] disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#ffd70015] transition-colors"
              style={{ boxShadow: pagina > 1 ? "3px 3px 0 #aa8800" : "none" }}
            >
              {" "}
              ◀ PREV{" "}
            </button>
            <span className="font-pixel text-[9px] text-secondary">
              PAG {pagina}
            </span>
            <button
              onClick={() => setPagina((prev) => prev + 1)}
              disabled={!hasNext}
              className="font-pixel text-[9px] px-5 py-3 border border-[#ffd700] text-[#ffd700] disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#ffd70015] transition-colors"
              style={{ boxShadow: hasNext ? "3px 3px 0 #aa8800" : "none" }}
            >
              {" "}
              NEXT ▶{" "}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
