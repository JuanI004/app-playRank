import InputGroup from "../components/InputGroup";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});
  function validarFormulario() {
    const nuevosErrores = {};

    if (!signupData.name) {
      nuevosErrores.name = "Por favor, introduce tu nombre.";
    }
    if (!signupData.email) {
      nuevosErrores.email = "Por favor, introduce tu email.";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      nuevosErrores.email = "Por favor, introduce un email válido.";
    }
    if (!signupData.password) {
      nuevosErrores.password = "Por favor, introduce tu contraseña.";
    }
    if (signupData.password !== signupData.confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (validarFormulario()) {
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/users/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
          },
        );
        const data = await response.json();
        if (response.ok) {
          login(data.token, data.user);
          navigate("/");
        } else {
          throw new Error(data.message || "Error al crear la cuenta");
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
        {">> " + "REGISTRARSE" + " <<"}
      </h2>
      <form
        className="bg-[#0a0a14] w-lg p-10 bg z-20 border border-[#ffd7003b]"
        style={{ boxShadow: "4px 4px 0 #aa88004b" }}
        onSubmit={handleSubmit}
      >
        <ul className="flex flex-col gap-6">
          <li>
            <InputGroup
              label="Nombre:"
              type="text"
              name="name"
              id="name"
              value={signupData.name}
              placeholder="Tu nombre"
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
            />
            {errores.name && (
              <p className="text-red-500 text-xs mt-1">{errores.name}</p>
            )}
          </li>
          <li>
            <InputGroup
              label="Email:"
              type="email"
              name="email"
              id="email"
              value={signupData.email}
              placeholder="tu@email.com"
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
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
              id="password"
              value={signupData.password}
              placeholder="••••••••"
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
            {errores.password && (
              <p className="text-red-500 text-xs mt-1">{errores.password}</p>
            )}
          </li>
          <li>
            <InputGroup
              label="Confirmar Contraseña:"
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={signupData.passwordConfirm}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  passwordConfirm: e.target.value,
                })
              }
              placeholder="••••••••"
            />
            {errores.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errores.confirmPassword}
              </p>
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
          REGISTRARSE
        </button>
        <div className="mt-8 flex gap-2 w-full items-center">
          <div className="flex-1 h-px bg-[#ffffff17]" />
          <span className="font-pixel text-xs text-[#333]">O</span>
          <div className="flex-1 h-px bg-[#ffffff17]" />
        </div>
        <p className="mt-8 font-pixel text-[10px] text-[#555] text-center">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-[#ffc400] transition-colors"
          >
            INICIA SESION
          </Link>
        </p>
      </form>
    </div>
  );
}
