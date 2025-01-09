import type { RequestHandler } from "express";

// Import access to data
import gameRepository from "./gameRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all games
    const games = await gameRepository.readAll();

    // Respond with the games in JSON format
    res.json(games);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const gameId = Number(req.params.id);
    const game = await gameRepository.read(gameId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (game === null) {
      res.sendStatus(404);
    } else {
      res.json(game);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read };
