import type { RequestHandler } from "express";

// Import access to data
import lotRepository from "./lotRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all games
    const lots = await lotRepository.readAll();

    // Respond with the games in JSON format
    res.json(lots);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const lotId = Number(req.params.id);
    const lot = await lotRepository.read(lotId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (lot == null) {
      res.sendStatus(404);
    } else {
      res.json(lot);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read };
