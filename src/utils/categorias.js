const GENRES = [
  { label: 'Todos',        value: '' },
  { label: 'Action',       value: 'action' },
  { label: 'RPG',          value: 'role-playing-games-rpg' },
  { label: 'Shooter',      value: 'shooter' },
  { label: 'Adventure',    value: 'adventure' },
  { label: 'Strategy',     value: 'strategy' },
  { label: 'Puzzle',       value: 'puzzle' },
  { label: 'Racing',       value: 'racing' },
  { label: 'Sports',       value: 'sports' },
  { label: 'Fighting',     value: 'fighting' },
  { label: 'Platformer',   value: 'platformer' },
  { label: 'Indie',        value: 'indie' },
];
 
const PLATFORMS = [
  { label: 'Todas',        value: '' },
  { label: 'PC',           value: '4' },
  { label: 'PlayStation 5',value: '187' },
  { label: 'PlayStation 4',value: '18' },
  { label: 'Xbox Series',  value: '186' },
  { label: 'Xbox One',     value: '1' },
  { label: 'Nintendo Switch', value: '7' },
];
 
const ORDERING = [
  { label: 'Metacritic ↓', value: '-metacritic' },
  { label: 'Metacritic ↑', value: 'metacritic' },
  { label: 'Rating ↓',     value: '-rating' },
  { label: 'Rating ↑',     value: 'rating' },
  { label: 'Más nuevos',   value: '-released' },
  { label: 'Más viejos',   value: 'released' },
  { label: 'Nombre A-Z',   value: 'name' },
];

export { GENRES, PLATFORMS, ORDERING };