# 🎮 PlayRank

> Rateá tus juegos favoritos, armá tu Top 5, descubrí qué jugar según tu mood y encontrá los mejores precios.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat)

---

## ✨ Features

- **Explorar juegos** — buscá, filtrá por género y plataforma, ordená por metacritic, rating o fecha
- **Página de juego** — descripción, screenshots, trailer, plataformas, tags, info completa
- **Ratear juegos** — dale tu puntaje de 1 a 5 estrellas, se guarda en localStorage
- **Playlist** — guardá tus juegos favoritos con estadísticas personales
- **Top 5** — armá y reordenás tu lista personal de los mejores 5 juegos
- **Comparador de precios** — encontrá el mejor precio en Steam, GOG, Epic y más tiendas

---

## 🛠 Stack

| Tecnología | Uso |
|---|---|
| React 19 | UI |
| Vite | Bundler |
| Tailwind CSS v4 | Estilos |
| TanStack Query v5 | Fetching y caché |
| React Router v7 | Navegación |
| RAWG API | Base de datos de juegos |
| CheapShark API | Comparador de precios |
| localStorage | Persistencia local |

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/playrank.git
cd playrank

# 2. Instalar dependencias
npm install

# 4. Correr en desarrollo
npm run dev
```

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx          # Navegación principal (responsive)
│   ├── GameCard.jsx        # Card de juego para el grid
│   ├── PlaylistCard.jsx    # Card de juego en la playlist
│   ├── Top5Card.jsx        # Card de juego en el Top 5
│   ├── CardVacia.jsx       # Skeleton loader
│   └── Filter.jsx          # Componente de filtros
│
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Juegos.jsx          # Explorar juegos
│   ├── GamePage.jsx        # Detalle de un juego
│   ├── Playlist.jsx        # Mi playlist
│   ├── Top5.jsx            # Mi Top 5
│   └── Precios.jsx         # Comparador de precios
│
├── hooks/
│   ├── useTopGames.jsx     # Top juegos para el home
│   ├── useFetchJuegos.jsx  # Lista de juegos con filtros
│   ├── useFetchInfoJuego.jsx # Detalle + screenshots + movies
│   ├── useFetchPrecios.jsx # Precios via CheapShark
│   ├── usePlaylist.jsx     # Gestión de playlist en localStorage
│   ├── useRatings.jsx      # Ratings personales en localStorage
│   └── useTop5.jsx         # Gestión del Top 5 en localStorage
│
└── utils/
    └── categorias.js       # Géneros, plataformas y opciones de orden
```

---

## 📡 APIs utilizadas

### RAWG
Base de datos de videojuegos con más de 500,000 títulos.

```
GET /api/games                    → lista de juegos con filtros
GET /api/games/{id}               → detalle de un juego
GET /api/games/{id}/screenshots   → screenshots
GET /api/games/{id}/movies        → trailers
```

### CheapShark
Comparador de precios de juegos de PC. No requiere API key.

```
GET /api/1.0/games?title={name}   → buscar juego por nombre
GET /api/1.0/games?id={gameID}    → precios de un juego
GET /api/1.0/stores               → lista de tiendas
```

---

## 💾 Persistencia local

Los datos del usuario se guardan en `localStorage` con estas claves:

| Clave | Contenido |
|---|---|
| `playrank_playlist` | Array de juegos guardados |
| `playrank_ratings` | Objeto `{ [gameId]: rating }` |
| `playrank_top5` | Array de hasta 5 juegos |

---

## 🎨 Diseño

La interfaz usa una estética **retro 8-bit** con:

- **Press Start 2P** para títulos y labels
- **Inter** para textos descriptivos
- Paleta oscura con acentos en `#ffd700` (dorado), `#00ffff` (cyan) y `#ff6b6b` (rojo)
- Efectos de scanlines, glitch y blink inspirados en arcade
