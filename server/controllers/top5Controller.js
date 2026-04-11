import catchAsync from "../utils/catchAsync.js";
import Top5Entry from "../models/top5EntryModel.js";
import Game from "../models/GameModel.js";
import AppError from "../utils/appError.js";
import { cacheJuego } from "../utils/cacheJuego.js";

export const getTop5 = catchAsync(async (req, res) => {
  const entradas = await Top5Entry.find({ user: req.user._id }).sort(
    "position",
  );

  const idsJuegos = entradas.map((e) => e.gameId);

  const juegos = await Game.find({ gameId: { $in: idsJuegos } });

  const top5 = entradas.map((entrada) => {
    const juego = juegos.find((j) => j.gameId === entrada.gameId);
    return { ...entrada.toObject(), game: juego };
  });

  res.status(200).json({
    status: "success",
    data: top5,
  });
});

export const setTop5 = catchAsync(async (req, res) => {
  const { gameId, position } = req.body;

  if (!gameId || !position) {
    throw new AppError("gameId y position son requeridos", 400);
  }

  const juego = await cacheJuego(gameId);

  await Top5Entry.deleteOne({ user: req.user._id, gameId });

  await Top5Entry.deleteOne({ user: req.user._id, position });

  const nuevaEntrada = await Top5Entry.create({
    user: req.user._id,
    gameId,
    position,
  });

  res.status(201).json({
    status: "success",
    data: nuevaEntrada,
  });
});

export const removeFromTop5 = catchAsync(async (req, res) => {
  const { position } = req.params;

  const entrada = await Top5Entry.findOne({ user: req.user._id, position });

  if (!entrada) {
    throw new AppError(
      `No se encontró una entrada en la posición ${position} para el usuario`,
      404,
    );
  }

  await Top5Entry.deleteOne({ user: req.user._id, position });

  res.status(200).json({
    status: "success",
    data: entrada,
  });
});

export const reorderTop5 = catchAsync(async (req, res) => {
  const { entries } = req.body;

  if (!entries || !Array.isArray(entries) || entries.length > 5) {
    throw new AppError("Se requieren entre 1 y 5 entradas", 400);
  }

  for (const [index, entry] of entries.entries()) {
    await Top5Entry.updateOne(
      { user: req.user._id, gameId: entry.gameId },
      { position: index + 1 },
    );
  }

  res.status(200).json({
    status: "success",
    data: entries,
  });
});
export default { getTop5, setTop5, removeFromTop5, reorderTop5 };
