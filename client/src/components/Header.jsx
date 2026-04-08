import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, user } = useAuth();
  console.log(user);

  return (
    <div className="fixed top-0 left-0 right-0  flex flex-col bg-[#060509d7] border-b border-[#ffd90079] z-30 ">
      <header
        className={`py-5 mx-10 flex items-center justify-between ${open && "border-b border-[#ffd9004b]"} `}
      >
        <a
          href="/"
          className="text-md hover:scale-105 hover:text-shadow-[0_0_15px_#ffd9005b] transition-all font-pixel text-primary"
        >
          PlayRank
        </a>
        <nav className="text-xs hidden sm:block">
          <ul className="flex font-pixel  gap-10">
            <li>
              <a
                href="/juegos"
                className="text-secondary hover:text-primary uppercase"
              >
                Explorar
              </a>
            </li>
            {user ? (
              <>
                <li
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="relative flex items-center cursor-pointer gap-2 text-secondary hover:text-primary uppercase"
                >
                  <p>Mi Perfil</p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      dropdownOpen
                        ? "rotate-180 transition-all duration-75"
                        : ""
                    }
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
                {dropdownOpen && (
                  <menu className="absolute bg-[#060509d7] mt-10 right-3 border border-[#ffd90079] z-30 py-5 flex flex-col gap-4 px-5">
                    <li>
                      <p className="text-primary hover:text-primary uppercase">
                        {user?.data.name}
                      </p>
                    </li>
                    <li>
                      <a
                        href="/top-5"
                        className="text-secondary hover:text-primary uppercase"
                      >
                        Top 5
                      </a>
                    </li>
                    <li>
                      <a
                        href="/playlist"
                        className="text-secondary hover:text-primary uppercase"
                      >
                        Playlist
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="text-secondary hover:text-primary uppercase "
                      >
                        Cerrar Sesion
                      </button>
                    </li>
                  </menu>
                )}
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/login"
                    className="text-primary hover:text-[#ffd700cb] uppercase"
                  >
                    Ingresar
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex flex-col gap-1.5 cursor-pointer p-1"
        >
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </header>

      <nav
        className={`text-xs sm:hidden ${open ? "block" : "hidden"} px-10 py-6 border-b border-[#ffd9004b]`}
      >
        <ul className="flex flex-col gap-4 font-pixel gap-6">
          <li>
            <a
              href="/juegos"
              className="text-secondary hover:text-primary uppercase"
            >
              Explorar
            </a>
          </li>
          {user ? (
            <>
              {" "}
              <li
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center cursor-pointer gap-2 text-secondary hover:text-primary uppercase"
              >
                <p>Mi Perfil</p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    dropdownOpen ? "rotate-180 transition-all duration-75" : ""
                  }
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
              {dropdownOpen && (
                <div className="flex flex-col gap-4">
                  <li>
                    <p className="text-primary hover:text-primary uppercase">
                      {user?.data.name}
                    </p>
                  </li>
                  <li>
                    <a
                      href="/top-5"
                      className="text-secondary hover:text-primary uppercase"
                    >
                      Top 5
                    </a>
                  </li>
                  <li>
                    <a
                      href="/playlist"
                      className="text-secondary hover:text-primary uppercase"
                    >
                      Playlist
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="text-secondary hover:text-primary uppercase "
                    >
                      Cerrar Sesion
                    </button>
                  </li>
                </div>
              )}
            </>
          ) : (
            <li>
              <a
                href="/login"
                className="text-primary hover:text-[#ffd700cb] uppercase"
              >
                Ingresar
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
