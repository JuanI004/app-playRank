import { useState } from "react";
import InputGroup from "../components/InputGroup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();
  const { login, user } = useAuth();
  if (user) navigate("/");
  function validarFormulario() {
    const nuevosErrores = {};
    if (!loginData.email) {
      nuevosErrores.email = "Por favor, introduce tu email.";
    }
    if (loginData.email && !/\S+@\S+\.\S+/.test(loginData.email)) {
      nuevosErrores.email = "Por favor, introduce un email válido.";
    }
    if (!loginData.password) {
      nuevosErrores.password = "Por favor, introduce tu contraseña.";
    }
    if (loginData.password && loginData.password.length < 8) {
      nuevosErrores.password =
        "La contraseña debe tener al menos 8 caracteres.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (validarFormulario()) {
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          },
        );
        const data = await response.json();
        if (response.ok) {
          login(data.token, data.user);
          navigate("/");
        } else {
          throw new Error(data.message || "Error al iniciar sesión");
        }
      } catch (error) {
        setErrores({ general: error.message });
      }
    }
  }
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
        onSubmit={handleSubmit}
      >
        <ul className="flex flex-col gap-6">
          <li>
            <InputGroup
              label="Email:"
              type="email"
              name="email"
              value={loginData.email}
              id="email"
              placeholder="tu@email.com"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            {errores.email && (
              <p className="text-red-500 text-xs mt-1">{errores.email}</p>
            )}
          </li>
          <li>
            <InputGroup
              label="Contraseña:"
              type="password"
              name="password"
              value={loginData.password}
              id="password"
              placeholder="••••••••"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            {errores.password && (
              <p className="text-red-500 text-xs mt-1">{errores.password}</p>
            )}
          </li>
        </ul>
        {errores.general && (
          <p className="text-red-500 text-xs mt-4 text-center">
            {errores.general}
          </p>
        )}
        <button
          type="submit"
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
