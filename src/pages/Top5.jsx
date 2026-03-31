import useTop5 from "../hooks/useTop5";
import Top5Card from "../components/Top5Card";
import usePlaylist from "../hooks/usePlaylist";
import { useState } from "react";

export default function Top5() {
  const { top5, removeFromTop5, moveUp, pick, moveDown, clearTop5 } = useTop5();
  const [buscarModal, setBuscarModal] = useState({
    active: false,
    search: "",
    index: null,
  });
  const { playlist } = usePlaylist();

  const cantTop5 = top5.length;

  const filtered = playlist.filter(
    (g) =>
      !top5.some((t) => t.id === g.id) &&
      g.name.toLowerCase().includes(buscarModal.search?.toLowerCase()),
  );

  function handleRemove(index) {
    removeFromTop5(index);
  }

  function handleMoveUp(index) {
    moveUp(index);
  }

  function pickGame(game) {
    pick(game, buscarModal.index);
    setBuscarModal({ active: false, search: "", index: null });
  }

  function handleMoveDown(index) {
    moveDown(index);
  }

  function handleLimpiar() {
    clearTop5();
  }

  return (
    <div className="w-screen min-h-screen bg-bg pt-[65px] pb-20">
      {buscarModal.active && (
        <div className="fixed inset-0 bg-[#000000cc] flex items-center justify-center z-50">
          <div
            className=" max-w-sm max-h-120 bg-[#0a0a14] border border-[#ffd70055] p-6 flex flex-col gap-4"
            style={{
              boxShadow: "6px 6px 0 rgba(255,215,0,0.15)",
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-pixel text-sm text-[#ffd700]">
                ELEGIR JUEGO
              </h2>
              <button
                onClick={() =>
                  setBuscarModal({ active: false, search: "", index: null })
                }
                className="font-pixel text-lg text-[#ff6b6b] cursor-pointer px-2 py-1 hover:text-[#ac4848]"
              >
                X
              </button>
            </div>

            <input
              type="text"
              value={buscarModal.search}
              onChange={(e) =>
                setBuscarModal({
                  active: true,
                  search: e.target.value,
                  index: buscarModal.index,
                })
              }
              placeholder="BUSCAR EN PLAYLIST..."
              autoFocus
              className="bg-[#050508] border border-[#ffd70033] text-[#aaa] font-pixel text-xs px-3 py-2 outline-none focus:border-[#ffd700] transition-colors placeholder:text-[#333] w-full"
            />

            <div className="flex h-100 flex-col gap-2 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="font-pixel text-xs text-[#333] text-center py-6">
                  {playlist.length === 0
                    ? "AGREGÁ JUEGOS A TU PLAYLIST PRIMERO"
                    : "NO HAY RESULTADOS"}
                </p>
              ) : (
                filtered.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => pickGame(game)}
                    className="flex items-center gap-3 p-4 border border-[#ffffff06] hover:border-[#ffd70055] hover:bg-[#ffd70008] transition-all cursor-pointer"
                  >
                    <img
                      src={
                        game.background_image ??
                        "https://placehold.co/40x28/0a0a14/333?text=?"
                      }
                      alt={game.name}
                      className="w-15 h-10 object-cover shrink-0"
                    />
                    <span className="font-pixel text-[8px] text-[#aaa] leading-relaxed line-clamp-1 flex-1">
                      {game.name}
                    </span>
                    {game.metacritic && (
                      <span className="font-pixel text-xs text-[#555] shrink-0">
                        {game.metacritic}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <main className="relative max-w-[1200px] mx-auto flex gap-10 flex-col p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between mt-10  ">
          <div className="flex flex-col text-center sm:text-start gap-4">
            <h1 className="font-pixel text-primary text-md text-shadow-[0_5px_35px_rgba(0,255,255,0.50)]">
              {">> " + "MI TOP 5" + " <<"}
            </h1>
            <h1 className="text-xs font-pixel uppercase text-secondary ">
              {cantTop5}/5 POSICIONES OCUPADAS
            </h1>
          </div>
          {cantTop5 > 0 && (
            <button
              onClick={handleLimpiar}
              className="font-pixel text-[#ff6b6b] text-xs border border-[#ff6b6b] py-4 w-50 cursor-pointer hover:bg-[#ff6b6b1b] cursor pointer transition-colors"
              style={{ boxShadow: "4px 4px 0 #ff6b6b5b" }}
            >
              LIMPIAR TODO
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 "></div>

        <div className="flex flex-col gap-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <Top5Card
              juego={top5[index]}
              index={index}
              onRemove={() => handleRemove(index)}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              onClick={() =>
                setBuscarModal((prev) => ({
                  ...prev,
                  active: true,
                  index: index,
                }))
              }
              isFirst={index === 0}
              isLast={index === 4}
            />
          ))}
        </div>
        {5 - cantTop5 > 0 && (
          <p className="text-[#444] text-center font-inter ">
            Te quedan {5 - cantTop5} posiciones libres
          </p>
        )}
      </main>
    </div>
  );
}
