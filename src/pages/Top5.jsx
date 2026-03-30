import useTop5 from "../hooks/useTop5";
import { useNavigate } from "react-router";
import Top5Card from "../components/Top5Card";

export default function Top5() {
  const { top5 } = useTop5();
  const navigate = useNavigate();

  const cantTop5 = top5.length;

  return (
    <div className="w-screen min-h-screen bg-bg pt-[65px] pb-20">
      <main className="relative max-w-[1200px] mx-auto flex gap-10 flex-col p-4">
        <div className="flex w-full justify-between mt-10  ">
          <div className="flex flex-col gap-4">
            <h1 className="font-pixel text-primary text-md text-shadow-[0_5px_35px_rgba(0,255,255,0.50)]">
              {">> " + "MI TOP 5" + " <<"}
            </h1>
            <h1 className="text-xs font-pixel uppercase text-secondary ">
              {cantTop5}/5 POSICIONES OCUPADAS
            </h1>
          </div>
          {cantTop5 > 0 && (
            <button
              onClick={() => navigate("/juegos")}
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
            <Top5Card juego={top5[index]} index={index} />
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
