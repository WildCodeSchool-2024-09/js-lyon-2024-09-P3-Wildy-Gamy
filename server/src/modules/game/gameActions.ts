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
    if (game == null) {
      res.sendStatus(404);
    } else {
      res.json(game);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readScores: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const scores = await gameRepository.readScores(userId);

    if (scores == null) {
      res.sendStatus(404);
    } else {
      res.json(scores);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const game = {
      id: Number(req.params.id),
      name: req.body.name,
      principle: req.body.principle,
      in_room: req.body.in_room,
      is_playable: req.body.is_playable,
      image: req.body.image,
    };

    if (game.name == null || game.principle == null) {
      res.sendStatus(400).json({});
    } else {
      const affectedRows = await gameRepository.update(game);

      if (affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newGame = {
      name: req.body.name,
      principle: req.body.principle,
      in_room: Number(req.body.in_room),
      is_playable: Number(req.body.is_playable),
      image: req.body.image,
    };

    if (newGame.name == null || newGame.principle == null) {
      res.sendStatus(400).json({});
    } else {
      const insertId = await gameRepository.create(newGame);

      res.status(201).json({ insertId });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const gameId = Number(req.params.id);

    const affectedRows = await gameRepository.delete(gameId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy, readScores };
