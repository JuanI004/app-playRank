import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Playlist from "../models/playlistModel.js";
import Game from "../models/GameModel.js";
import { cacheJuego } from "../utils/cacheJuego.js";

export const getPlaylist = catchAsync(async (req, res) => {
  const entradas = await Playlist.find({ user: req.user._id });

  const idsJuegos = entradas.map((e) => e.gameId);

  const juegos = await Game.find({ gameId: { $in: idsJuegos } });

  const playlist = entradas.map((entrada) => {
    const juego = juegos.find((j) => j.gameId === entrada.gameId);
    return { ...entrada.toObject(), game: juego };
  });

  res.status(200).json({
    status: "success",
    data: playlist,
  });
});

export const setPlaylist = catchAsync(async (req, res) => {
  const gameId = Number(req.body.gameId);

  if (!Number.isInteger(gameId) || gameId <= 0) {
    throw new AppError("El campo gameId es requerido", 400);
  }

  const juego = await cacheJuego(gameId);

  await Playlist.deleteOne({ user: req.user._id, gameId });

  const nuevaEntrada = await Playlist.create({
    user: req.user._id,
    gameId,
  });

  res.status(201).json({
    status: "success",
    data: nuevaEntrada,
  });
});

export const removeFromPlaylist = catchAsync(async (req, res) => {
  const gameId = Number(req.params.id);

  if (!Number.isInteger(gameId) || gameId <= 0) {
    throw new AppError("El parámetro gameId es inválido", 400);
  }

  const entrada = await Playlist.findOne({ user: req.user._id, gameId });

  if (!entrada) {
    throw new AppError("No se encontro juego con ese id en la playlist ", 404);
  }

  await Playlist.deleteOne({ user: req.user._id, gameId });

  res.status(200).json({
    status: "success",
    data: entrada,
  });
});

export default { getPlaylist, setPlaylist, removeFromPlaylist };
