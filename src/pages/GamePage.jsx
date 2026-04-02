import { useParams } from "react-router";
import useFetchInfoJuego from "../hooks/useFetchInfoJuego";
import InfoSection from "../components/InfoSection";
import usePlaylist from "../hooks/usePlaylist";
import useTop5 from "../hooks/useTop5";
import useRatings from "../hooks/useRatings";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toggleInPlaylist, isInPlaylist } = usePlaylist();
  const { toggleInTop5, isInTop5 } = useTop5();
  const { AddRating, getRating } = useRatings();
  const ratingJuego = getRating(id);
  const { juego, screenshots, isLoading, error } = useFetchInfoJuego({
    idJuego: id,
  });
  const [estrellasHover, setEstrellasHover] = useState({
    cant: ratingJuego,
    fixed: false,
  });
  const [imagenSelect, setImagenSelect] = useState(null);

  const esDePC = juego.data?.platforms?.some(
    (p) =>
      p.platform.name.toLowerCase().includes("pc") ||
      p.platform.name.toLowerCase().includes("steam"),
  );

  const metacriticColor =
    juego.data?.metacritic >= 90
      ? "text-[#00ff88] border-[#00ff88]"
      : juego.data?.metacritic >= 75
        ? "text-[#ffd700] border-[#ffd700]"
        : "text-[#ff6b6b] border-[#ff6b6b]";

  function handleSubmitRating(cant) {
    setEstrellasHover({ cant });
    AddRating(id, cant);
  }

  function handleAddPlaylist() {
    toggleInPlaylist(juego.data);
  }

  function handleAddTop5() {
    toggleInTop5(juego.data);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg animate-pulse ">
        <div className="h-[420px] bg-[#0a0a14]" />
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6">
          <div className="h-8 bg-[#0a0a14] w-1/2 rounded" />
          <div className="h-4 bg-[#0a0a14] w-1/4 rounded" />
          <div className="h-24 bg-[#0a0a14] rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex flex-col items-center gap-4 py-20">
          <p className="font-pixel text-[#ff6b6b] text-xl">ERROR AL CARGAR</p>
          <button
            onClick={() => navigate(-1)}
            className="py-4 px-8 border-2 bg-[#ff6b6b] text-bg text-xs font-pixel uppercase hover:bg-[#d85959] cursor-pointer hover:text-[#050508]  duration-200"
            style={{ boxShadow: "4px 4px 0 #ff6b6b3b" }}
          >
            VOLVER
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-bg pt-[65px]  pb-5">
      <div className="relative w-full">
        <img
          src={juego.data?.background_image}
          alt={juego.data?.name}
          className="h-[50vh] w-full object-cover "
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg to-transparent" />
      </div>

      <main className="relative max-w-[1200px] mx-auto flex flex-col gap-4">
        {imagenSelect && (
          <div
            onClick={() => setImagenSelect(null)}
            className="fixed inset-0 bg-[#000000cc] flex items-center justify-center z-50"
          >
            <div className="relative ">
              <button className="absolute top-4 right-4 text-white text-2xl font-pixel hover:text-[#ff6b6b] cursor-pointer z-10">
                X
              </button>
              <img
                src={imagenSelect}
                alt="Screenshot"
                className="max-h-[80vh] max-w-[90vw] object-contain border border-white"
              />
            </div>
          </div>
        )}

        <div className="p-4 flex flex-col gap-4">
          {juego.data?.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {juego.data?.genres.map((g) => (
                <span
                  key={g.id}
                  className="text-[8px] font-pixel uppercase text-primary border bg-[#ffde7023] border-primary px-4 py-2 "
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-lg font-pixel uppercase text-white ">
            {juego.data?.name}
          </h1>
          <h2 className="text-xs font-pixel uppercase text-secondary ">
            {juego.data?.released} · {juego.data?.developers?.[0]?.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <h3 className="font-pixel text-[#00ffff] text-sm mb-4 text-shadow-[0_5px_35px_rgba(0,255,255,0.50)] mt-20">
                {">> " + "DESCRIPCION" + " <<"}
              </h3>
              <p
                className="font-inter text-secondary text-md mt-4"
                dangerouslySetInnerHTML={{ __html: juego.data?.description }}
              ></p>

              <h3 className="font-pixel text-[#00ffff] text-sm mb-4 text-shadow-[0_5px_35px_rgba(0,255,255,0.50)] mt-10">
                {">> " + "SCREENSHOTS" + " <<"}
              </h3>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {screenshots.slice(0, 6).map((s) => (
                  <img
                    key={s.id}
                    onClick={() => setImagenSelect(s.image)}
                    src={s.image}
                    alt={juego.data?.name}
                    className=" h-full object-cover border cursor-pointer border-white"
                  />
                ))}
              </div>

              <h3 className="font-pixel text-[#00ffff] text-sm mb-4 text-shadow-[0_5px_35px_rgba(0,255,255,0.50)] mt-10">
                {">> " + "PLATAFORMAS" + " <<"}
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {juego.data?.platforms?.map((p) => (
                  <span
                    key={p.platform.id}
                    className="text-[8px] font-pixel uppercase text-primary border bg-[#0a0a14] border-[#232333] px-4 py-2 "
                  >
                    {p.platform.name}
                  </span>
                ))}
              </div>

              <h3 className="font-pixel text-[#00ffff] text-sm mb-4 text-shadow-[0_5px_35px_rgba(0,255,255,0.50)] mt-10">
                {">> " + "TAGS" + " <<"}
              </h3>
              {juego.data?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {juego.data.tags.slice(0, 12).map((tag) => (
                    <span
                      key={tag.id}
                      className="text-[8px] font-pixel uppercase text-secondary border border-[#ffffff15] bg-[#0a0a14] px-3 py-1"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-20">
              <section className="px-6 flex flex-col bg-[#0a0a14] border border-[#3f361a]">
                <div className="flex justify-between items-center border-b border-[#2b2b42] py-10">
                  <h3 className="font-pixel text-secondary text-xs">
                    METACRITIC
                  </h3>
                  {juego.data?.metacritic && (
                    <p
                      className={`top-2 right-2 px-2 py-1 bg-bg font-pixel text-lg leading-relaxed border ${metacriticColor}`}
                    >
                      {juego.data.metacritic}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center border-b border-[#2b2b42] py-10">
                  <h3 className="font-pixel text-secondary text-xs">RATING</h3>
                  <div className="flex gap-0.5 items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className="text-[1.7rem]"
                        style={{
                          color:
                            s <= Math.round(juego.data?.rating)
                              ? "#ffd700"
                              : "#333",
                        }}
                      >
                        ★
                      </span>
                    ))}
                    <span className="font-inter mx-2 text-sm text-secondary">
                      {juego.data?.rating?.toFixed(1)} (
                      {juego.data?.ratings_count?.toLocaleString()} votos)
                    </span>
                  </div>
                </div>
              </section>

              <section className="px-6 py-10 flex flex-col gap-4 bg-[#0a0a14] border border-[#3f361a]">
                <h3 className="font-pixel text-primary text-xs">MI RATING</h3>
                <div
                  className="flex gap-0.5 items-center"
                  onMouseLeave={() =>
                    !estrellasHover.fixed &&
                    setEstrellasHover({ cant: ratingJuego, fixed: false })
                  }
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      onMouseEnter={() =>
                        !estrellasHover.fixed &&
                        setEstrellasHover({ cant: s, fixed: false })
                      }
                      onClick={() => handleSubmitRating(s)}
                      className="text-[2rem] cursor-default"
                      style={{
                        color: s < estrellasHover.cant + 1 ? "#ffd700" : "#333",
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <span className="font-inter mx-4 text-sm text-secondary">
                    {estrellasHover.fixed || ratingJuego > 0
                      ? `Tu rating: ${estrellasHover.cant} estrellas`
                      : "Haz click para calificar"}
                  </span>
                </div>
              </section>

              <div className="grid grid-cols-2 gap-4">
                <button
                  className="py-4 px-8 border-2 border-primary text-primary text-xs font-pixel uppercase hover:bg-[#ffc400] cursor-pointer hover:text-bg  duration-200"
                  style={{ boxShadow: "4px 4px 0 #aa8800" }}
                  onClick={handleAddPlaylist}
                >
                  {isInPlaylist(juego.data?.id) ? "EN PLAYLIST" : "+ PLAYLIST"}
                </button>
                <button
                  className="py-4 px-8 border-2 border-primary text-primary text-xs font-pixel uppercase hover:bg-[#ffc400] cursor-pointer hover:text-bg  duration-200"
                  style={{ boxShadow: "4px 4px 0 #aa8800" }}
                  onClick={handleAddTop5}
                >
                  {isInTop5(juego.data?.id) ? "EN TOP 5" : "+ TOP 5"}
                </button>
              </div>

              <section className="px-6 py-10 flex flex-col gap-4 bg-[#0a0a14] border border-[#3f361a]">
                <h3 className="font-pixel text-secondary text-xs mb-4">INFO</h3>
                <InfoSection label="Lanzamiento" value={juego.data?.released} />
                <InfoSection
                  label="Developer"
                  value={juego.data?.developers?.[0]?.name}
                />
                <InfoSection
                  label="Tiempo Promedio"
                  value={`${juego.data?.playtime} h`}
                />
                <InfoSection
                  label="ESRB"
                  value={juego.data?.esrb_rating?.name}
                />
                <div className="flex justify-between items-center py-4">
                  <p className="font-inter text-secondary text-sm">Logros</p>
                  <p className="font-pixel text-secondary text-xs">
                    {juego.data?.achievements_count}
                  </p>
                </div>
              </section>

              {esDePC && (
                <section className="px-6 py-10 flex flex-col gap-4 bg-[#0a0a14] border border-[#3f361a]">
                  <h3 className="font-pixel text-primary text-xs">
                    ENCUENTRA EL MEJOR PRECIO
                  </h3>
                  <p className="font-inter text-secondary text-sm">
                    Compara precios en diferentes tiendas y encuentra la mejor
                    oferta para comprar este juego.
                  </p>
                  <button
                    className="py-4 px-8 border-2 bg-primary text-bg text-xs font-pixel uppercase hover:bg-[#ffc400] cursor-pointer hover:text-bg  duration-200"
                    style={{ boxShadow: "4px 4px 0 #aa8800" }}
                    onClick={() =>
                      navigate(
                        `/precios/${encodeURIComponent(juego.data?.name)}`,
                      )
                    }
                  >
                    VER PRECIOS
                  </button>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
