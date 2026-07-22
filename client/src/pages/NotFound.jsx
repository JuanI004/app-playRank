import { Link } from "react-router";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="w-screen min-h-screen bg-bg flex flex-col items-center justify-center gap-6 px-4 text-center">
      <SEO title="404 - Página no encontrada" noIndex />
      <p className="font-pixel text-secondary text-xs">{"// ERROR 404"}</p>
      <h1
        className="text-[3rem] md:text-[5rem] font-pixel uppercase text-primary"
        style={{
          textShadow: "3px 3px 0 #000, 0 0 20px #ffd70088",
          animation: "glitch 6s infinite",
        }}
      >
        GAME OVER
      </h1>
      <p className="font-inter text-secondary max-w-md">
        La página que buscás no existe, se movió, o quedó fuera del mapa.
      </p>
      <Link to="/">
        <button
          className="py-4 px-8 mt-4 border-2 border-primary text-primary text-xs font-pixel uppercase hover:bg-[#ffc400] cursor-pointer hover:text-bg hover:scale-105 transition-transform duration-200"
          style={{ boxShadow: "4px 4px 0 #aa8800" }}
        >
          ◀ VOLVER AL INICIO
        </button>
      </Link>
    </div>
  );
}
