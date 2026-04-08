import InputGroup from "../components/InputGroup";
import { Link } from "react-router";

export default function Login() {
  return (
    <div
      className="relative w-screen min-h-screen flex gap-4 flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#050508",
        opacity: 1,
        backgroundImage:
          "linear-gradient(#19160a7a 1.9000000000000004px, transparent 1.9000000000000004px), linear-gradient(to right, #19160a7a 1.9000000000000004px, #050508 1.9000000000000004px)",
        backgroundSize: "78px 78px",
      }}
    >
      <span
        className="absolute w-screen min-h-screen z-10"
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(255, 215, 0, 0.07) 0%,transparent 65%)",
        }}
      />
      <h1 href="/" className="text-xl font-pixel text-primary z-20">
        PlayRank
      </h1>
      <h2 className="font-pixel text-[#00ffff] text-md z-20">
        {">> " + "INICIAR SESION" + " <<"}
      </h2>
      <form
        className="bg-[#0a0a14] w-lg p-10 bg z-20 border border-[#ffd7003b]"
        style={{ boxShadow: "4px 4px 0 #aa88004b" }}
      >
        <ul className="flex flex-col gap-6">
          <li>
            <InputGroup
              label="Email:"
              type="email"
              name="email"
              id="email"
              placeholder="tu@email.com"
            />
          </li>
          <li>
            <InputGroup
              label="Contraseña:"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
            />
          </li>
        </ul>
        <button
          className="py-4 px-8 mt-6 w-full bg-primary text-[#050508] text-xs font-pixel uppercase cursor-pointer hover:bg-[#ffc400] hover:scale-105 transition-transform duration-200 cursor-pointer"
          style={{ boxShadow: "4px 4px 0 #aa8800" }}
        >
          INICIAR SESION
        </button>
        <div className="mt-8 flex gap-2 w-full items-center">
          <div className="flex-1 h-px bg-[#ffffff17]" />
          <span className="font-pixel text-xs text-[#333]">O</span>
          <div className="flex-1 h-px bg-[#ffffff17]" />
        </div>
        <p className="mt-8 font-pixel text-[10px] text-[#555] text-center">
          ¿No tienes cuenta?{" "}
          <Link
            to="/signup"
            className="text-primary hover:text-[#ffc400] transition-colors"
          >
            REGISTRATE
          </Link>
        </p>
      </form>
    </div>
  );
}
